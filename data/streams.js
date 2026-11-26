// Chart data: coordinates are in the chart's design space (px).
(function (root) {
  const FLOW = root.FLOW = root.FLOW || {};
  // ---------- chart 2: from the Enlightenment, two streams ----------
  const cx = i => 370 + 200 * i;
  const GX = 1410;
  const streams = {
    id: 'streams', width: 1610, height: 600,
    backdrop: {
      rects: [
        { x: 130, y: 50, w: 220, h: 510, cls: 'shared-bg' },
        { x: 360, y: 50, w: 1000, h: 220, cls: 'lane-bg' },
        { x: 360, y: 360, w: 1000, h: 200, cls: 'lane-bg' },
        { x: 1390, y: 50, w: 215, h: 510, cls: 'global-bg' },
      ],
      lines: [
        ...[1, 2, 3, 4].map(i => ({ x1: 360 + 200 * i, y1: 50, x2: 360 + 200 * i, y2: 560, cls: 'col-rule' })),
        { x1: 355, y1: 44, x2: 355, y2: 568, cls: 'split-rule' },
      ],
      paths: [{ d: 'M1396,130 L1390,130 L1390,400 L1396,400', cls: 'edge' }],
      texts: [
        { x: 240, y: 34, t: '1620–1780 · one tradition', cls: 'col-head' },
        ...['1780–1830', '1830–1860', '1860–1914', '1914–1960', '1960–2000'].map((t, i) => ({ x: 460 + 200 * i, y: 34, t, cls: 'col-head' })),
        { x: 1498, y: 34, t: '2000–now · streams converge', cls: 'col-head' },
        { x: 361, y: 588, t: '◀ the split: Europe moves past Locke (Kant, 1781) while New England keeps him', cls: 'split-label' },
      ],
      lanes: [
        { y: 150, t: 'Europe', s: 'crisis & meaning', color: '--europe' },
        { y: 312, t: 'Events', s: 'history as trigger' },
        { y: 450, t: 'America', s: 'action & practice', color: '--america' },
      ],
    },
    nodes: [
      { id: 'enl', kind: 'shared', x: 150, y: 70, w: 180, h: 105, title: 'The Enlightenment', sub: 'c. 1680–1780 · Locke, Newton, Hutcheson, Reid',
        detail: '<p>Read on both sides of the Atlantic. The world as a clockwork you can take apart with reason; Locke: the mind starts as a blank slate filled by the senses.</p>' },
      { id: 'fou', kind: 'shared', x: 150, y: 225, w: 180, h: 120, badge: 'Political split · 1776', title: 'Founding Fathers & the Declaration', sub: 'Jefferson, Franklin, Madison, Paine',
        detail: '<p>Enlightenment men through and through: Franklin the experimenter, Jefferson drawing on Locke, Paine arguing from natural reason.</p><p>A political break with England, argued with English and Scottish ideas, and the reason Locke became a national hero in America.</p>' },
      { id: 'pur', kind: 'shared', x: 150, y: 410, w: 180, h: 100, title: 'Puritanism', sub: '1620s–1700s · Calvinism from England; Jonathan Edwards',
        detail: '<p>Imported English Protestantism. New England’s Unitarians later grew out of these same Congregational churches.</p>' },

      { id: 'kant', kind: 'europe', x: cx(0), y: 110, w: 180, h: 90, title: 'Kant & German idealism', sub: '1781–1830s · Kant, Fichte, Schelling, Hegel',
        detail: '<p>Kant (<em>Critique of Pure Reason</em>, 1781) rebels against the Enlightenment from inside it: woken by Hume’s scepticism, he argues the mind is not a blank slate but shapes experience with built-in forms. Europe starts arguing past Locke.</p><p>Unintentionally he opens the door to Romanticism: if the mind shapes the world, humans are creative, not machines.</p>' },
      { id: 'rom', kind: 'europe', x: cx(1), y: 110, w: 180, h: 90, title: 'Romanticism', sub: 'c. 1780–1850 · Goethe, Wordsworth, Coleridge',
        detail: '<p>Emotion, living nature and the individual, against the Enlightenment’s machine. Coleridge’s <em>Aids to Reflection</em> (1825) splits the mind into Reason (intuition) and Understanding (logic).</p>' },
      { id: 'nie', kind: 'europe', x: cx(2), y: 110, w: 180, h: 90, title: 'Nietzsche', sub: '1844–1900 · “God is dead” (1882)',
        detail: '<p>Read Emerson from his teens and kept admiring him; the first edition of <em>The Gay Science</em> (1882) opens with an Emerson quote. Ideas now cross the ocean the other way.</p>' },
      { id: 'exi', kind: 'europe', x: cx(3), y: 60, w: 180, h: 82, title: 'Existentialism', sub: 'roots: Kierkegaard 1840s · peak: Sartre, de Beauvoir 1940s',
        detail: '<p>Sartre, <em>Being and Nothingness</em> (1943): existence precedes essence, so you are what you make of yourself.</p>' },
      { id: 'abs', kind: 'europe', x: cx(3), y: 172, w: 180, h: 80, title: 'Absurdism', sub: 'Camus · 1942 · a branch alongside Sartre',
        detail: '<p>We crave meaning; the universe stays silent. Revolt and live fully anyway. <em>The Myth of Sisyphus</em> (1942) came a year before Sartre’s main work, and Camus rejected the existentialist label.</p>' },
      { id: 'pom', kind: 'europe', x: cx(4), y: 110, w: 180, h: 90, title: 'Postmodernism', sub: 'c. 1960–2000 · Foucault, Derrida, Lyotard',
        detail: '<p>No single grand truth. Language, culture and power shape what counts as true. Foucault drew heavily on Nietzsche.</p>' },

      { id: 'cw', kind: 'event', x: cx(2), y: 284, w: 180, h: 64, title: 'American Civil War', sub: '1861–65, then industrial boom',
        detail: '<p>Over 600,000 dead punctured the optimism about humanity’s divine goodness; the growth that followed rewarded what works. It also produced literary Realism (Twain, later Crane).</p>' },
      { id: 'ww', kind: 'event', x: cx(3), y: 284, w: 180, h: 64, title: 'World Wars & Holocaust', sub: '1914–18 · 1939–45',
        detail: '<p>Europe destroyed twice in thirty years. Philosophy turned to anxiety, the absence of God, and meaning in the ruins.</p>' },

      { id: 'uni', kind: 'america', x: cx(0), y: 400, w: 180, h: 90, badge: 'The “Locke party”', title: 'Unitarian Boston', sub: 'c. 1805–1840 · Harvard elite',
        detail: '<p>While Europe moved on, Boston’s elite built its religion on Locke: faith proven by miracles and historical evidence, no direct revelation. Nowhere else did Unitarianism run the universities.</p>' },
      { id: 'tra', kind: 'america', start: true, x: cx(1), y: 390, w: 180, h: 112, badge: 'Intellectual split · 1837', title: 'Transcendentalism', sub: '1836–1860 · Emerson, Thoreau, Fuller',
        detail: '<p>Emerson uses European Romanticism, via Coleridge, to break New England free of Locke, and then tells America to stop borrowing from Europe (<em>The American Scholar</em>, 1837).</p><p>Keeps the founders’ ideals of freedom and the individual but drops Locke’s theory of mind.</p>' },
      { id: 'pra', kind: 'america', x: cx(2), y: 400, w: 180, h: 100, title: 'Pragmatism', sub: '1870s Metaphysical Club, Cambridge MA · Peirce, James',
        detail: '<p>Peirce: an idea’s meaning is its practical effects. William James (<em>Pragmatism</em>, 1907): truth is what works. Emerson was a friend of the James family.</p>' },
      { id: 'dew', kind: 'america', x: cx(3), y: 400, w: 180, h: 90, title: 'Dewey', sub: 'c. 1900–1950 · learning by doing, democracy',
        detail: '<p>Pragmatism carried into education and politics. <em>Democracy and Education</em> (1916).</p>' },
      { id: 'neo', kind: 'america', x: cx(4), y: 400, w: 180, h: 90, title: 'Neo-pragmatism', sub: 'Rorty · 1979 onward',
        detail: '<p>Rorty, <em>Philosophy and the Mirror of Nature</em> (1979): stop looking for an objective mirror of reality; philosophy is an ongoing conversation for a fairer democracy.</p>' },

      { id: 'ai', kind: 'event', x: GX, y: 56, w: 180, h: 66, title: 'AI, climate, data', sub: 'problems no culture owns alone',
        detail: '<p>Global problems pull the traditions together: European critique to analyse the system, American pragmatism to look for working solutions.</p>' },
      { id: 'tech', kind: 'global', x: GX, y: 134, w: 180, h: 80, title: 'Philosophy of technology', sub: 'Bostrom, Yuk Hui',
        detail: '<p>Bostrom (<em>Superintelligence</em>, 2014): existential risk from AI. Yuk Hui: “cosmotechnics”, technology rooted in each culture’s own traditions.</p>' },
      { id: 'post', kind: 'global', x: GX, y: 224, w: 180, h: 82, title: 'Posthumanism & speculative realism', sub: 'Haraway, Braidotti, Morton',
        detail: '<p>Take humans off the throne: the lines between human, animal and machine blur. Morton’s “hyperobjects” (2013), like climate change, are too vast to grasp directly.</p>' },
      { id: 'burn', kind: 'global', x: GX, y: 318, w: 180, h: 82, title: 'Burnout society & digital power', sub: 'Byung-Chul Han, Achille Mbembe',
        detail: '<p>Han (<em>The Burnout Society</em>, 2010): we exploit ourselves in the name of self-improvement. Mbembe (“Necropolitics”, 2003): power decides who may live.</p>' },
      { id: 'han', kind: 'callout', x: GX, y: 420, w: 180, h: 125, badge: 'Full circle', title: 'Han ↔ Emerson', sub: 'Emerson feared conformity imposed by society. Han sees us conforming to our own urge to perform.',
        detail: '<p>Is “be yourself, optimise yourself” today’s version of the conformity Emerson warned about?</p>' },
    ],
    edges: [
      { from: 'enl', to: 'fou', label: 'Locke, Scottish thought', labelAt: [240, 200] },
      { from: 'enl', to: 'kant', type: 'reaction', fromY: 120, toY: 150 },
      { from: 'kant', to: 'rom' },
      { from: 'pur', to: 'uni', fromY: 470, toY: 470 },
      { from: 'fou', to: 'uni', fromY: 325, toY: 420 },
      { from: 'fou', to: 'tra', path: 'M330,262 C470,262 610,290 610,386', label: 'keeps its ideals, not its philosophy', labelAt: [462, 302] },
      { from: 'uni', to: 'tra', type: 'reaction', fromY: 445, toY: 445 },
      { from: 'rom', to: 'tra', label: 'via Coleridge', labelAt: [668, 300], anchor: 'start' },
      { from: 'tra', to: 'nie', path: 'M750,410 C771,410 749,160 770,160', label: 'admired by', labelAt: [768, 240], anchor: 'start' },
      { from: 'tra', to: 'pra', fromY: 470, toY: 470 },
      { from: 'cw', to: 'pra', label: 'optimism, what works', labelAt: [860, 374] },
      { from: 'nie', to: 'exi', fromY: 150, toY: 101 },
      { from: 'exi', to: 'abs', label: 'branch, same decade', labelAt: [1060, 157] },
      { from: 'ww', to: 'abs' },
      { from: 'exi', to: 'pom', type: 'reaction', fromY: 101, toY: 140 },
      { from: 'pra', to: 'dew', fromY: 445, toY: 445 },
      { from: 'dew', to: 'neo', fromY: 445, toY: 445 },
      { from: 'pom', to: 'neo', label: 'Rorty borrows its language turn', labelAt: [1260, 300] },
      { from: 'pom', toPoint: [1386, 175] },
      { from: 'neo', toPoint: [1386, 380] },
      { from: 'ai', to: 'tech' },
      { from: 'burn', to: 'han' },
    ],
    outlineExtra: 'One Enlightenment tradition until about 1780. Europe then moves past Locke (Kant, Romanticism) while New England keeps him (Unitarianism). Emerson imports European Romanticism to break free, after which the streams diverge for real: the Civil War pushes America toward pragmatism, the World Wars push Europe toward existentialism. In the 21st century they converge again.',
  };
  FLOW.streams = streams;
})(typeof window !== 'undefined' ? window : globalThis);
