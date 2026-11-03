/** Export public article content, excluding controls and application chrome. */
export function documentMarkdown(root: Element, title: string, url: string): string {
  const copy = root.cloneNode(true) as Element;
  copy.querySelectorAll('script, style, nav, button, input, textarea, select, dialog, iframe, svg, astro-island, [data-llm-tools], [data-llm-exclude], [hidden]').forEach(el => el.remove());
  const absolute = (value: string) => {
    try { const parsed = new URL(value, url); return /^(https?:|mailto:)/.test(parsed.protocol) ? parsed.href : ''; } catch { return ''; }
  };
  const inline = (s: string) => s.replace(/([\\`*_[\]])/g, '\\$1');
  const render = (node: Node): string => {
    if (node.nodeType === 3) return inline((node.textContent || '').replace(/\s+/g, ' '));
    if (!(node instanceof Element)) return '';
    const tag = node.tagName.toLowerCase();
    const children = () => Array.from(node.childNodes).map(render).join('');
    const block = (s: string) => `\n\n${s.trim()}\n\n`;
    if (/^h[1-6]$/.test(tag)) return block(`${'#'.repeat(Number(tag[1]))} ${children()}`);
    if (tag === 'pre') {
      const code = node.textContent || '';
      const fence = '`'.repeat(Math.max(3, ...Array.from(code.matchAll(/`+/g), m => m[0].length + 1)));
      return block(`${fence}\n${code.trimEnd()}\n${fence}`);
    }
    if (tag === 'code') return '`' + (node.textContent || '').replace(/`/g, '\\`') + '`';
    if (tag === 'strong' || tag === 'b') return `**${children()}**`;
    if (tag === 'em' || tag === 'i') return `*${children()}*`;
    if (tag === 'br') return '\n';
    if (tag === 'hr') return block('---');
    if (tag === 'a') { const href = absolute(node.getAttribute('href') || ''); return href ? `[${children().trim()}](${href.replace(/\)/g, '%29')})` : children(); }
    if (tag === 'img') { const src = absolute(node.getAttribute('src') || ''); return src ? `![${inline(node.getAttribute('alt') || '')}](${src})` : ''; }
    if (tag === 'ul' || tag === 'ol') {
      const start = Number(node.getAttribute('start') || 1);
      return block(Array.from(node.children).filter(el => el.tagName === 'LI').map((li, i) => {
        const text = Array.from(li.childNodes).map(render).join('').trim();
        const marker = tag === 'ol' ? `${start + i}. ` : '- ';
        return marker + text.replace(/\n/g, '\n' + ' '.repeat(marker.length));
      }).join('\n'));
    }
    if (tag === 'blockquote') return block(children().trim().split('\n').map(line => `> ${line}`).join('\n'));
    if (tag === 'table') {
      const rows = Array.from(node.querySelectorAll('tr')).map(row => Array.from(row.children).map(cell => Array.from(cell.childNodes).map(render).join('').trim().replace(/\n+/g, '<br>').replace(/\|/g, '\\|')));
      if (!rows.length) return '';
      const width = Math.max(...rows.map(row => row.length));
      const line = (cells: string[]) => '| ' + Array.from({length: width}, (_, i) => cells[i] || '').join(' | ') + ' |';
      return block([line(rows[0]), line(Array(width).fill('---')), ...rows.slice(1).map(line)].join('\n'));
    }
    if (['p', 'div', 'section', 'article', 'details', 'summary'].includes(tag)) return block(children());
    return children();
  };
  const body = render(copy).replace(/\n[ \t]+\n/g, '\n\n').replace(/\n{3,}/g, '\n\n').trim();
  return `${copy.querySelector('h1') ? '' : `# ${title}\n\n`}Source: ${url}\n\n${body}\n`;
}
