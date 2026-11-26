// Chart data: coordinates are in the chart's design space (px).
(function (root) {
  const FLOW = root.FLOW = root.FLOW || {};
  // ---------- chart 1: Emerson's argument ----------
  const emerson = {
    id: 'argument', width: 1000, height: 690,
    nodes: [
      { id: 'over', kind: 'emerson', x: 300, y: 20, w: 400, h: 84, badge: 'Premise', title: 'The Over-Soul', sub: 'One divine mind runs through every person and through nature.',
        detail: '<p>From <em>The Over-Soul</em> (1841): God is not far away in heaven but present in each soul and in nature.</p><p>Everything else in the argument follows from this.</p>' },
      { id: 'intu', kind: 'emerson', x: 60, y: 160, w: 330, h: 84, title: 'So your intuition is the divine speaking', sub: 'No priest, king or church is needed as a middleman.',
        detail: '<p>If the divine is inside you, listening to yourself <em>is</em> listening to God.</p><p>“Trust thyself: every heart vibrates to that iron string.”</p>' },
      { id: 'conf', kind: 'opposed', x: 610, y: 160, w: 330, h: 84, badge: 'The threat', title: 'Society demands conformity', quote: 'Society is a joint-stock company…',
        detail: '<p>“Society everywhere is in conspiracy against the manhood of every one of its members. Society is a joint-stock company…”</p><p>The virtue it asks for most is conformity.</p>' },
      { id: 'prim', kind: 'emerson', x: 60, y: 290, w: 330, h: 84, title: 'Intuition is primary wisdom', sub: 'Everything learned second-hand is only “tuition”.',
        detail: '<p>“We denote this primary wisdom as Intuition, whilst all later teachings are tuitions.”</p><p>Books, traditions and experts are useful, but they come second.</p>' },
      { id: 'fals', kind: 'opposed', x: 610, y: 290, w: 330, h: 84, title: 'You live behind a false front', sub: 'Pleasing others replaces your own judgement; integrity decays.',
        detail: '<p>Doing good out of social obligation rather than conviction is hollow. Emerson mocks the “foolish philanthropy” given only because it is expected.</p>' },
      { id: 'concl', kind: 'conclusion', x: 280, y: 420, w: 440, h: 84, badge: 'Conclusion', title: 'Trust yourself and speak your own truth', quote: 'Whoso would be a man, must be a nonconformist.',
        detail: '<p>Self-reliance (trusting the divine in you) and truthfulness (refusing the false front) are the same act seen from two sides.</p>' },
      { id: 'o1', kind: 'emerson', x: 20, y: 560, w: 225, h: 110, badge: 'Why it matters', title: 'You keep your identity', quote: 'Envy is ignorance; imitation is suicide.',
        detail: '<p>Copying others kills the one thing only you can contribute.</p>' },
      { id: 'o2', kind: 'emerson', x: 265, y: 560, w: 225, h: 110, badge: 'Why it matters', title: 'You hear the divine first-hand', sub: 'Not through someone else’s church, book or authority.',
        detail: '<p>Relying on others’ revelation means living on second-hand truth.</p>' },
      { id: 'o3', kind: 'emerson', x: 510, y: 560, w: 225, h: 110, badge: 'Why it matters', title: 'You keep your integrity', quote: 'Nothing is at last sacred but the integrity of your own mind.',
        detail: '<p>Virtue has to come from conviction, not from what is expected of you.</p>' },
      { id: 'o4', kind: 'emerson', x: 755, y: 560, w: 225, h: 110, badge: 'Why it matters', title: 'Real progress comes from individuals', quote: 'To be great is to be misunderstood.',
        detail: '<p>“Society never advances”: new machines and institutions don’t make better people.</p><p>His examples of the misunderstood: Pythagoras, Socrates, Jesus, Luther, Copernicus, Galileo, Newton.</p>' },
    ],
    edges: [
      { from: 'over', to: 'intu' },
      { from: 'intu', to: 'prim' },
      { from: 'conf', to: 'fals' },
      { from: 'prim', to: 'concl', label: 'therefore' },
      { from: 'fals', to: 'concl', type: 'reaction', label: 'resist it' },
      { from: 'concl', to: 'o1' }, { from: 'concl', to: 'o2' }, { from: 'concl', to: 'o3' }, { from: 'concl', to: 'o4' },
    ],
  };
  FLOW.argument = emerson;
})(typeof window !== 'undefined' ? window : globalThis);
