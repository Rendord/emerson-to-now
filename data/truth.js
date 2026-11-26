// Chart data: coordinates are in the chart's design space (px).
(function (root) {
  const FLOW = root.FLOW = root.FLOW || {};
  // ---------- chart 3: where does truth live? ----------
  const truth = [
    { year: 'c. 1690', kind: 'shared', title: 'Enlightenment', where: 'Out there, discovered by reason and science.', key: 'Reason' },
    { year: '1776', kind: 'shared', title: 'Declaration of Independence', where: '“Self-evident”: plain to any reasoning mind, for all people.', key: 'Rights' },
    { year: '1841', kind: 'america', title: 'Transcendentalism', where: 'Within: intuition connects you to the divine.', key: 'Spirit' },
    { year: '1882', kind: 'europe', title: 'Nietzsche', where: 'Nowhere given: you create your own values.', key: 'Will' },
    { year: '1907', kind: 'america', title: 'Pragmatism', where: 'In practice: what works when tested in experience.', key: 'Practice' },
    { year: '1942', kind: 'europe', title: 'Absurdism', where: 'Nowhere: the universe is silent, so we make meaning anyway.', key: 'Revolt' },
    { year: '1979', kind: 'europe', title: 'Postmodernism', where: 'In language and power: no grand narrative holds.', key: 'Power' },
    { year: '1989', kind: 'america', title: 'Neo-pragmatism', where: 'In conversation: whatever helps us live together.', key: 'Solidarity' },
    { year: '2010s', kind: 'global', title: '21st century', where: 'In networks of humans, machines and nature together.', key: 'Entanglement' },
  ];
  FLOW.truth = truth;
})(typeof window !== 'undefined' ? window : globalThis);
