// Pure geometry shared by the page and the layout check.
(function (root) {
  function anchors(a, b) {
    const ax = a.x + a.w / 2, bx = b.x + b.w / 2;
    if (b.x >= a.x + a.w - 4) return [[a.x + a.w, a.y + a.h / 2], [b.x, b.y + b.h / 2], 'h'];
    if (b.x + b.w <= a.x + 4) return [[a.x, a.y + a.h / 2], [b.x + b.w, b.y + b.h / 2], 'h'];
    if (b.y >= a.y + a.h) return [[ax, a.y + a.h], [bx, b.y], 'v'];
    return [[ax, a.y], [bx, b.y + b.h], 'v'];
  }

  // Returns { d, mid } for an edge; explicit `path` wins, else a smooth cubic between anchors.
  function edgeGeom(byId, e) {
    if (e.path) return { d: e.path, mid: null };
    const a = byId[e.from];
    let p1, p2, dir;
    if (e.toPoint) { p1 = [a.x + a.w, a.y + a.h / 2]; p2 = e.toPoint.slice(); dir = 'h'; }
    else [p1, p2, dir] = anchors(a, byId[e.to]);
    if (e.fromY != null) p1[1] = e.fromY;
    if (e.toY != null) p2[1] = e.toY;
    const [x1, y1] = p1, [x2, y2] = p2;
    let d;
    if (dir === 'h') {
      const s = Math.sign(x2 - x1) || 1, dx = Math.max(12, Math.abs(x2 - x1) / 2);
      d = `M${x1},${y1} C${x1 + s * dx},${y1} ${x2 - s * dx},${y2} ${x2},${y2}`;
    } else {
      const dy = (y2 - y1) / 2;
      d = `M${x1},${y1} C${x1},${y1 + dy} ${x2},${y2 - dy} ${x2},${y2}`;
    }
    return { d, mid: [(x1 + x2) / 2, (y1 + y2) / 2] };
  }

  // Approximate text extents for 11px system-ui labels.
  function labelBox(text, x, y, anchor) {
    const w = text.length * 6.0 + 6, h = 15;
    const left = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2;
    return { x: left, y: y - h / 2, w, h };
  }

  root.FLOWGEOM = { anchors, edgeGeom, labelBox };
})(typeof window !== 'undefined' ? window : globalThis);
