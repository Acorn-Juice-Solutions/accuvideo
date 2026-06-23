from pathlib import Path
from rjsmin import jsmin
p = Path('assets/js/main.js')
out = Path('assets/js/main.min.js')
text = p.read_text(encoding='utf-8')
out.write_text(jsmin(text), encoding='utf-8')
print('created', out, 'orig:', p.stat().st_size, 'min:', out.stat().st_size)
