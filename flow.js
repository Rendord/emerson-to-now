// Renders flowcharts ([data-flow]) and timelines ([data-timeline]) from window.FLOW.
const NS = 'http://www.w3.org/2000/svg';
const STREAM = { shared: 'Shared roots', bridge: 'Across the Atlantic', america: 'America', europe: 'Europe', global: 'Global', event: 'Historical event', note: 'Note' };
const STRIPE_VAR = { america: '--america', emerson: '--america', conclusion: '--america', callout: '--america', europe: '--europe', global: '--global' };
const stripeBg = k => (k === 'shared' || k === 'bridge') ? 'linear-gradient(var(--europe) 50%, var(--america) 50%)' : `var(${STRIPE_VAR[k] || '--muted'})`;

function svgEl(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}

// ---------- tooltip ----------
const tip = document.getElementById('tip');
function placeTip(evt) {
  let x, y;
  if (evt.type.startsWith('mouse')) { x = evt.clientX + 14; y = evt.clientY + 14; }
  else { const r = evt.currentTarget.getBoundingClientRect(); x = r.left; y = r.bottom + 8; }
  const w = tip.offsetWidth, h = tip.offsetHeight;
  if (x + w > innerWidth - 8) x = innerWidth - w - 8;
  if (y + h > innerHeight - 8) y = Math.max(8, y - h - 28);
  tip.style.left = Math.max(8, x) + 'px';
  tip.style.top = Math.max(8, y) + 'px';
}
function bindTip(div, kind, title, detail, label) {
  div.tabIndex = 0;
  div.setAttribute('aria-label', label);
  const show = e => {
    tip.innerHTML = `<div class="tt"><i style="background:${stripeBg(kind)}"></i>${title}</div><div class="td">${detail}</div>`;
    tip.classList.add('on');
    placeTip(e);
  };
  const hide = () => tip.classList.remove('on');
  div.addEventListener('mouseenter', show);
  div.addEventListener('mousemove', placeTip);
  div.addEventListener('mouseleave', hide);
  div.addEventListener('focus', show);
  div.addEventListener('blur', hide);
}

// ---------- flowchart ----------
function renderFlow(host, chart) {
  const { width: W, height: H } = chart;
  const sizer = document.createElement('div'); sizer.className = 'sizer';
  const stage = document.createElement('div'); stage.className = 'stage';
  stage.style.width = W + 'px'; stage.style.height = H + 'px';
  sizer.appendChild(stage); host.appendChild(sizer);

  const svg = svgEl('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}`, 'aria-hidden': 'true' }, stage);
  const mk = svgEl('marker', { id: `arrow-${chart.id}`, viewBox: '0 0 10 10', refX: 9, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto' }, svgEl('defs', {}, svg));
  svgEl('path', { d: 'M0,1 L9,5 L0,9 z', style: 'fill:var(--edge)' }, mk);

  const b = chart.backdrop || {};
  (b.rects || []).forEach(r => svgEl('rect', { x: r.x, y: r.y, width: r.w, height: r.h, rx: 8, class: r.cls }, svg));
  (b.lines || []).forEach(l => svgEl('line', { x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2, class: l.cls }, svg));
  (b.paths || []).forEach(p => svgEl('path', { d: p.d, class: p.cls }, svg));
  (b.texts || []).forEach(t => { svgEl('text', { x: t.x, y: t.y, class: t.cls }, svg).textContent = t.t; });
  (b.lanes || []).forEach(l => {
    const sx = (l.color || l.shared) ? 20 : 10;
    if (l.color) svgEl('rect', { x: 10, y: l.y - 11, width: 4, height: 14, rx: 2, style: `fill:var(${l.color})` }, svg);
    if (l.shared) {
      svgEl('rect', { x: 10, y: l.y - 11, width: 4, height: 7, style: 'fill:var(--europe)' }, svg);
      svgEl('rect', { x: 10, y: l.y - 4, width: 4, height: 7, style: 'fill:var(--america)' }, svg);
    }
    svgEl('text', { x: sx, y: l.y, class: 'lane-label' }, svg).textContent = l.t;
    let ly = l.y;
    if (l.t2) { ly += 15; svgEl('text', { x: sx, y: ly, class: 'lane-label' }, svg).textContent = l.t2; }
    if (l.s) svgEl('text', { x: sx, y: ly + 16, class: 'lane-sub' }, svg).textContent = l.s;
  });

  const byId = Object.fromEntries(chart.nodes.map(n => [n.id, n]));
  const labels = [];
  for (const e of chart.edges) {
    const g = FLOWGEOM.edgeGeom(byId, e);
    svgEl('path', { d: g.d, class: 'edge' + (e.type ? ' ' + e.type : ''), 'marker-end': `url(#arrow-${chart.id})` }, svg);
    if (e.label) labels.push({ text: e.label, at: e.labelAt || g.mid, anchor: e.anchor || 'middle' });
  }

  for (const n of chart.nodes) {
    const div = document.createElement('div');
    div.className = `node k-${n.kind}` + (n.start ? ' start' : '');
    Object.assign(div.style, { left: n.x + 'px', top: n.y + 'px', width: n.w + 'px', height: n.h + 'px' });
    div.innerHTML = (n.badge ? `<div class="badge">${n.badge}</div>` : '') + `<div class="t">${n.title}</div>` +
      (n.sub ? `<div class="s">${n.sub}</div>` : '') + (n.quote ? `<div class="q">“${n.quote}”</div>` : '');
    bindTip(div, n.kind, n.title, n.detail || '', `${n.title}. ${(n.sub || n.quote || '').replace(/<[^>]+>/g, '')}`);
    stage.appendChild(div);
  }

  // labels sit above boxes and edges
  const top = svgEl('svg', { width: W, height: H, viewBox: `0 0 ${W} ${H}`, 'aria-hidden': 'true', style: 'pointer-events:none' }, stage);
  labels.forEach(l => { svgEl('text', { x: l.at[0], y: l.at[1] + 4, class: 'elabel', 'text-anchor': l.anchor }, top).textContent = l.text; });

  const fit = () => {
    const s = Math.min(1, Math.max(0.6, host.clientWidth / W));
    stage.style.transform = `scale(${s})`;
    sizer.style.width = W * s + 'px';
    sizer.style.height = H * s + 'px';
  };
  fit();
  new ResizeObserver(fit).observe(host);
}

const strip = s => (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
function renderOutline(target, chart) {
  const byId = Object.fromEntries(chart.nodes.map(n => [n.id, n]));
  const nodes = chart.nodes.map(n => `<li><b>${n.title}</b>${STREAM[n.kind] ? ` (${STREAM[n.kind]})` : ''}${n.sub ? ' · ' + n.sub : ''}. ${strip(n.detail)}</li>`).join('');
  const edges = chart.edges.filter(e => byId[e.to]).map(e =>
    `<li>${byId[e.from].title} ${e.type === 'reaction' ? '⇢ (reaction against)' : '→'} ${byId[e.to].title}${e.label ? ' · ' + e.label : ''}</li>`).join('');
  target.innerHTML = `<p><b>Boxes</b></p><ul>${nodes}</ul><p><b>Connections</b></p><ul>${edges}</ul>` +
    (chart.outlineExtra ? `<p>${chart.outlineExtra}</p>` : '');
}

// ---------- timeline ----------
function renderTimeline(host, items) {
  const cards = items.map(a => {
    const d = document.createElement('div');
    d.className = 'tc k-' + a.kind;
    d.setAttribute('role', 'listitem');
    if (STRIPE_VAR[a.kind]) d.style.setProperty('--stripe', `var(${STRIPE_VAR[a.kind]})`);
    d.innerHTML = `<div class="badge">${STREAM[a.kind]}</div><div class="m">${a.title}</div><div class="w">${a.where}</div><div class="k">${a.key}</div>`;
    bindTip(d, a.kind, `${a.title} (${a.year})`, `<p>Truth lives: ${a.where}</p><p>Key word: <b>${a.key}</b></p>`, `${a.year}, ${a.title}: ${a.where} Key word ${a.key}.`);
    return d;
  });
  const ticks = items.map(a => {
    const t = document.createElement('div');
    t.className = 'tick';
    t.setAttribute('aria-hidden', 'true');
    if (STRIPE_VAR[a.kind]) t.style.setProperty('--stripe', `var(${STRIPE_VAR[a.kind]})`);
    t.innerHTML = `<i class="${a.kind === 'shared' ? 'shared' : ''}"></i><span>${a.year}</span>`;
    return t;
  });
  host.append(...cards, ...ticks);
  const out = document.querySelector(`[data-outline="${host.dataset.timeline}"]`);
  if (out) out.innerHTML = '<ul>' + items.map(a => `<li><b>${a.year} · ${a.title}</b> (${STREAM[a.kind]}): ${a.where} Key word: ${a.key}.</li>`).join('') + '</ul>';
}

// ---------- page wiring ----------
document.querySelectorAll('[data-flow]').forEach(host => {
  const chart = FLOW[host.dataset.flow];
  renderFlow(host, chart);
  const out = document.querySelector(`[data-outline="${host.dataset.flow}"]`);
  if (out) renderOutline(out, chart);
});
document.querySelectorAll('[data-timeline]').forEach(host => renderTimeline(host, FLOW[host.dataset.timeline]));

document.getElementById('themeBtn').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
});
if (location.hash === '#dark') document.documentElement.dataset.theme = 'dark';
