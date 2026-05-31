const ALLOWED_ORIGINS = new Set([
  'https://accuvideo.acornjuice.com',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
]);

const FORM_TYPES = new Set(['trial', 'subscribe', 'contactus']);

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : '';
    const cors = {
      'Access-Control-Allow-Origin': allowOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: cors });
    }
    if (!allowOrigin) {
      return json({ success: false, message: 'origin-not-allowed' }, 403, cors);
    }

    let fields;
    try {
      const ct = request.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        fields = await request.json();
      } else {
        const fd = await request.formData();
        fields = Object.fromEntries(fd.entries());
      }
    } catch (_) {
      return json({ success: false, message: 'invalid-body' }, 400, cors);
    }

    // Honeypot: bots fill every input; humans never see this one (CSS-hidden in markup).
    if (fields._honey) return json({ success: true }, 200, cors);

    const formType = String(fields._form || '').toLowerCase();
    if (!FORM_TYPES.has(formType)) {
      return json({ success: false, message: 'unknown-form' }, 400, cors);
    }

    const subject = buildSubject(formType, fields);
    const text = buildBody(fields);
    const replyTo = isEmail(fields.email) ? String(fields.email) : undefined;

    const mailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.FROM_ADDRESS,
        to: env.INBOX_ADDRESS,
        reply_to: replyTo,
        subject,
        text,
      }),
    });
    if (!mailRes.ok) {
      console.error('Resend rejected:', mailRes.status, await safeText(mailRes));
      return json({ success: false, message: 'mail-provider-error' }, 502, cors);
    }
    return json({ success: true }, 200, cors);
  },
};

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });
}

function buildSubject(formType, f) {
  if (formType === 'trial') return 'AccuVideo: trial license request';
  if (formType === 'subscribe') {
    const tag = [f.edition, f.plan, f.billing].filter(Boolean).join('/');
    return `AccuVideo: subscription started — ${tag}`;
  }
  const cat = f.category || f._subject || 'message';
  return `AccuVideo: ${cat}`;
}

function buildBody(f) {
  return Object.entries(f)
    .filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => `${k}: ${String(v).replace(/\r?\n/g, '\n  ')}`)
    .join('\n');
}

function isEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function safeText(res) {
  try { return await res.text(); } catch (_) { return ''; }
}
