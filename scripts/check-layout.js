// Usage: node scripts/check-layout.js  — checks every flowchart in data/ for layout problems.
const dir = require('path').resolve(__dirname, '..');
require(dir + '/geom.js');
for (const f of require('fs').readdirSync(dir + '/data')) require(dir + '/data/' + f);
const { edgeGeom, labelBox } = globalThis.FLOWGEOM;
const ov = (a, b, m = 0) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
const inside = (p, r, m = 0) => p[0] > r.x - m && p[0] < r.x + r.w + m && p[1] > r.y - m && p[1] < r.y + r.h + m;
function bez(d) {
  const n = d.match(/-?\d+(\.\d+)?/g).map(Number); const pts = [];
  const [x0, y0, x1, y1, x2, y2, x3, y3] = n;
  for (let t = 0.04; t <= 0.96; t += 0.02) { const u = 1 - t;
    pts.push([u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3, u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3]); }
  return pts;
}
// text fit: chars-per-line estimates for system-ui
function lines(text, px, width) { return Math.max(1, Math.ceil(text.replace(/<[^>]+>/g, '').length * px / width)); }
function estH(n) {
  const iw = n.kind === 'event' ? n.w - 26 : n.w - ((n.kind === 'shared' || n.kind === 'bridge') ? 14 : 15) - 10 - 4;
  let h = n.kind === 'event' ? 10 : 16; const parts = [];
  if (n.badge) parts.push(lines(n.badge, 7.0, iw) * 13.7);
  parts.push(lines(n.title, 7.3, iw) * 16.3);
  if (n.sub) parts.push(lines(n.sub, 6.0, iw) * 15.5);
  if (n.quote) parts.push(lines(n.quote + '““', 5.8, iw) * 15.5);
  return h + parts.reduce((a, b) => a + b, 0) + (parts.length - 1) * 2;
}
let problems = 0;
const bad = m => { problems++; console.log('  ✗ ' + m); };
for (const key of Object.keys(FLOW).filter(k => FLOW[k].nodes)) {
  const c = FLOW[key]; console.log(`chart ${key}`);
  const byId = Object.fromEntries(c.nodes.map(n => [n.id, n]));
  for (const n of c.nodes) {
    if (n.x < 0 || n.y < 0 || n.x + n.w > c.width || n.y + n.h > c.height) bad(`${n.id} outside canvas`);
    const e = estH(n); if (e > n.h) bad(`${n.id} text ~${Math.round(e)}px > box ${n.h}px`);
  }
  c.nodes.forEach((a, i) => c.nodes.slice(i + 1).forEach(b => { if (ov(a, b, 6)) bad(`boxes ${a.id} & ${b.id} overlap/too close`); }));
  const labels = [];
  for (const e of c.edges) {
    if (!byId[e.from] || (e.to && !byId[e.to])) { bad(`edge ${e.from}->${e.to} missing node`); continue; }
    const g = edgeGeom(byId, e);
    for (const n of c.nodes) {
      if (n.id === e.from || n.id === e.to) continue;
      if (bez(g.d).some(p => inside(p, n, 2))) bad(`edge ${e.from}->${e.to || 'bracket'} crosses box ${n.id}`);
    }
    if (e.label) {
      const at = e.labelAt || g.mid; const lb = labelBox(e.label, at[0], at[1], e.anchor);
      lb.id = `${e.from}->${e.to}`; labels.push(lb);
      for (const n of c.nodes) if (ov(lb, n)) bad(`label "${e.label}" overlaps box ${n.id}`);
      if (lb.x < 0 || lb.x + lb.w > c.width) bad(`label "${e.label}" outside canvas`);
    }
  }
  labels.forEach((a, i) => labels.slice(i + 1).forEach(b => { if (ov(a, b)) bad(`labels ${a.id} & ${b.id} overlap`); }));
  // labels vs backdrop texts
  for (const t of (c.backdrop?.texts || [])) {
    const tb = labelBox(t.t, t.x, t.y - 4, t.cls === 'col-head' ? 'middle' : 'start');
    for (const n of c.nodes) if (ov(tb, n)) bad(`backdrop text "${t.t}" overlaps box ${n.id}`);
  }
}
console.log(problems ? `${problems} problem(s)` : "no layout problems found");
process.exitCode = problems ? 1 : 0;
