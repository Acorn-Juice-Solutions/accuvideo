(function () {
  'use strict';

  const STORAGE_KEY = 'accuvideo-lang';
  const SUPPORTED = ['en', 'es'];

  const i18n = {
    en: {
      'meta.title': 'AccuVideo — Find the moment',
      'meta.description': 'Semantic search over your video library. Ask in plain language, jump to the exact second. 100% local — your videos never leave your machine.',

      'nav.features': 'Features',
      'nav.how': 'How it works',
      'nav.editions': 'Editions',
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

      'usecases.title': 'Built for archives that nobody has time to rewatch',
      'usecases.academy.title': 'Online academies',
      'usecases.academy.body': 'Hundreds of lessons. One query, one minute.',
      'usecases.corp.title': 'Corporate training',
      'usecases.corp.body': 'Skip to the slide in a 3-hour all-hands.',
      'usecases.student.title': 'Students',
      'usecases.student.body': 'Find the moment your professor covered <em>that</em> concept.',
      'usecases.family.title': 'Families & prosumers',
      'usecases.family.body': 'Years of footage on a hard drive. Search them like memories, not files.',

      'local.title': '100% local. Your videos never leave your machine.',
      'local.body': 'No cloud upload of your content. No subscription to read your own archive. Indexing, transcription, vision and search all run on your hardware.',

      'editions.title': 'Two editions',
      'editions.sub': 'Both editions share the same local-first search experience. Basic covers spoken words and on-screen text. Pro adds visual understanding, a CLI for batch ingestion of large archives, and multi-client LAN streaming.',
      'editions.basic.title': 'Basic',
      'editions.basic.tag': 'For individuals, students and modest libraries',
      'editions.basic.f1': 'Semantic search over spoken words (Whisper transcription, runs locally)',
      'editions.basic.f2': 'On-screen text indexing — slides, captions, signs, code on a whiteboard',
      'editions.basic.f3': 'In-app ingestion — drop a folder, watch it index',
      'editions.basic.f4': 'Single-machine use, EN/ES UI, dark and light themes',
      'editions.basic.bestfor': '<strong>Best for:</strong> students, individuals and families with a modest video collection.',
      'editions.basic.cta_win': 'Windows · .msi',
      'editions.basic.cta_mac': 'macOS ARM · .dmg',
      'editions.pro.title': 'Pro',
      'editions.pro.tag': 'For academies, businesses, schools and large archives',
      'editions.pro.f1': 'Everything in Basic',
      'editions.pro.f2': 'Visual content search (Florence-2) — find scenes by what\'s actually in the frame',
      'editions.pro.f3': 'Cross-modal re-ranking — audio + on-screen text + visual signals fused for sharper results',
      'editions.pro.f4': '<strong>AccuVideoIngest CLI</strong> — headless batch tool to index hundreds of files in one command, with progress logs and resume on failure',
      'editions.pro.f5': 'Scheduled / overnight batches — automate nightly ingestion via Task Scheduler (Windows) or cron (Linux/macOS); ideal for growing archives',
      'editions.pro.f6': 'Multi-client LAN streaming — serve concurrent viewers from one machine',
      'editions.pro.bestfor': '<strong>Best for:</strong> online academies, corporate training, schools, large family archives and any multi-user setup.',
      'editions.pro.cta_win': 'Windows · .msi',
      'editions.pro.cta_mac': 'macOS ARM · .dmg',

      'download.title': 'Download AccuVideo',
      'download.body': '30-day free trial. Direct downloads for Windows and macOS (Apple Silicon). Intel macOS and Linux builds available on request during the pilot.',
      'download.row_basic': 'Basic',
      'download.row_pro': 'Pro',
      'download.basic_win': 'Windows · .msi',
      'download.basic_mac': 'macOS Apple Silicon · .dmg',
      'download.pro_win': 'Windows · .msi',
      'download.pro_mac': 'macOS Apple Silicon · .dmg',
      'download.subnote_link': 'View all release files',
      'download.subnote_suffix': ' — changelog, hashes, older versions.',
      'download.note': 'Need an Intel macOS build, a Linux build, an enterprise license, or have a question first? Email <a href="mailto:info@acornjuice.com?subject=AccuVideo%20trial%20request">info@acornjuice.com</a>.',

      'req.title': 'System requirements',
      'req.sub': 'AccuVideo Basic runs on commodity laptops. Pro adds visual ingestion (Florence-2), which is GPU-bound — those specs are higher.',
      'req.min.title': 'Basic — audio + on-screen text',
      'req.min.cpu': 'CPU: Intel i5 (8th gen) / Ryzen 5 2600+ / Apple Silicon M1',
      'req.min.ram': 'RAM: 8 GB',
      'req.min.gpu': 'GPU: integrated (no dedicated GPU needed)',
      'req.min.disk': 'Disk: SSD with ~50 GB free',
      'req.min.os': 'OS: Windows 10/11, macOS 12+, Ubuntu 20.04+',
      'req.rec.title': 'Pro — adds visual ingestion',
      'req.rec.cpu': 'CPU: Intel i7 (10th gen+) / Ryzen 7+ / Apple Silicon M2+',
      'req.rec.ram': 'RAM: 16 GB (32 GB for batch / multi-client)',
      'req.rec.gpu': 'GPU: NVIDIA RTX 3060 12 GB / RTX 4060+ with CUDA (≥6 GB VRAM) — required for visual indexing at usable speed',
      'req.rec.disk': 'Disk: SSD for OS + models; HDD or SSD for the video library',
      'req.rec.net': 'Network: stable connection for the managed vector DB',
      'req.footnote': 'Full hardware notes, multi-client setup and ingestion timing benchmarks: see the <a href="https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_EN.md">hardware requirements doc</a>.',

      'footer.docs': 'Documentation',
      'footer.docs_url': 'https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_EN.md'
    },
    es: {
      'meta.title': 'AccuVideo — Encuentra el momento',
      'meta.description': 'Búsqueda semántica en tu videoteca. Pregúntalo en lenguaje natural y aterriza en el segundo exacto. 100% local — tus vídeos no salen de tu equipo.',

      'nav.features': 'Características',
      'nav.how': 'Cómo funciona',
      'nav.editions': 'Ediciones',
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

      'usecases.title': 'Pensado para archivos que nadie tiene tiempo de volver a ver',
      'usecases.academy.title': 'Academias online',
      'usecases.academy.body': 'Cientos de clases. Una consulta, un minuto.',
      'usecases.corp.title': 'Formación corporativa',
      'usecases.corp.body': 'Salta a la diapositiva en un all-hands de 3 horas.',
      'usecases.student.title': 'Estudiantes',
      'usecases.student.body': 'Encuentra el momento en que tu profe explicó <em>ese</em> concepto.',
      'usecases.family.title': 'Familias y prosumers',
      'usecases.family.body': 'Años de vídeo en un disco duro. Búscalos como recuerdos, no como ficheros.',

      'local.title': '100% local. Tus vídeos no salen de tu equipo.',
      'local.body': 'Sin subida de tu contenido a la nube. Sin suscripción para leer tu propio archivo. La indexación, transcripción, visión y búsqueda corren en tu hardware.',

      'editions.title': 'Dos ediciones',
      'editions.sub': 'Ambas ediciones comparten la misma experiencia de búsqueda local. Basic cubre palabras habladas y texto en pantalla. Pro añade comprensión visual, una CLI para ingesta por lotes de archivos grandes y streaming multi-cliente en la LAN.',
      'editions.basic.title': 'Basic',
      'editions.basic.tag': 'Para particulares, estudiantes y bibliotecas modestas',
      'editions.basic.f1': 'Búsqueda semántica sobre palabras habladas (transcripción Whisper, en local)',
      'editions.basic.f2': 'Indexación de texto en pantalla — diapositivas, rótulos, carteles, código en una pizarra',
      'editions.basic.f3': 'Ingesta desde la app — suelta una carpeta y mírala indexarse',
      'editions.basic.f4': 'Uso en una sola máquina, UI EN/ES, tema claro y oscuro',
      'editions.basic.bestfor': '<strong>Ideal para:</strong> estudiantes, particulares y familias con una videoteca modesta.',
      'editions.basic.cta_win': 'Windows · .msi',
      'editions.basic.cta_mac': 'macOS ARM · .dmg',
      'editions.pro.title': 'Pro',
      'editions.pro.tag': 'Para academias, empresas, colegios y archivos grandes',
      'editions.pro.f1': 'Todo lo de Basic',
      'editions.pro.f2': 'Búsqueda de contenido visual (Florence-2) — encuentra escenas por lo que se ve en el frame',
      'editions.pro.f3': 'Re-ranking cross-modal — audio + texto en pantalla + visual combinados para resultados más precisos',
      'editions.pro.f4': '<strong>CLI AccuVideoIngest</strong> — herramienta headless por lotes que indexa cientos de ficheros en un solo comando, con logs de progreso y reanudación tras fallos',
      'editions.pro.f5': 'Lotes programados / nocturnos — automatiza la ingesta diaria con el Programador de tareas (Windows) o cron (Linux/macOS); ideal para archivos que crecen',
      'editions.pro.f6': 'Streaming multi-cliente en LAN — sirve a varios espectadores simultáneos desde una misma máquina',
      'editions.pro.bestfor': '<strong>Ideal para:</strong> academias online, formación corporativa, colegios, archivos familiares grandes y cualquier escenario multi-usuario.',
      'editions.pro.cta_win': 'Windows · .msi',
      'editions.pro.cta_mac': 'macOS ARM · .dmg',

      'download.title': 'Descarga AccuVideo',
      'download.body': '30 días de prueba gratuita. Descargas directas para Windows y macOS (Apple Silicon). Builds para macOS Intel y Linux disponibles bajo petición durante el piloto.',
      'download.row_basic': 'Basic',
      'download.row_pro': 'Pro',
      'download.basic_win': 'Windows · .msi',
      'download.basic_mac': 'macOS Apple Silicon · .dmg',
      'download.pro_win': 'Windows · .msi',
      'download.pro_mac': 'macOS Apple Silicon · .dmg',
      'download.subnote_link': 'Ver todos los ficheros del release',
      'download.subnote_suffix': ' — changelog, hashes, versiones anteriores.',
      'download.note': '¿Necesitas un build para macOS Intel, un build para Linux, una licencia enterprise o tienes una duda primero? Escribe a <a href="mailto:info@acornjuice.com?subject=Consulta%20AccuVideo">info@acornjuice.com</a>.',

      'req.title': 'Requisitos del sistema',
      'req.sub': 'AccuVideo Basic corre en portátiles normales. Pro añade ingesta visual (Florence-2), que depende de GPU — sus requisitos son mayores.',
      'req.min.title': 'Basic — audio + texto en pantalla',
      'req.min.cpu': 'CPU: Intel i5 (8.ª gen) / Ryzen 5 2600+ / Apple Silicon M1',
      'req.min.ram': 'RAM: 8 GB',
      'req.min.gpu': 'GPU: integrada (no requiere GPU dedicada)',
      'req.min.disk': 'Disco: SSD con ~50 GB libres',
      'req.min.os': 'SO: Windows 10/11, macOS 12+, Ubuntu 20.04+',
      'req.rec.title': 'Pro — añade ingesta visual',
      'req.rec.cpu': 'CPU: Intel i7 (10.ª gen+) / Ryzen 7+ / Apple Silicon M2+',
      'req.rec.ram': 'RAM: 16 GB (32 GB para batch / multi-cliente)',
      'req.rec.gpu': 'GPU: NVIDIA RTX 3060 12 GB / RTX 4060+ con CUDA (≥6 GB VRAM) — necesaria para indexación visual a velocidad razonable',
      'req.rec.disk': 'Disco: SSD para SO + modelos; HDD o SSD para la videoteca',
      'req.rec.net': 'Red: conexión estable para el DB vectorial gestionado',
      'req.footnote': 'Notas completas de hardware, configuración multi-cliente y benchmarks de ingesta: ver el <a href="https://github.com/Acorn-Juice-Solutions/accuvideo/blob/main/HARDWARE_REQUIREMENTS_ES.md">documento de requisitos</a>.',

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

    const mockQuery = document.getElementById('mock-query');
    if (mockQuery) mockQuery.textContent = dict['mock.query'];

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

  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(detectInitialLang());
    bindToggle();
    setFooterYear();
  });
})();
