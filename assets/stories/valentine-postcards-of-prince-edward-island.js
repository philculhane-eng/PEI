(() => {
  const root = document.querySelector('#dna-publisher-whole');
  if (!root) return;
  const albums = [...root.querySelectorAll(':scope > details[id^="dna-publisher-album-"], :scope > #dna-valentine-reference-list')];
  const entries = [...root.querySelectorAll('figure[id^="dna-valentine-entry-"]')];
  const normalize = s => s.normalize('NFKD').toLowerCase().replace(/(\d)[, ](?=\d)/g, '$1').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const indexed = entries.map(node => ({node, text: normalize(node.textContent)}));
  const tools = document.createElement('div');
  tools.id = 'dna-publisher-tools';
  const field = document.createElement('div');
  field.id = 'dna-valentine-search-field';
  const label = document.createElement('label');
  label.htmlFor = 'dna-valentine-search';
  label.textContent = 'Find a view or number';
  const input = document.createElement('input');
  input.id = label.htmlFor;
  input.type = 'search';
  input.placeholder = 'A subject, caption or postcard number…';
  input.autocomplete = 'off';
  field.append(label, input);
  tools.append(field);
  for (const [name, open] of [['Open all albums', true], ['Close all albums', false]]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.addEventListener('click', () => albums.filter(a => !a.hidden).forEach(a => a.open = open));
    tools.append(button);
  }
  const status = document.createElement('p');
  status.id = 'dna-valentine-search-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  tools.append(status);
  root.querySelector('#dna-publisher-summary').after(tools);
  let savedOpen = null;
  function filter() {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    if (terms.length && !savedOpen) savedOpen = albums.map(a => a.open);
    let count = 0;
    for (const {node, text} of indexed) {
      node.hidden = !terms.every(term => text.includes(term));
      if (!node.hidden) count++;
    }
    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];
      album.hidden = ![...album.querySelectorAll('figure[id^="dna-valentine-entry-"]')].some(f => !f.hidden);
      if (terms.length) album.open = !album.hidden;
      else if (savedOpen) album.open = savedOpen[i];
    }
    status.textContent = terms.length ? `${count} ${count === 1 ? 'entry' : 'entries'} found` : '';
    if (!terms.length) savedOpen = null;
  }
  input.addEventListener('input', filter);
  input.addEventListener('keydown', event => { if (event.key === 'Escape') { input.value = ''; filter(); } });
  function jump() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const element = id && document.getElementById(id);
    if (!element || !root.contains(element)) return;
    if (input.value) { input.value = ''; filter(); }
    let parent = element;
    while (parent && parent !== root) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; }
    element.scrollIntoView({block: 'start'});
  }
  if (location.hash) jump();
  addEventListener('hashchange', jump);
})();
