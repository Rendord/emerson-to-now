# From Emerson to now

Interactive philosophical flowcharts tracing a line of thought from Ralph Waldo Emerson to the 21st century.

Open `index.html` in a browser; no build step or server needed. Hover or tab to any box for details, and use the toggle for dark mode. Each chart has a text outline underneath.

| Chart | What it shows |
|---|---|
| 1 · Emerson's argument | Why Emerson thought self-reliance and truth were necessary |
| 2 · Emerson in context | Locke, Unitarian Boston, Kant, Coleridge and the road to *Self-Reliance* (1690–1841) |
| 3 · Two streams | How philosophy split into European and American streams from the Enlightenment on |
| 4 · Emerson → Nietzsche → now | Nietzsche's sources, his legacy, and the 21st century (also as `emerson-to-nietzsche.html`) |
| 5 · Where does truth live? | One question answered by each movement, in order |

## Layout

- `data/*.js`: one file per chart: text, positions and connections
- `flow.js`: renderer (boxes as HTML over an SVG layer for arrows)
- `geom.js`: arrow geometry shared by the renderer and the layout check
- `style.css`: palette (light and dark) and components
- `scripts/check-layout.js`: run `node scripts/check-layout.js` after editing a chart to catch overlapping boxes, arrows crossing boxes, misplaced labels and text that won't fit
