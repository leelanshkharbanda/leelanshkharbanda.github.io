export const site = {
  name: 'Leelansh Kharbanda',
  initials: 'LK',
  positioning: 'I make small systems so I can see what they’re doing.',
  introduction:
    'Signal paths, tiny instructions, memory movement, and local-first tools. This is where I keep the experiments—including the ones that didn’t work.',
  education: 'B.Tech ECE · IIIT Delhi',
  email: 'leelansh24319@iiitd.ac.in',
  github: 'https://github.com/leelanshkharbanda',
  linkedin: 'https://linkedin.com/in/leelansh-kharbanda',
  evidenceChecked: '2026-11-25',
  themes: [
    'Signal processing',
    'Computer architecture',
    'Hardware telemetry',
    'Local-first software',
  ],
} as const;

export const roleLabels = {
  individual: 'Personal project',
  'team-project': 'Team project',
  'team-research': 'Team research',
  'team-coursework': 'Group coursework',
} as const;

export const statusLabels = {
  released: 'Released',
  'live-demo': 'Live demo',
  prototype: 'Prototype',
  research: 'Research',
  coursework: 'Coursework',
  archived: 'Archive',
} as const;

export const evidenceLabels = {
  artifact: 'Artifact / source evidence',
  simulation: 'Simulation result',
  measured: 'Measured dataset result',
  mixed: 'Mixed evidence',
} as const;
