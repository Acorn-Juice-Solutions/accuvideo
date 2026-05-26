(function () {
  'use strict';

  const STORAGE_KEY = 'accuvideo-lang';
  const SUPPORTED = ['en', 'es'];
  const STORAGE_KEY_THEME = 'accuvideo-theme';
  const SUPPORTED_THEMES = ['dark', 'light'];

  // Trial-license form submits to Formsubmit.co (free, no signup).
  // FIRST submission triggers an activation email to this address — click the link in it
  // to enable the endpoint. After that, every submission lands as a regular email.
  const TRIAL_FORM_EMAIL = 'info@acornjuice.com';

  const i18n = {
    en: {
      'meta.title': 'AccuVideo — Find the moment',
      'meta.description': 'Semantic search over your video library. Ask in plain language, jump to the exact second. 100% local — your videos never leave your machine.',

      'nav.features': 'Features',
      'nav.how': 'How it works',
      'nav.ingest': 'Ingestion',
      'nav.editions': 'Editions',
      'nav.pricing': 'Pricing',
      'nav.requirements': 'Requirements',
      'nav.cta': 'Try free',

      'hero.eyebrow': 'By Acorn Juice Solutions',
      'hero.title': 'Stop scrubbing the timeline. <span class="accent">Just ask.</span>',
      'hero.lede': "AccuVideo searches your entire video library by what people say, what's on screen, and what's visible on camera — and lands you on the exact second.",
      'hero.cta_primary': 'Download · 30-day free trial',
      'hero.cta_secondary': 'See how it works',
      'hero.note': '100% local · Windows · macOS (Apple Silicon)',

      'mock.query': 'explain gradient descent',
      'mock.result1.title': 'ML Lecture 04 — Optimization',
      'mock.result2.title': 'Whiteboard derivation',
      'mock.result3.title': 'Slide: loss function',
      'mock.tag.audio': 'audio',
      'mock.tag.visual': 'visual',
      'mock.tag.text': 'on-screen text',

      'features.title': 'Three ways to find the moment',
      'features.sub': 'AccuVideo indexes every layer of your videos and lets you search across them in plain language.',
      'features.audio.title': 'Spoken words',
      'features.audio.body': 'Whisper transcribes every video locally. Search the dialogue, the lecture, the meeting — and jump to the second it was said.',
      'features.text.title': 'On-screen text',
      'features.text.body': "Slides, captions, signs, code on a whiteboard. AccuVideo reads what's printed on screen and makes it searchable.",
      'features.visual.title': 'Visual content',
      'features.visual.body': 'A vision-language model describes what\'s actually in the frame — "kids blowing out candles", "dance scene", "whiteboard formula".',

      'how.title': 'How it works',
      'how.s1.title': 'Point AccuVideo at your videos',
      'how.s1.body': 'Pick one or more folders on your machine. AccuVideo handles MP4, MKV, AVI, MOV, WMV, FLV, WebM, M4V, TS, MPEG.',
      'how.s2.title': 'Index locally',
      'how.s2.body': 'Transcripts, on-screen text, and visual descriptions are computed on your machine. Embeddings go into a vector index — your raw video never leaves.',
      'how.s3.title': 'Ask, and land on the second',
      'how.s3.body': 'Type a question. Pick the result. The player opens at the exact frame that answers it — with seek-back controls if you want context.',

      'ingest.title': 'Two ways to add videos',
      'ingest.sub': 'Pick whichever fits how your library is organised. You can mix and match — folders for the big archive, drag-and-drop for one-off files.',
      'ingest.folder.title': 'Select a folder',
      'ingest.folder.lead': 'Point AccuVideo at one or more folders on your disk.',
      'ingest.folder.b1': 'Videos are indexed <strong>in place</strong> — nothing is copied or moved.',
      'ingest.folder.b2': 'Zero extra disk usage beyond the index itself.',
      'ingest.folder.b3': 'Ideal for organised libraries and large archives on internal drives, NAS or external disks.',
      'ingest.drop.title': 'Drag &amp; drop videos',
      'ingest.drop.lead': 'Drop individual files straight into the app window.',
      'ingest.drop.b1': 'Files are <strong>copied into a managed temporary folder</strong> — your video is duplicated on disk.',
      'ingest.drop.b2': 'Convenient when files are scattered, on removable media, or you just want to try the app on a single clip.',
      'ingest.drop.b3': 'Heads-up: large drops can grow that managed folder significantly.',
      'ingest.drop.tip': '💡 You can reclaim that space any time from <strong>Settings → Storage</strong>: clear the temporary copies without losing your index or search results.',

      'usecases.title': 'Built for archives that nobody has time to rewatch',
      'usecases.academy.title': 'Online academies',
      'usecases.academy.body': 'Hundreds of lessons. One query, one minute.',
      'usecases.corp.title': 'Corporate training',
      'usecases.corp.body': 'Skip to the slide in a 3-hour all-hands.',
      'usecases.student.title': 'Students',
      'usecases.student.body': 'Find the moment your professor covered <em>that</em> concept.',
      'usecases.family.title': 'Families',
      'usecases.family.body': 'Years of footage on a hard drive. Search them like memories, not files.',

      'local.title': '100% local. Your videos never leave your machine.',
      'local.body': 'No cloud upload of your content. No subscription to read your own archive. Indexing, transcription, vision and search all run on your hardware.',
      'privacy.local.title': 'Videos stay on your disk',
      'privacy.local.body': 'The actual MP4, MKV and friends never get uploaded anywhere. Transcription, on-screen text reading and visual analysis all run on your own CPU/GPU — no cloud step, no third-party server seeing your footage.',
      'privacy.points.title': 'Only abstract points reach the index',
      'privacy.points.body': 'What goes into the vector database are <strong>embeddings</strong> — high-dimensional numerical points derived from your content. They power the semantic search but can\'t be reversed into watchable video, readable transcripts or recognisable frames.',
      'privacy.isolation.title': 'Your collection, only yours',
      'privacy.isolation.body': '<strong>Every user gets a fully isolated collection</strong>, keyed to their license. No other AccuVideo user can query your library, see your snippets, or even know that your collection exists. Multi-tenant by design, single-tenant in practice.',

      'editions.title': 'Two editions',
      'editions.sub': 'Both editions share the same local-first search experience. Basic covers spoken words and on-screen text. Pro adds visual understanding, a CLI for batch ingestion of large archives, and multi-client LAN streaming.',
      'editions.basic.title': 'Basic',
      'editions.basic.tag': 'For individuals, students and modest libraries',
      'editions.basic.f1': 'Semantic search over spoken words (Whisper transcription, runs locally)',
      'editions.basic.f2': 'On-screen text indexing — slides, captions, signs, code on a whiteboard',
      'editions.basic.f3': 'In-app ingestion — drop a folder, watch it index',
      'editions.basic.f4': 'Single-machine use, EN/ES UI, dark and light themes',
      'editions.basic.f5': 'Multilingual transcription — pick the audio language (or auto-detect); optional translation for cross-language search',
      'editions.basic.bestfor': '<strong>Best for:</strong> students, individuals and families with a modest video collection.',
      'editions.basic.cta_win': 'Windows · .msi',
      'editions.basic.cta_mac': 'macOS · Coming soon',
      'editions.pro.title': 'Pro',
      'editions.pro.tag': 'For academies, businesses, schools and large archives',
      'editions.pro.f1': 'Everything in Basic',
      'editions.pro.f2': 'Visual content search (Florence-2) — find scenes by what\'s actually in the frame',
      'editions.pro.f3': 'Cross-modal re-ranking — audio + on-screen text + visual signals fused for sharper results',
      'editions.pro.f4': '<strong>AccuVideoIngest CLI</strong> — headless batch tool to index hundreds of files in one command, with progress logs and resume on failure',
      'editions.pro.f5': 'Scheduled / overnight batches — automate nightly ingestion via Task Scheduler (Windows); ideal for growing archives',
      'editions.pro.f6': 'Multi-client LAN streaming — serve concurrent viewers from one machine',
      'editions.pro.f7': 'Ideal for processing videos without audio — visual indexing covers them on its own',
      'editions.pro.bestfor': '<strong>Best for:</strong> online academies, corporate training, schools, large family archives and any multi-user setup.',
      'editions.pro.cta_win': 'Windows · .msi',
      'editions.pro.cta_mac': 'macOS · Coming soon',

      'pricing.title': 'Plans &amp; pricing',
      'pricing.sub': 'Pick the size that matches your library. Need something bigger? Talk to us.',
      'pricing.period.monthly': '/mo',
      'pricing.period.annual': '/yr',
      'pricing.toggle.monthly': 'Monthly',
      'pricing.toggle.annual': 'Annual',
      'pricing.toggle.hint': '💰 Annual billing = 2 months free',
      'pricing.badge.popular': 'Most popular',
      'pricing.cta_trial': 'Request trial license',
      'pricing.points.info': 'Points are the searchable segments per video — roughly 1 point per 6 seconds of indexed content (audio, on-screen text or visual frames). ~10 points per minute on average.',
      'pricing.basic.starter.tooltip_annual': 'Annual: €104.90/year — save 17%',
      'pricing.basic.personal.tooltip_annual': 'Annual: €224.90/year — save 17%',
      'pricing.basic.freelance.tooltip_annual': 'Annual: €749.90/year — save 17%',
      'pricing.pro.academy.tooltip_annual': 'Annual: €1499.90/year — save 17%',
      'pricing.pro.academyplus.tooltip_annual': 'Annual: €3299.90/year — save 17%',
      'pricing.pro.enterprise.tooltip_annual': 'Annual: €8249.90/year — save 17%',
      'pricing.edition.basic': 'Basic',
      'pricing.edition.pro': 'Pro',
      'pricing.tooltip_annual_fmt': 'Annual: €{value}/year — save 17%',
      'pricing.basic.starter.price_monthly_pro': '15.99',
      'pricing.basic.starter.price_annual_pro': '159.90',
      'pricing.basic.personal.price_monthly_pro': '33.99',
      'pricing.basic.personal.price_annual_pro': '339.90',
      'pricing.basic.freelance.price_monthly_pro': '82.99',
      'pricing.basic.freelance.price_annual_pro': '829.90',
      'pricing.pro.academy.price_monthly_pro': '224.99',
      'pricing.pro.academy.price_annual_pro': '2249.90',
      'pricing.pro.academyplus.price_monthly_pro': '494.99',
      'pricing.pro.academyplus.price_annual_pro': '4949.90',
      'pricing.pro.enterprise.price_monthly_pro': '1237.99',
      'pricing.pro.enterprise.price_annual_pro': '12379.90',
      'pricing.pro.academy.cap_basic': 'Up to 1 000 videos · 10 000 points',
      'pricing.pro.academyplus.cap_basic': 'Up to 3 000 videos · 30 000 points',
      'pricing.pro.enterprise.cap_basic': 'Up to 10 000 videos · 100 000 points',
      'pricing.trial.mailto': 'mailto:info@acornjuice.com?subject=AccuVideo%20trial%20license%20request&body=Hi%2C%0A%0AI%27d%20like%20to%20request%20a%2030-day%20AccuVideo%20trial%20license.%0A%0A-%20Plan%3A%20%5Bstarter%20%2F%20personal%20%2F%20freelance%20%2F%20academy%20%2F%20academy%20plus%20%2F%20enterprise%5D%0A-%20Operating%20system%3A%20%5Bwindows%2011%20%2F%20windows%2010%20%2F%20macos%5D%0A%0AThanks%21',
      'pricing.subscribe.mailto': 'mailto:info@acornjuice.com?subject=AccuVideo%20subscription%20request&body=Hi%2C%0A%0AI%27d%20like%20to%20subscribe%20to%20an%20AccuVideo%20plan.%0A%0A-%20Plan%3A%20%5Bstarter%20%2F%20personal%20%2F%20freelance%20%2F%20academy%20%2F%20academy%20plus%20%2F%20enterprise%5D%0A-%20Edition%3A%20%5Bbasic%20%2F%20pro%5D%0A-%20Billing%3A%20%5Bmonthly%20%2F%20annual%5D%0A-%20Operating%20system%3A%20%5Bwindows%2011%20%2F%20windows%2010%20%2F%20macos%5D%0A-%20Hardware%20ID%3A%20%5Bpaste%20here%20%E2%80%94%20see%20Settings%20%E2%86%92%20Account%20in%20AccuVideo%5D%0A%0APlease%20send%20payment%20instructions.%20Thanks%21',
      'pricing.basic.group': 'For individuals, students and families',
      'pricing.basic.starter.name': 'Starter',
      'pricing.basic.starter.price_monthly': '11.99',
      'pricing.basic.starter.price_annual': '119.90',
      'pricing.basic.starter.cap': 'Up to 100 videos · 1 000 points',
      'pricing.basic.personal.name': 'Personal',
      'pricing.basic.personal.price_monthly': '24.99',
      'pricing.basic.personal.price_annual': '249.90',
      'pricing.basic.personal.cap': 'Up to 300 videos · 3 000 points',
      'pricing.basic.freelance.name': 'Freelance',
      'pricing.basic.freelance.price_monthly': '54.99',
      'pricing.basic.freelance.price_annual': '549.90',
      'pricing.basic.freelance.cap': 'Up to 500 videos · 5 000 points',
      'pricing.basic.feat1': 'Audio + on-screen text search',
      'pricing.basic.feat2': '1 user · 1 machine',
      'pricing.basic.feat3': 'EN / ES interface',
      'pricing.pro.group': 'For academies, businesses and schools',
      'pricing.pro.academy.name': 'Academy',
      'pricing.pro.academy.price_monthly': '149.99',
      'pricing.pro.academy.price_annual': '1499.90',
      'pricing.pro.academy.cap': 'Up to 1 000 videos · 10 000 points · 15 concurrent viewers',
      'pricing.pro.academyplus.name': 'Academy Plus',
      'pricing.pro.academyplus.price_monthly': '329.99',
      'pricing.pro.academyplus.price_annual': '3299.90',
      'pricing.pro.academyplus.cap': 'Up to 3 000 videos · 30 000 points · 45 concurrent viewers',
      'pricing.pro.enterprise.name': 'Enterprise',
      'pricing.pro.enterprise.price_monthly': '824.99',
      'pricing.pro.enterprise.price_annual': '8249.90',
      'pricing.pro.enterprise.cap': 'Up to 10 000 videos · 100 000 points · 150 concurrent viewers',
      'pricing.pro.feat1': 'Visual content search (Florence-2)',
      'pricing.pro.feat2': 'AccuVideoIngest CLI · scheduled batches',
      'pricing.pro.feat3': 'Multi-client LAN streaming',
      'pricing.consult.title': 'Need a bigger setup?',
      'pricing.consult.body': 'Bigger libraries, more concurrent viewers, multi-site deployments or custom integrations — we tailor for it.',
      'pricing.consult.cta': 'Talk to Acorn Juice Solutions',
      'pricing.footnote': 'All plans include the 30-day free trial. Prices in EUR, VAT not included. Annual billing available — contact us for a quote.',
      'pricing.license.title': 'How to get your trial license',
      'pricing.license.cap': '<strong>Trial:</strong> 50 videos · 500 points · 30 days · Basic edition by default (Pro on request)',
      'pricing.license.step1': 'Download the AccuVideo installer for your edition (Basic or Pro) from the <a href="#download">Download</a> section below.',
      'pricing.license.step2': 'Email <a href="mailto:info@acornjuice.com">info@acornjuice.com</a> with two things: your <strong>operating system</strong> (Windows 10 / 11, macOS…) and the <strong>plan</strong> you want to try. We send back your 30-day trial license — paste it into AccuVideo and you\'re in. <strong>No hardware ID needed for the trial.</strong>',
      'pricing.license.notes': 'The trial runs for 30 days and the cap above is shared across all plans. When you\'re ready to subscribe, see below — paid plans are tied to your machine\'s hardware ID for security.',
      'pricing.subscribe.title': 'Ready to subscribe to a plan?',
      'pricing.subscribe.intro': 'Paid plans are activated against your machine\'s <strong>hardware ID</strong>, so each license stays bound to one specific computer.',
      'pricing.subscribe.step1': 'Install AccuVideo on the machine you\'ll use as the indexer / server (the one with the GPU for Pro).',
      'pricing.subscribe.step2': 'Open <strong>Settings → Account</strong> and copy your <strong>hardware ID</strong>. It\'s a short alphanumeric string unique to that machine.',
      'pricing.subscribe.step3': 'Email <a href="mailto:info@acornjuice.com">info@acornjuice.com</a> with your <strong>hardware ID</strong>, <strong>operating system</strong>, chosen <strong>plan</strong> and <strong>billing period</strong> (monthly / annual). We send back payment instructions and your full license.',
      'pricing.subscribe.notes': 'Each paid license is bound to that hardware ID — one indexer / server per seat. Switching computers or reinstalling the OS? Email us with the new hardware ID and we re-issue, no questions. Pro plans include LAN viewers (15 / 45 / 150); viewers connect to your server and <strong>don\'t consume their own license</strong>.',
      'pricing.subscribe.cta': 'Request subscription',

      'download.title': 'Download AccuVideo',
      'download.body': 'Windows builds available now. macOS (Apple Silicon) coming soon. Intel macOS builds available on request during the pilot.',
      'download.trial_note': '📧 First time? <a href="#pricing">Request your trial license first</a> — the installer asks for a license key on first launch.',
      'download.row_basic': 'Basic',
      'download.row_pro': 'Pro',
      'download.basic_win': 'Windows · .msi',
      'download.basic_mac': 'macOS Apple Silicon · Coming soon',
      'download.pro_win': 'Windows · .msi',
      'download.pro_mac': 'macOS Apple Silicon · Coming soon',
      'download.subnote_link': 'View all release files',
      'download.subnote_suffix': ' — changelog, hashes, older versions.',
      'download.note': 'Need an Intel macOS build, an enterprise license, or have a question first? Email <a href="mailto:info@acornjuice.com?subject=AccuVideo%20trial%20request">info@acornjuice.com</a>.',

      'req.title': 'System requirements',
      'req.sub': 'AccuVideo Basic runs on commodity laptops. Pro adds visual ingestion (Florence-2), which is GPU-bound — those specs are higher.',
      'req.min.title': 'Basic — audio + on-screen text',
      'req.min.cpu': 'CPU: Intel i5 (8th gen) / Ryzen 5 2600+ / Apple Silicon M1',
      'req.min.ram': 'RAM: 8 GB',
      'req.min.gpu': 'GPU: integrated (no dedicated GPU needed)',
      'req.min.disk': 'Disk: SSD with ~50 GB free',
      'req.min.os': 'OS: Windows 10/11, macOS 12+',
      'req.rec.title': 'Pro — adds visual ingestion',
      'req.rec.cpu': 'CPU: Intel i7 (10th gen+) / Ryzen 7+ / Apple Silicon M2+',
      'req.rec.ram': 'RAM: 16 GB (32 GB for batch / multi-client)',
      'req.rec.gpu': 'GPU: NVIDIA RTX 3060 12 GB / RTX 4060+ with CUDA (≥6 GB VRAM) — required for visual indexing at usable speed',
      'req.rec.disk': 'Disk: SSD for OS + models; HDD or SSD for the video library',
      'req.rec.net': 'Network: stable connection for the managed vector DB',
      'req.footnote': 'Full hardware notes, multi-client setup and ingestion timing benchmarks: see the <a href="https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_EN.md">hardware requirements doc</a>.',

      'contact.title': 'Request your trial license',
      'contact.sub': 'We\'ll email it back within 1 business day.',
      'contact.field.email': 'Email',
      'contact.field.plan': 'Plan',
      'contact.field.edition': 'Edition',
      'contact.field.os': 'Operating system',
      'contact.field.notes': 'Notes',
      'contact.submit': 'Send request',
      'contact.fallback': 'Or email us directly:',
      'contact.status.sending': 'Sending…',
      'contact.status.success': 'Request sent! We\'ll email you back within 1 business day.',
      'contact.status.error': 'Error sending. Please email info@acornjuice.com directly.',
      'contact.status.network': 'Network error. Please email info@acornjuice.com directly.',
      'contact.status.notconfigured': 'Form not configured. Paste your Web3Forms access key in main.js (WEB3FORMS_KEY).',

      'footer.docs': 'Documentation',
      'footer.docs_url': 'https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_EN.md'
    },
    es: {
      'meta.title': 'AccuVideo — Encuentra el momento',
      'meta.description': 'Búsqueda semántica en tu videoteca. Pregúntalo en lenguaje natural y aterriza en el segundo exacto. 100% local — tus vídeos no salen de tu equipo.',

      'nav.features': 'Características',
      'nav.how': 'Cómo funciona',
      'nav.ingest': 'Ingesta',
      'nav.editions': 'Ediciones',
      'nav.pricing': 'Precios',
      'nav.requirements': 'Requisitos',
      'nav.cta': 'Probar gratis',

      'hero.eyebrow': 'Por Acorn Juice Solutions',
      'hero.title': 'Deja de arrastrar la barra. <span class="accent">Solo pregúntalo.</span>',
      'hero.lede': 'AccuVideo busca en toda tu videoteca por lo que se dice, lo que aparece en pantalla y lo que se ve en cámara — y te lleva al segundo exacto.',
      'hero.cta_primary': 'Descargar · 30 días de prueba',
      'hero.cta_secondary': 'Ver cómo funciona',
      'hero.note': '100% local · Windows · macOS (Apple Silicon)',

      'mock.query': 'explica el descenso por gradiente',
      'mock.result1.title': 'Clase ML 04 — Optimización',
      'mock.result2.title': 'Pizarra: derivación',
      'mock.result3.title': 'Diapositiva: función de pérdida',
      'mock.tag.audio': 'audio',
      'mock.tag.visual': 'visual',
      'mock.tag.text': 'texto en pantalla',

      'features.title': 'Tres formas de encontrar el momento',
      'features.sub': 'AccuVideo indexa todas las capas de tus vídeos y te deja buscarlas en lenguaje natural.',
      'features.audio.title': 'Palabras habladas',
      'features.audio.body': 'Whisper transcribe cada vídeo en local. Busca en el diálogo, la clase o la reunión — y salta al segundo exacto en que se dijo.',
      'features.text.title': 'Texto en pantalla',
      'features.text.body': 'Diapositivas, rótulos, código en una pizarra. AccuVideo lee lo que aparece escrito en pantalla y lo hace buscable.',
      'features.visual.title': 'Contenido visual',
      'features.visual.body': 'Un modelo visión-lenguaje describe lo que se ve en el frame — "niños soplando las velas", "escena de baile", "fórmula en la pizarra".',

      'how.title': 'Cómo funciona',
      'how.s1.title': 'Apunta AccuVideo a tus vídeos',
      'how.s1.body': 'Elige una o varias carpetas en tu equipo. AccuVideo admite MP4, MKV, AVI, MOV, WMV, FLV, WebM, M4V, TS, MPEG.',
      'how.s2.title': 'Indexa en local',
      'how.s2.body': 'Las transcripciones, el texto en pantalla y las descripciones visuales se calculan en tu equipo. Los embeddings van a un índice vectorial — tu vídeo en crudo no sale de ahí.',
      'how.s3.title': 'Pregunta y aterriza en el segundo',
      'how.s3.body': 'Escribe una pregunta. Elige el resultado. El reproductor abre el fragmento exacto que la responde — con controles de retroceso si necesitas contexto.',

      'ingest.title': 'Dos formas de añadir vídeos',
      'ingest.sub': 'Elige la que mejor encaje con cómo tienes organizada tu videoteca. Puedes combinar ambas — carpetas para el archivo grande y arrastrar y soltar para ficheros sueltos.',
      'ingest.folder.title': 'Seleccionar una carpeta',
      'ingest.folder.lead': 'Apunta AccuVideo a una o varias carpetas de tu disco.',
      'ingest.folder.b1': 'Los vídeos se indexan <strong>en su sitio</strong> — no se copian ni se mueven.',
      'ingest.folder.b2': 'Cero uso extra de disco más allá del propio índice.',
      'ingest.folder.b3': 'Ideal para bibliotecas organizadas y archivos grandes en discos internos, NAS o discos externos.',
      'ingest.drop.title': 'Arrastrar y soltar vídeos',
      'ingest.drop.lead': 'Suelta ficheros sueltos directamente sobre la ventana de la app.',
      'ingest.drop.b1': 'Los ficheros se <strong>copian a una carpeta temporal gestionada</strong> — tu vídeo se duplica en disco.',
      'ingest.drop.b2': 'Cómodo cuando los ficheros están dispersos, están en un dispositivo extraíble o solo quieres probar la app con un clip.',
      'ingest.drop.b3': 'Aviso: soltar muchos vídeos puede hacer crecer bastante esa carpeta gestionada.',
      'ingest.drop.tip': '💡 Puedes liberar ese espacio cuando quieras desde <strong>Ajustes → Almacenamiento</strong>: borra las copias temporales sin perder el índice ni los resultados de búsqueda.',

      'usecases.title': 'Pensado para archivos que nadie tiene tiempo de volver a ver',
      'usecases.academy.title': 'Academias online',
      'usecases.academy.body': 'Cientos de clases. Una consulta, un minuto.',
      'usecases.corp.title': 'Formación corporativa',
      'usecases.corp.body': 'Salta a la diapositiva en un all-hands de 3 horas.',
      'usecases.student.title': 'Estudiantes',
      'usecases.student.body': 'Encuentra el momento en que tu profe explicó <em>ese</em> concepto.',
      'usecases.family.title': 'Familias',
      'usecases.family.body': 'Años de vídeo en un disco duro. Búscalos como recuerdos, no como ficheros.',

      'local.title': '100% local. Tus vídeos no salen de tu equipo.',
      'local.body': 'Sin subida de tu contenido a la nube. Sin suscripción para leer tu propio archivo. La indexación, transcripción, visión y búsqueda corren en tu hardware.',
      'privacy.local.title': 'Los vídeos se quedan en tu disco',
      'privacy.local.body': 'Los MP4, MKV y compañía no se suben a ningún sitio. La transcripción, lectura de texto en pantalla y análisis visual corren en tu propia CPU/GPU — sin paso por la nube, sin ningún servidor de terceros viendo tus vídeos.',
      'privacy.points.title': 'En el índice solo entran puntos abstractos',
      'privacy.points.body': 'Lo que se guarda en la base de datos vectorial son <strong>embeddings</strong> — puntos numéricos de alta dimensión derivados de tu contenido. Hacen posible la búsqueda semántica pero no se pueden revertir a vídeo reproducible, transcripciones legibles ni frames reconocibles.',
      'privacy.isolation.title': 'Tu colección, solo tuya',
      'privacy.isolation.body': '<strong>Cada usuario tiene una colección totalmente aislada</strong>, ligada a su licencia. Ningún otro usuario de AccuVideo puede consultar tu biblioteca, ver tus fragmentos ni siquiera saber que tu colección existe. Multi-tenant por diseño, single-tenant en la práctica.',

      'editions.title': 'Dos ediciones',
      'editions.sub': 'Ambas ediciones comparten la misma experiencia de búsqueda local. Basic cubre palabras habladas y texto en pantalla. Pro añade comprensión visual, una CLI para ingesta por lotes de archivos grandes y streaming multi-cliente en la LAN.',
      'editions.basic.title': 'Basic',
      'editions.basic.tag': 'Para particulares, estudiantes y bibliotecas modestas',
      'editions.basic.f1': 'Búsqueda semántica sobre palabras habladas (transcripción Whisper, en local)',
      'editions.basic.f2': 'Indexación de texto en pantalla — diapositivas, rótulos, carteles, código en una pizarra',
      'editions.basic.f3': 'Ingesta desde la app — suelta una carpeta y mírala indexarse',
      'editions.basic.f4': 'Uso en una sola máquina, UI EN/ES, tema claro y oscuro',
      'editions.basic.f5': 'Transcripción multilingüe — elige el idioma del audio (o auto-detección); traducción opcional para búsqueda multiidioma',
      'editions.basic.bestfor': '<strong>Ideal para:</strong> estudiantes, particulares y familias con una videoteca modesta.',
      'editions.basic.cta_win': 'Windows · .msi',
      'editions.basic.cta_mac': 'macOS · Próximamente',
      'editions.pro.title': 'Pro',
      'editions.pro.tag': 'Para academias, empresas, colegios y archivos grandes',
      'editions.pro.f1': 'Todo lo de Basic',
      'editions.pro.f2': 'Búsqueda de contenido visual (Florence-2) — encuentra escenas por lo que se ve en el frame',
      'editions.pro.f3': 'Re-ranking cross-modal — audio + texto en pantalla + visual combinados para resultados más precisos',
      'editions.pro.f4': '<strong>CLI AccuVideoIngest</strong> — herramienta headless por lotes que indexa cientos de ficheros en un solo comando, con logs de progreso y reanudación tras fallos',
      'editions.pro.f5': 'Lotes programados / nocturnos — automatiza la ingesta diaria con el Programador de tareas (Windows); ideal para archivos que crecen',
      'editions.pro.f6': 'Streaming multi-cliente en LAN — sirve a varios clientes simultáneos desde una misma máquina',
      'editions.pro.f7': 'Ideal para procesar vídeos sin audio — la indexación visual los cubre por sí sola',
      'editions.pro.bestfor': '<strong>Ideal para:</strong> academias online, formación corporativa, colegios, archivos familiares grandes y cualquier escenario multi-usuario.',
      'editions.pro.cta_win': 'Windows · .msi',
      'editions.pro.cta_mac': 'macOS · Próximamente',

      'pricing.title': 'Planes y precios',
      'pricing.sub': 'Elige el tamaño que se ajuste a tu videoteca. ¿Necesitas algo más grande? Hablamos.',
      'pricing.period.monthly': '/mes',
      'pricing.period.annual': '/año',
      'pricing.toggle.monthly': 'Mensual',
      'pricing.toggle.annual': 'Anual',
      'pricing.toggle.hint': '💰 Pago anual = 2 meses gratis',
      'pricing.badge.popular': 'Más popular',
      'pricing.cta_trial': 'Solicitar licencia trial',
      'pricing.points.info': 'Los puntos son los fragmentos buscables por vídeo — aprox. 1 punto por cada 6 segundos de contenido indexado (audio, texto en pantalla o frames visuales). ~10 puntos por minuto de media.',
      'pricing.basic.starter.tooltip_annual': 'Anual: 104,90 €/año — ahorras 17%',
      'pricing.basic.personal.tooltip_annual': 'Anual: 224,90 €/año — ahorras 17%',
      'pricing.basic.freelance.tooltip_annual': 'Anual: 749,90 €/año — ahorras 17%',
      'pricing.pro.academy.tooltip_annual': 'Anual: 1499,90 €/año — ahorras 17%',
      'pricing.pro.academyplus.tooltip_annual': 'Anual: 3299,90 €/año — ahorras 17%',
      'pricing.pro.enterprise.tooltip_annual': 'Anual: 8249,90 €/año — ahorras 17%',
      'pricing.edition.basic': 'Basic',
      'pricing.edition.pro': 'Pro',
      'pricing.tooltip_annual_fmt': 'Anual: {value} €/año — ahorras 17%',
      'pricing.basic.starter.price_monthly_pro': '15,99',
      'pricing.basic.starter.price_annual_pro': '159,90',
      'pricing.basic.personal.price_monthly_pro': '33,99',
      'pricing.basic.personal.price_annual_pro': '339,90',
      'pricing.basic.freelance.price_monthly_pro': '82,99',
      'pricing.basic.freelance.price_annual_pro': '829,90',
      'pricing.pro.academy.price_monthly_pro': '224,99',
      'pricing.pro.academy.price_annual_pro': '2249,90',
      'pricing.pro.academyplus.price_monthly_pro': '494,99',
      'pricing.pro.academyplus.price_annual_pro': '4949,90',
      'pricing.pro.enterprise.price_monthly_pro': '1237,99',
      'pricing.pro.enterprise.price_annual_pro': '12379,90',
      'pricing.pro.academy.cap_basic': 'Hasta 1 000 vídeos · 10 000 puntos',
      'pricing.pro.academyplus.cap_basic': 'Hasta 3 000 vídeos · 30 000 puntos',
      'pricing.pro.enterprise.cap_basic': 'Hasta 10 000 vídeos · 100 000 puntos',
      'pricing.trial.mailto': 'mailto:info@acornjuice.com?subject=Solicitud%20licencia%20trial%20AccuVideo&body=Hola%2C%0A%0AQuer%C3%ADa%20solicitar%20una%20licencia%20trial%20de%2030%20d%C3%ADas%20para%20AccuVideo.%0A%0A-%20Plan%3A%20%5Bstarter%20%2F%20personal%20%2F%20freelance%20%2F%20academy%20%2F%20academy%20plus%20%2F%20enterprise%5D%0A-%20Sistema%20operativo%3A%20%5Bwindows%2011%20%2F%20windows%2010%20%2F%20macos%5D%0A%0A%C2%A1Gracias%21',
      'pricing.subscribe.mailto': 'mailto:info@acornjuice.com?subject=Solicitud%20suscripci%C3%B3n%20AccuVideo&body=Hola%2C%0A%0AQuer%C3%ADa%20suscribirme%20a%20un%20plan%20de%20AccuVideo.%0A%0A-%20Plan%3A%20%5Bstarter%20%2F%20personal%20%2F%20freelance%20%2F%20academy%20%2F%20academy%20plus%20%2F%20enterprise%5D%0A-%20Edici%C3%B3n%3A%20%5Bbasic%20%2F%20pro%5D%0A-%20Facturaci%C3%B3n%3A%20%5Bmensual%20%2F%20anual%5D%0A-%20Sistema%20operativo%3A%20%5Bwindows%2011%20%2F%20windows%2010%20%2F%20macos%5D%0A-%20Hardware%20ID%3A%20%5Bpega%20aqu%C3%AD%20%E2%80%94%20ver%20Ajustes%20%E2%86%92%20Cuenta%20en%20AccuVideo%5D%0A%0APor%20favor%20env%C3%ADame%20instrucciones%20de%20pago.%20%C2%A1Gracias%21',
      'pricing.basic.group': 'Para particulares, estudiantes y familias',
      'pricing.basic.starter.name': 'Starter',
      'pricing.basic.starter.price_monthly': '11,99',
      'pricing.basic.starter.price_annual': '119,90',
      'pricing.basic.starter.cap': 'Hasta 100 vídeos · 1 000 puntos',
      'pricing.basic.personal.name': 'Personal',
      'pricing.basic.personal.price_monthly': '24,99',
      'pricing.basic.personal.price_annual': '249,90',
      'pricing.basic.personal.cap': 'Hasta 300 vídeos · 3 000 puntos',
      'pricing.basic.freelance.name': 'Freelance',
      'pricing.basic.freelance.price_monthly': '54,99',
      'pricing.basic.freelance.price_annual': '549,90',
      'pricing.basic.freelance.cap': 'Hasta 500 vídeos · 5 000 puntos',
      'pricing.basic.feat1': 'Búsqueda en audio + texto en pantalla',
      'pricing.basic.feat2': '1 usuario · 1 máquina',
      'pricing.basic.feat3': 'Interfaz EN / ES',
      'pricing.pro.group': 'Para academias, empresas y colegios',
      'pricing.pro.academy.name': 'Academy',
      'pricing.pro.academy.price_monthly': '149,99',
      'pricing.pro.academy.price_annual': '1499,90',
      'pricing.pro.academy.cap': 'Hasta 1 000 vídeos · 10 000 puntos · 15 clientes LAN',
      'pricing.pro.academyplus.name': 'Academy Plus',
      'pricing.pro.academyplus.price_monthly': '329,99',
      'pricing.pro.academyplus.price_annual': '3299,90',
      'pricing.pro.academyplus.cap': 'Hasta 3 000 vídeos · 30 000 puntos · 45 clientes LAN',
      'pricing.pro.enterprise.name': 'Enterprise',
      'pricing.pro.enterprise.price_monthly': '824,99',
      'pricing.pro.enterprise.price_annual': '8249,90',
      'pricing.pro.enterprise.cap': 'Hasta 10 000 vídeos · 100 000 puntos · 150 clientes LAN',
      'pricing.pro.feat1': 'Búsqueda de contenido visual (Florence-2)',
      'pricing.pro.feat2': 'CLI AccuVideoIngest · lotes programados',
      'pricing.pro.feat3': 'Streaming multi-cliente en LAN',
      'pricing.consult.title': '¿Necesitas algo más grande?',
      'pricing.consult.body': 'Bibliotecas más grandes, más clientes simultáneos, despliegues multi-sede o integraciones a medida — lo adaptamos a ti.',
      'pricing.consult.cta': 'Consultar con Acorn Juice Solutions',
      'pricing.footnote': 'Todos los planes incluyen los 30 días de prueba gratuita. Precios en EUR, IVA no incluido. Facturación anual disponible — escríbenos para presupuesto.',
      'pricing.license.title': 'Cómo conseguir tu licencia trial',
      'pricing.license.cap': '<strong>Trial:</strong> 50 vídeos · 500 puntos · 30 días · edición Basic por defecto (Pro a petición)',
      'pricing.license.step1': 'Descarga el instalador de AccuVideo para tu edición (Basic o Pro) desde la sección <a href="#download">Descarga</a> de abajo.',
      'pricing.license.step2': 'Escríbenos a <a href="mailto:info@acornjuice.com">info@acornjuice.com</a> con dos cosas: tu <strong>sistema operativo</strong> (Windows 10 / 11, macOS…) y el <strong>plan</strong> que quieres probar. Te enviamos tu licencia trial de 30 días — la pegas en AccuVideo y listo. <strong>No hace falta hardware ID para la trial.</strong>',
      'pricing.license.notes': 'La trial dura 30 días y el cap de arriba se aplica a todos los planes. Cuando quieras suscribirte, mira más abajo — los planes de pago van ligados al hardware ID de tu equipo por seguridad.',
      'pricing.subscribe.title': '¿Listo para suscribirte a un plan?',
      'pricing.subscribe.intro': 'Los planes de pago se activan contra el <strong>hardware ID</strong> de tu equipo, así cada licencia queda vinculada a una máquina específica.',
      'pricing.subscribe.step1': 'Instala AccuVideo en la máquina que vas a usar como indexador / servidor (la que tenga la GPU para Pro).',
      'pricing.subscribe.step2': 'Abre <strong>Ajustes → Cuenta</strong> y copia tu <strong>hardware ID</strong>. Es una cadena alfanumérica corta única de esa máquina.',
      'pricing.subscribe.step3': 'Escríbenos a <a href="mailto:info@acornjuice.com">info@acornjuice.com</a> con tu <strong>hardware ID</strong>, <strong>sistema operativo</strong>, <strong>plan</strong> elegido y <strong>periodo de facturación</strong> (mensual / anual). Te enviamos las instrucciones de pago y tu licencia completa.',
      'pricing.subscribe.notes': 'Cada licencia de pago está vinculada a ese hardware ID — un indexador / servidor por seat. ¿Cambias de equipo o reinstalas el SO? Escríbenos con el nuevo hardware ID y la re-emitimos sin preguntas. Los planes Pro incluyen clientes en LAN (15 / 45 / 150); los clientes se conectan a tu servidor y <strong>no consumen licencia propia</strong>.',
      'pricing.subscribe.cta': 'Solicitar suscripción',

      'download.title': 'Descarga AccuVideo',
      'download.body': 'Builds para Windows disponibles ya. macOS (Apple Silicon) próximamente. Builds para macOS Intel disponibles bajo petición durante el piloto.',
      'download.trial_note': '📧 ¿Primera vez? <a href="#pricing">Solicita primero tu licencia trial</a> — el instalador pide la clave de licencia en el primer arranque.',
      'download.row_basic': 'Basic',
      'download.row_pro': 'Pro',
      'download.basic_win': 'Windows · .msi',
      'download.basic_mac': 'macOS Apple Silicon · Próximamente',
      'download.pro_win': 'Windows · .msi',
      'download.pro_mac': 'macOS Apple Silicon · Próximamente',
      'download.subnote_link': 'Ver todos los ficheros del release',
      'download.subnote_suffix': ' — changelog, hashes, versiones anteriores.',
      'download.note': '¿Necesitas un build para macOS Intel, una licencia enterprise o tienes una duda primero? Escribe a <a href="mailto:info@acornjuice.com?subject=Consulta%20AccuVideo">info@acornjuice.com</a>.',

      'req.title': 'Requisitos del sistema',
      'req.sub': 'AccuVideo Basic corre en portátiles normales. Pro añade ingesta visual (Florence-2), que depende de GPU — sus requisitos son mayores.',
      'req.min.title': 'Basic — audio + texto en pantalla',
      'req.min.cpu': 'CPU: Intel i5 (8.ª gen) / Ryzen 5 2600+ / Apple Silicon M1',
      'req.min.ram': 'RAM: 8 GB',
      'req.min.gpu': 'GPU: integrada (no requiere GPU dedicada)',
      'req.min.disk': 'Disco: SSD con ~50 GB libres',
      'req.min.os': 'SO: Windows 10/11, macOS 12+',
      'req.rec.title': 'Pro — añade ingesta visual',
      'req.rec.cpu': 'CPU: Intel i7 (10.ª gen+) / Ryzen 7+ / Apple Silicon M2+',
      'req.rec.ram': 'RAM: 16 GB (32 GB para batch / multi-cliente)',
      'req.rec.gpu': 'GPU: NVIDIA RTX 3060 12 GB / RTX 4060+ con CUDA (≥6 GB VRAM) — necesaria para indexación visual a velocidad razonable',
      'req.rec.disk': 'Disco: SSD para SO + modelos; HDD o SSD para la videoteca',
      'req.rec.net': 'Red: conexión estable para el DB vectorial gestionado',
      'req.footnote': 'Notas completas de hardware, configuración multi-cliente y benchmarks de ingesta: ver el <a href="https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_ES.md">documento de requisitos</a>.',

      'contact.title': 'Solicita tu licencia trial',
      'contact.sub': 'Te la enviamos por email en 1 día laborable.',
      'contact.field.email': 'Email',
      'contact.field.plan': 'Plan',
      'contact.field.edition': 'Edición',
      'contact.field.os': 'Sistema operativo',
      'contact.field.notes': 'Notas',
      'contact.submit': 'Enviar solicitud',
      'contact.fallback': 'O escríbenos directamente:',
      'contact.status.sending': 'Enviando…',
      'contact.status.success': '¡Solicitud enviada! Te respondemos por email en 1 día laborable.',
      'contact.status.error': 'Error al enviar. Escribe directamente a info@acornjuice.com.',
      'contact.status.network': 'Error de red. Escribe directamente a info@acornjuice.com.',
      'contact.status.notconfigured': 'Formulario sin configurar. Pega tu access key de Web3Forms en main.js (WEB3FORMS_KEY).',

      'footer.docs': 'Documentación',
      'footer.docs_url': 'https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_ES.md'
    }
  };

  function detectInitialLang() {
    const stored = (() => { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } })();
    if (stored && SUPPORTED.includes(stored)) return stored;
    const browser = (navigator.language || 'en').toLowerCase();
    if (browser.startsWith('es')) return 'es';
    return 'en';
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    document.documentElement.lang = lang;
    const dict = i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (value === undefined) return;
      if (el.tagName === 'META' && el.hasAttribute('content')) {
        el.setAttribute('content', value);
      } else if (el.tagName === 'TITLE') {
        el.textContent = value;
        document.title = value;
      } else {
        el.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-href]').forEach((el) => {
      const key = el.getAttribute('data-i18n-href');
      const value = dict[key];
      if (value !== undefined) el.setAttribute('href', value);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = dict[key];
      if (value !== undefined) el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-i18n-tooltip]').forEach((el) => {
      const key = el.getAttribute('data-i18n-tooltip');
      const value = dict[key];
      if (value !== undefined) {
        el.setAttribute('data-tooltip', value);
        el.setAttribute('title', value);
      }
    });

    document.querySelectorAll('.price-card').forEach(applyEditionToCard);

    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
      const desired = `assets/videos/demo-${lang}.mp4`;
      if (heroVideo.getAttribute('src') !== desired) {
        heroVideo.setAttribute('src', desired);
        heroVideo.load();
        heroVideo.play().catch(() => {});
      }
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { /* ignore */ }
  }

  function bindToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = document.documentElement.lang === 'es' ? 'en' : 'es';
      applyLang(next);
    });
  }

  function detectInitialTheme() {
    const stored = (() => { try { return localStorage.getItem(STORAGE_KEY_THEME); } catch (_) { return null; } })();
    if (stored && SUPPORTED_THEMES.includes(stored)) return stored;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    return 'dark';
  }

  function applyTheme(theme) {
    if (!SUPPORTED_THEMES.includes(theme)) theme = 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY_THEME, theme); } catch (_) { /* ignore */ }
  }

  function bindThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  }

  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function applyEditionToCard(card) {
    const edition = card.getAttribute('data-edition') || 'basic';
    const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
    const dict = i18n[lang] || {};

    const priceNum = card.querySelector('.price-num');
    if (priceNum) {
      const baseKey = priceNum.getAttribute('data-i18n');
      const proKey = baseKey ? baseKey + '_pro' : null;
      const useKey = edition === 'pro' && proKey && dict[proKey] !== undefined ? proKey : baseKey;
      if (useKey && dict[useKey] !== undefined) priceNum.textContent = dict[useKey];
    }

    const annualIcon = card.querySelector('.info-icon[data-annual-key]');
    if (annualIcon) {
      const baseKey = annualIcon.getAttribute('data-annual-key');
      const proKey = baseKey + '_pro';
      const useKey = edition === 'pro' && dict[proKey] !== undefined ? proKey : baseKey;
      const value = dict[useKey];
      if (value !== undefined) {
        const tmpl = dict['pricing.tooltip_annual_fmt'] || 'Annual: €{value}/year — save 17%';
        const text = tmpl.replace('{value}', value);
        annualIcon.setAttribute('data-tooltip', text);
        annualIcon.setAttribute('title', text);
      }
    }

    const capSpan = card.querySelector('.price-cap span[data-i18n]');
    if (capSpan) {
      const baseKey = capSpan.getAttribute('data-i18n');
      const basicKey = baseKey + '_basic';
      const useKey = edition === 'basic' && dict[basicKey] !== undefined ? basicKey : baseKey;
      if (dict[useKey] !== undefined) capSpan.innerHTML = dict[useKey];
    }

    card.querySelectorAll('.price-tab').forEach((t) => {
      const active = t.getAttribute('data-edition') === edition;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  function bindEditionTabs() {
    document.querySelectorAll('.price-card').forEach((card) => {
      card.querySelectorAll('.price-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          const edition = tab.getAttribute('data-edition');
          if (edition) {
            card.setAttribute('data-edition', edition);
            applyEditionToCard(card);
          }
        });
      });
      applyEditionToCard(card);
    });
  }

  function bindPriceToggle() {
    const buttons = document.querySelectorAll('.price-toggle-btn');
    if (!buttons.length) return;
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const period = btn.dataset.period;
        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        document.querySelectorAll('.price-monthly').forEach((el) => { el.hidden = period !== 'monthly'; });
        document.querySelectorAll('.price-annual').forEach((el) => { el.hidden = period !== 'annual'; });
      });
    });
  }

  function tt(key) {
    const lang = document.documentElement.lang === 'es' ? 'es' : 'en';
    return (i18n[lang] && i18n[lang][key]) || (i18n.en && i18n.en[key]) || key;
  }

  function openContactModal(plan, edition) {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (plan) {
      const planSelect = modal.querySelector('select[name="plan"]');
      if (planSelect) {
        const match = Array.from(planSelect.options).find((o) => o.value === plan || o.textContent.trim() === plan);
        if (match) planSelect.value = match.value || match.textContent.trim();
      }
    }
    const editionSelect = modal.querySelector('select[name="edition"]');
    if (editionSelect) editionSelect.value = edition === 'pro' ? 'Pro' : 'Basic';
    const firstField = modal.querySelector('input, select, textarea');
    if (firstField) setTimeout(() => firstField.focus(), 50);
  }

  function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    const status = document.getElementById('contact-form-status');
    if (status) { status.textContent = ''; status.className = 'contact-form-status'; }
  }

  function bindContactModal() {
    const modal = document.getElementById('contact-modal');
    if (!modal) return;

    modal.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeContactModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeContactModal();
    });

    document.querySelectorAll('a[href*="mailto:info@acornjuice.com"]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (!/trial/i.test(href)) return;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        let plan = '';
        let edition = 'basic';
        const card = a.closest('.price-card');
        if (card) {
          const name = card.querySelector('.price-name');
          if (name) plan = name.textContent.trim();
          edition = card.getAttribute('data-edition') || 'basic';
        }
        openContactModal(plan, edition);
      });
    });

    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-form-status');
    if (!form || !status) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const payload = {
        email: data.get('email') || '',
        plan: data.get('plan') || '',
        edition: data.get('edition') || '',
        os: data.get('os') || '',
        message: data.get('message') || '',
        _subject: 'AccuVideo trial license request',
        _template: 'table',
        _captcha: 'false',
      };
      status.textContent = tt('contact.status.sending');
      status.className = 'contact-form-status';
      try {
        const res = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(TRIAL_FORM_EMAIL), {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        const ok = json.success === true || json.success === 'true';
        if (ok) {
          status.textContent = tt('contact.status.success');
          status.className = 'contact-form-status success';
          form.reset();
          setTimeout(closeContactModal, 3500);
        } else {
          status.textContent = json.message || tt('contact.status.error');
          status.className = 'contact-form-status error';
        }
      } catch (_) {
        status.textContent = tt('contact.status.network');
        status.className = 'contact-form-status error';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(detectInitialTheme());
    applyLang(detectInitialLang());
    bindToggle();
    bindThemeToggle();
    bindPriceToggle();
    bindEditionTabs();
    bindContactModal();
    setFooterYear();
  });
})();
