// Chart data: coordinates are in the chart's design space (px).
(function (root) {
  const FLOW = root.FLOW = root.FLOW || {};
  // ---------- chart 1: Emerson in historical context, 1690–1841 ----------
  // Era columns start at x 140, 220 wide; boxes sit 20px in, 180 wide (40px gutters).
  const X = i => 160 + 220 * i;
  const context = {
    id: 'context', width: 1700, height: 750,
    backdrop: {
      rects: [
        { x: 140, y: 50, w: 1540, h: 180, cls: 'lane-bg' },
        { x: 140, y: 240, w: 1540, h: 92, cls: 'bridge-bg' },
        { x: 140, y: 342, w: 1540, h: 180, cls: 'lane-bg' },
        { x: 140, y: 532, w: 1540, h: 196, cls: 'lane-bg' },
      ],
      lines: [1, 2, 3, 4, 5, 6].map(i => ({ x1: 140 + 220 * i, y1: 50, x2: 140 + 220 * i, y2: 728, cls: 'col-rule' })),
      texts: ['1690–1775', '1776–1799', 'c. 1800–1828', '1825–1832', '1833–1836', '1836–1838', '1839–1841']
        .map((t, i) => ({ x: 250 + 220 * i, y: 34, t, cls: 'col-head' })),
      lanes: [
        { y: 134, t: 'Europe', s: 'arguing with Locke', color: '--europe' },
        { y: 282, t: 'Across the', t2: 'Atlantic', s: 'books & travel', shared: true },
        { y: 426, t: 'New England', s: 'living by Locke', color: '--america' },
        { y: 624, t: 'Emerson', s: 'his own path', color: '--america' },
      ],
    },
    nodes: [
      { id: 'locke', kind: 'europe', x: X(0), y: 70, w: 180, h: 130, title: 'John Locke', sub: '<em>Essay</em> (1690): the mind is a blank slate · <em>Two Treatises</em>: liberty & property',
        detail: '<p>All knowledge comes in through the senses; there are no inborn ideas about God or morality.</p><p>His political writing on liberty, property and consent becomes the backbone of the American founding.</p>' },
      { id: 'kant', kind: 'europe', x: X(1), y: 62, w: 180, h: 80, title: 'Kant', sub: '<em>Critique of Pure Reason</em> (1781)',
        detail: '<p>An Enlightenment thinker saving the Enlightenment from itself. Hume had pushed Locke’s empiricism to doubt even cause and effect; Kant said Hume woke him from his “dogmatic slumber”.</p><p>His “Copernican revolution”: the mind is not a blank slate but has built-in forms (space, time, cause) that shape all experience, like tinted glasses. Knowledge of these forms is “transcendental”, the word Emerson’s movement later took its name from.</p><p>Science works within those limits; God, the soul and free will lie beyond them, which left room for the Romantics.</p>' },
      { id: 'fr', kind: 'event', x: X(1), y: 154, w: 180, h: 64, title: 'French Revolution & Terror', sub: '1789–94',
        detail: '<p>Reason turned violent; alongside the soot of the Industrial Revolution, it left many Europeans distrusting the cold, mechanical worldview.</p>' },
      { id: 'rom', kind: 'europe', x: X(2), y: 70, w: 180, h: 130, title: 'British Romanticism', sub: 'Wordsworth & Coleridge, <em>Lyrical Ballads</em> (1798): living nature against the machine',
        detail: '<p>Coleridge studied in Göttingen (1798–99) and brought Kant and Schelling back into English.</p><p>The universe is organic and alive with the divine, not a clockwork.</p>' },
      { id: 'aids', kind: 'europe', x: X(3), y: 70, w: 180, h: 130, badge: 'Key text', title: 'Coleridge, <em>Aids to Reflection</em>', sub: '1825 · <b>Reason</b> (intuition) vs <b>Understanding</b> (logic)',
        detail: '<p><b>Understanding</b>: the lower faculty of logic, science and sense data, Locke’s territory.</p><p><b>Reason</b>: the higher faculty that grasps divine truth directly. This is what Emerson means by trusting yourself.</p><p>Also: a free, supernatural will, and nature as a living symbol of spirit. Coleridge wrote it to <em>defend</em> orthodox Christianity; the Transcendentalists took the method and dropped the orthodoxy.</p>' },
      { id: 'carl', kind: 'europe', x: X(4), y: 70, w: 180, h: 110, title: 'Thomas Carlyle', sub: '<em>Sartor Resartus</em> (1833–34)',
        detail: '<p>Scottish essayist steeped in German Romanticism. He became Emerson’s lifelong friend; Emerson arranged the first book edition of <em>Sartor Resartus</em> in America (1836).</p>' },
      { id: 'note', kind: 'note', x: X(5), y: 70, w: 400, h: 130, badge: 'Had Europe forgotten Locke?', title: 'Not forgotten, but contested', sub: 'British empiricism lived on (J.S. Mill), but Kant and the Romantics had moved the debate on. Boston still treated Locke as settled truth: that gap is what Emerson felt.',
        detail: '<p>Unitarianism itself was marginal in Europe: a small dissenting group in Britain (Joseph Priestley; denying the Trinity was illegal there until 1813) and old rural churches in Transylvania and Poland. Only in New England did it run the universities.</p>' },

      { id: 'marsh', kind: 'bridge', x: X(3), y: 245, w: 180, h: 84, title: 'Marsh’s American edition', sub: '1829 · framed as the answer to Locke',
        detail: '<p>James Marsh (later president of the University of Vermont) published <em>Aids to Reflection</em> in America with a long “Preliminary Essay” presenting Coleridge as the cure for Locke’s philosophy, which dominated Harvard.</p><p>Marsh meant it to renew orthodox faith. The young Transcendentalists read it as a licence for intuition.</p>' },
      { id: 'trip', kind: 'bridge', x: X(4), y: 245, w: 180, h: 84, title: 'Emerson’s trip to Europe', sub: '1833 · meets Coleridge, Wordsworth, Carlyle',
        detail: '<p>At Highgate the elderly Coleridge mostly lectured him, including a tirade against Unitarianism, unaware or uncaring that Emerson had just left its ministry.</p><p>The lesson Emerson took home: his idols were human, and America need not borrow its authority from Europe.</p>' },

      { id: 'pur', kind: 'america', x: X(0), y: 446, w: 180, h: 72, title: 'Puritan New England', sub: 'Calvinism · Jonathan Edwards reads Locke',
        detail: '<p>The colonies’ first intellectual life: imported English Calvinism. Jonathan Edwards (1703–58) combined it with Locke and Newton.</p>' },
      { id: 'decl', kind: 'america', x: X(1), y: 348, w: 180, h: 86, title: 'Founders & the Declaration', sub: '1776 · Jefferson builds on Locke',
        detail: '<p>Locke’s liberty, property and social contract run through the Declaration of Independence. In America Locke is not just a philosopher but a national hero, so his theory of knowledge rides along with his politics.</p>' },
      { id: 'uni', kind: 'america', x: X(2), y: 352, w: 180, h: 160, badge: 'The “Locke party”', title: 'Unitarian Boston', sub: 'c. 1805–1840 · Harvard, Channing, Andrews Norton',
        detail: '<p>Harvard turns Unitarian with Henry Ware’s appointment (1805); Channing’s sermon “Unitarian Christianity” (1819) makes it a movement.</p><p>Faith by evidence: Christianity is proven by Jesus’ miracles, studied like history. God is known second-hand, from the past.</p><p>The religion of merchants, professors and judges, who looked down on the emotional revivals of the Second Great Awakening.</p>' },
      { id: 'club', kind: 'america', x: X(5), y: 362, w: 180, h: 110, title: 'Transcendental Club', sub: '1836–40 · Alcott, Fuller, Ripley, Hedge, Thoreau',
        detail: '<p>An informal circle of mostly young Unitarian ministers in revolt. Bronson Alcott’s Temple School (1834) tried to draw inborn, intuitive knowledge out of children, a Coleridgean idea put into practice.</p>' },
      { id: 'dial', kind: 'america', x: X(6), y: 362, w: 180, h: 110, title: 'The movement spreads', sub: 'Fuller edits <em>The Dial</em> (1840) · Brook Farm (1841) · Thoreau',
        detail: '<p>A journal, a utopian community, and soon Thoreau at Walden (1845) and Fuller’s <em>Woman in the Nineteenth Century</em> (1845).</p>' },

      { id: 'min', kind: 'america', x: X(3), y: 548, w: 180, h: 150, title: 'Emerson the Unitarian minister', sub: 'Ordained 1829 · his wife Ellen dies 1831 · resigns 1832',
        detail: '<p>Son of a Unitarian minister, trained at Harvard. He reads <em>Aids to Reflection</em> the year Marsh publishes it.</p><p>He resigns over the Lord’s Supper, which he can no longer administer with conviction: an early act of refusing the false front.</p>' },
      { id: 'nat', kind: 'america', x: X(4), y: 548, w: 180, h: 150, title: '<em>Nature</em>', sub: '1836 · “an original relation to the universe”', quote: 'I become a transparent eye-ball',
        detail: '<p>“Why should not we also enjoy an original relation to the universe?” Nature as a living symbol of spirit, straight from Coleridge’s toolkit.</p>' },
      { id: 'as', kind: 'america', x: X(5), y: 538, w: 180, h: 86, title: '<em>The American Scholar</em>', sub: '1837 · the “intellectual Declaration of Independence”',
        detail: '<p>“We have listened too long to the courtly muses of Europe.” He contrasts “Man Thinking” with the bookworm, a “parrot of other men’s thinking”.</p><p>Oliver Wendell Holmes Sr. gave it the “Declaration” nickname.</p>' },
      { id: 'dsa', kind: 'america', x: X(5), y: 640, w: 180, h: 84, title: 'Divinity School Address', sub: '1838 · Harvard shuts the door',
        detail: '<p>He tells Harvard’s divinity graduates to stop preaching a historical Jesus and find the divine in themselves.</p><p>Andrews Norton answers with “The Latest Form of Infidelity” (1839). Emerson is not invited back to Harvard for decades.</p>' },
      { id: 'sr', kind: 'conclusion', x: X(6), y: 548, w: 180, h: 150, title: '<em>Self-Reliance</em> & <em>The Over-Soul</em>', sub: '1841', quote: 'Trust thyself: every heart vibrates to that iron string.',
        detail: '<p>Coleridge’s “Reason”, renamed intuition: trusting yourself means trusting the divine in you, the larger self, not the ego.</p>' },
    ],
    edges: [
      { from: 'locke', to: 'kant', type: 'reaction', fromY: 102, toY: 102 },
      { from: 'locke', to: 'decl', path: 'M340,170 C361,170 359,390 380,390', label: 'liberty & property', labelAt: [366, 286], anchor: 'start' },
      { from: 'locke', to: 'pur', label: 'Edwards reads Locke', labelAt: [250, 286] },
      { from: 'pur', to: 'uni', fromY: 482, toY: 482, label: 'churches turn Unitarian', labelAt: [470, 482] },
      { from: 'decl', to: 'uni', fromY: 390, toY: 390 },
      { from: 'kant', to: 'rom', fromY: 102, toY: 110 },
      { from: 'fr', to: 'rom', fromY: 186, toY: 170 },
      { from: 'rom', to: 'aids' },
      { from: 'aids', to: 'marsh' },
      { from: 'marsh', to: 'min', label: 'Emerson reads it (1829)', labelAt: [910, 436] },
      { from: 'uni', to: 'min', fromY: 470, toY: 600, label: 'his church', labelAt: [800, 520] },
      { from: 'min', to: 'trip', path: 'M1000,580 C1021,580 1019,286 1040,286', label: 'sails 1833', labelAt: [1026, 420], anchor: 'start' },
      { from: 'carl', to: 'trip' },
      { from: 'trip', to: 'nat' },
      { from: 'nat', to: 'club', fromY: 566, toY: 417 },
      { from: 'nat', to: 'as', fromY: 600, toY: 581 },
      { from: 'as', to: 'dsa' },
      { from: 'dsa', to: 'sr', fromY: 682, toY: 655 },
      { from: 'club', to: 'dial' },
    ],
    outlineExtra: 'Read left to right: New England keeps Locke as settled truth while Europe moves past him. Coleridge’s Aids to Reflection crosses the Atlantic in 1829, Emerson leaves the Unitarian ministry, meets his European idols in 1833, and comes home to write the works that founded Transcendentalism.',
  };
  FLOW.context = context;
})(typeof window !== 'undefined' ? window : globalThis);
