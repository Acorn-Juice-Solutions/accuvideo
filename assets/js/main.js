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
      'usecases.family.title': 'Families & prosumers',
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
      'editions.pro.bestfor': '<strong>Best for:</strong> online academies, corporate training, schools, large family archives and any multi-user setup.',
      'editions.pro.cta_win': 'Windows · .msi',
      'editions.pro.cta_mac': 'macOS · Coming soon',

      'pricing.title': 'Plans &amp; pricing',
      'pricing.sub': 'Pick the size that matches your library. Need something bigger? Talk to us.',
      'pricing.period': '/mo',
      'pricing.badge.popular': 'Most popular',
      'pricing.cta_trial': 'Request trial license',
      'pricing.trial.mailto': 'mailto:info@acornjuice.com?subject=AccuVideo%20trial%20license%20request&body=Hi%2C%0A%0AI%27d%20like%20to%20request%20a%2030-day%20AccuVideo%20trial%20license.%0A%0A-%20Plan%3A%20%5Bstarter%20%2F%20personal%20%2F%20freelance%20%2F%20academy%20%2F%20academy%20plus%20%2F%20enterprise%5D%0A-%20Operating%20system%3A%20%5Bwindows%2011%20%2F%20windows%2010%20%2F%20macos%5D%0A-%20Hardware%20ID%3A%20%5Bpaste%20here%20%E2%80%94%20you%27ll%20see%20it%20on%20first%20launch%20of%20AccuVideo%5D%0A%0AThanks%21',
      'pricing.basic.group': 'Basic — for individuals, students and families',
      'pricing.basic.starter.name': 'Starter',
      'pricing.basic.starter.price': '4.99',
      'pricing.basic.starter.cap': 'Up to 50 h of video',
      'pricing.basic.personal.name': 'Personal',
      'pricing.basic.personal.price': '9.99',
      'pricing.basic.personal.cap': 'Up to 200 h of video',
      'pricing.basic.freelance.name': 'Freelance',
      'pricing.basic.freelance.price': '14.99',
      'pricing.basic.freelance.cap': 'Up to 500 h of video',
      'pricing.basic.feat1': 'Audio + on-screen text search',
      'pricing.basic.feat2': '1 user · 1 machine',
      'pricing.basic.feat3': 'EN / ES interface',
      'pricing.pro.group': 'Pro — for academies, businesses and schools',
      'pricing.pro.academy.name': 'Academy',
      'pricing.pro.academy.price': '29',
      'pricing.pro.academy.cap': 'Up to 500 h · 5 concurrent viewers',
      'pricing.pro.academyplus.name': 'Academy Plus',
      'pricing.pro.academyplus.price': '79',
      'pricing.pro.academyplus.cap': 'Up to 2 000 h · 15 concurrent viewers',
      'pricing.pro.enterprise.name': 'Enterprise',
      'pricing.pro.enterprise.price': '199',
      'pricing.pro.enterprise.cap': 'Up to 10 000 h · 50 concurrent viewers',
      'pricing.pro.feat1': 'Everything in Basic + visual search',
      'pricing.pro.feat2': 'AccuVideoIngest CLI · scheduled batches',
      'pricing.pro.feat3': 'Multi-client LAN streaming',
      'pricing.consult.title': 'Need a bigger setup?',
      'pricing.consult.body': 'Bigger libraries, more concurrent viewers, multi-site deployments or custom integrations — we tailor for it.',
      'pricing.consult.cta': 'Talk to Acorn Juice Solutions',
      'pricing.footnote': 'All plans include the 30-day free trial. Prices in EUR, VAT not included. Annual billing available — contact us for a quote.',
      'pricing.license.title': 'How to get your trial license',
      'pricing.license.step1': 'Download the AccuVideo installer for your edition (Basic or Pro) from the <a href="#download">Download</a> section below.',
      'pricing.license.step2': 'Run the installer. On first launch, AccuVideo shows your <strong>hardware ID</strong> on the activation screen — copy it.',
      'pricing.license.step3': 'Email <a href="mailto:info@acornjuice.com">info@acornjuice.com</a> with three things: your <strong>hardware ID</strong>, your <strong>operating system</strong> (Windows 10 / 11, macOS…) and the <strong>plan</strong> you want to try. We send back your 30-day trial license — paste it into AccuVideo and you\'re in.',
      'pricing.license.notes': 'Each license is bound to that hardware ID — one indexer / server per seat. Switching computers or reinstalling the OS? Email us with the new hardware ID and we re-issue, no questions. Pro plans include LAN viewers (5 / 15 / 50); viewers connect to your server and <strong>don\'t consume their own license</strong>.',

      'download.title': 'Download AccuVideo',
      'download.body': 'Windows builds available now. macOS (Apple Silicon) coming soon. Intel macOS builds available on request during the pilot.',
      'download.trial_note': '📧 First time? <a href="#pricing">Request your trial license first</a> — the installer asks for a license tied to your hardware ID to activate.',
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
      'usecases.family.title': 'Familias y prosumers',
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
      'editions.pro.f6': 'Streaming multi-cliente en LAN — sirve a varios espectadores simultáneos desde una misma máquina',
      'editions.pro.bestfor': '<strong>Ideal para:</strong> academias online, formación corporativa, colegios, archivos familiares grandes y cualquier escenario multi-usuario.',
      'editions.pro.cta_win': 'Windows · .msi',
      'editions.pro.cta_mac': 'macOS · Próximamente',

      'pricing.title': 'Planes y precios',
      'pricing.sub': 'Elige el tamaño que se ajuste a tu videoteca. ¿Necesitas algo más grande? Hablamos.',
      'pricing.period': '/mes',
      'pricing.badge.popular': 'Más popular',
      'pricing.cta_trial': 'Solicitar licencia trial',
      'pricing.trial.mailto': 'mailto:info@acornjuice.com?subject=Solicitud%20licencia%20trial%20AccuVideo&body=Hola%2C%0A%0AQuer%C3%ADa%20solicitar%20una%20licencia%20trial%20de%2030%20d%C3%ADas%20para%20AccuVideo.%0A%0A-%20Plan%3A%20%5Bstarter%20%2F%20personal%20%2F%20freelance%20%2F%20academy%20%2F%20academy%20plus%20%2F%20enterprise%5D%0A-%20Sistema%20operativo%3A%20%5Bwindows%2011%20%2F%20windows%2010%20%2F%20macos%5D%0A-%20Hardware%20ID%3A%20%5Bpega%20aqu%C3%AD%20%E2%80%94%20lo%20ver%C3%A1s%20en%20el%20primer%20arranque%20de%20AccuVideo%5D%0A%0A%C2%A1Gracias%21',
      'pricing.basic.group': 'Basic — para particulares, estudiantes y familias',
      'pricing.basic.starter.name': 'Starter',
      'pricing.basic.starter.price': '4,99',
      'pricing.basic.starter.cap': 'Hasta 50 h de vídeo',
      'pricing.basic.personal.name': 'Personal',
      'pricing.basic.personal.price': '9,99',
      'pricing.basic.personal.cap': 'Hasta 200 h de vídeo',
      'pricing.basic.freelance.name': 'Freelance',
      'pricing.basic.freelance.price': '14,99',
      'pricing.basic.freelance.cap': 'Hasta 500 h de vídeo',
      'pricing.basic.feat1': 'Búsqueda en audio + texto en pantalla',
      'pricing.basic.feat2': '1 usuario · 1 máquina',
      'pricing.basic.feat3': 'Interfaz EN / ES',
      'pricing.pro.group': 'Pro — para academias, empresas y colegios',
      'pricing.pro.academy.name': 'Academy',
      'pricing.pro.academy.price': '29',
      'pricing.pro.academy.cap': 'Hasta 500 h · 5 espectadores simultáneos',
      'pricing.pro.academyplus.name': 'Academy Plus',
      'pricing.pro.academyplus.price': '79',
      'pricing.pro.academyplus.cap': 'Hasta 2 000 h · 15 espectadores simultáneos',
      'pricing.pro.enterprise.name': 'Enterprise',
      'pricing.pro.enterprise.price': '199',
      'pricing.pro.enterprise.cap': 'Hasta 10 000 h · 50 espectadores simultáneos',
      'pricing.pro.feat1': 'Todo lo de Basic + búsqueda visual',
      'pricing.pro.feat2': 'CLI AccuVideoIngest · lotes programados',
      'pricing.pro.feat3': 'Streaming multi-cliente en LAN',
      'pricing.consult.title': '¿Necesitas algo más grande?',
      'pricing.consult.body': 'Bibliotecas más grandes, más espectadores simultáneos, despliegues multi-sede o integraciones a medida — lo adaptamos a ti.',
      'pricing.consult.cta': 'Consultar con Acorn Juice Solutions',
      'pricing.footnote': 'Todos los planes incluyen los 30 días de prueba gratuita. Precios en EUR, IVA no incluido. Facturación anual disponible — escríbenos para presupuesto.',
      'pricing.license.title': 'Cómo conseguir tu licencia trial',
      'pricing.license.step1': 'Descarga el instalador de AccuVideo para tu edición (Basic o Pro) desde la sección <a href="#download">Descarga</a> de abajo.',
      'pricing.license.step2': 'Ejecuta el instalador. En el primer arranque, AccuVideo te muestra tu <strong>hardware ID</strong> en la pantalla de activación — cópialo.',
      'pricing.license.step3': 'Escríbenos a <a href="mailto:info@acornjuice.com">info@acornjuice.com</a> con tres cosas: tu <strong>hardware ID</strong>, tu <strong>sistema operativo</strong> (Windows 10 / 11, macOS…) y el <strong>plan</strong> que quieres probar. Te enviamos tu licencia trial de 30 días — la pegas en AccuVideo y listo.',
      'pricing.license.notes': 'Cada licencia está vinculada a ese hardware ID — un indexador / servidor por seat. ¿Cambias de equipo o reinstalas el SO? Escríbenos con el nuevo hardware ID y la re-emitimos sin preguntas. Los planes Pro incluyen espectadores en LAN (5 / 15 / 50); los espectadores se conectan a tu servidor y <strong>no consumen licencia propia</strong>.',

      'download.title': 'Descarga AccuVideo',
      'download.body': 'Builds para Windows disponibles ya. macOS (Apple Silicon) próximamente. Builds para macOS Intel disponibles bajo petición durante el piloto.',
      'download.trial_note': '📧 ¿Primera vez? <a href="#pricing">Solicita primero tu licencia trial</a> — el instalador pide una licencia ligada a tu hardware ID para activarse.',
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
