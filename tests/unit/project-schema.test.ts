import { describe, expect, it } from 'vitest';
import { projectSchema } from '../../src/data/project-schema';

const fixture = {
  title: 'Test project',
  question: 'A sufficiently descriptive engineering question?',
  summary: 'A sufficiently descriptive project summary for schema validation.',
  recruiterSummary:
    'A sufficiently detailed recruiter summary that explains the project, contribution, artifact, and limits without unsupported claims.',
  metaDescription: 'A descriptive project meta description for search and social previews.',
  status: 'prototype',
  role: 'individual',
  contribution: 'A clear contribution statement with enough detail for schema validation.',
  evidenceClass: 'artifact',
  stack: ['TypeScript', 'SVG'],
  links: [{ label: 'Source', url: 'https://github.com/example/project', kind: 'source' }],
  limits: ['A clear limitation that prevents an unsupported claim.'],
  nextStep: 'A concrete next step that follows from the stated limitation.',
  diagram: 'none',
  diagramAlt: 'No visual is used for this schema validation fixture.',
  diagramCaption: 'Text-only fixture with no reused visual asset.',
  depth: 'archive',
  visualRights: 'original',
  checkedOn: '2026-11-25',
} as const;

describe('project schema publishing defaults', () => {
  it('defaults omitted draft fields to true', () => {
    expect(projectSchema.parse(fixture).draft).toBe(true);
  });

  it('allows explicit publication', () => {
    expect(projectSchema.parse({ ...fixture, draft: false }).draft).toBe(false);
  });

  it('rejects measured evidence without a measured result', () => {
    const result = projectSchema.safeParse({ ...fixture, evidenceClass: 'measured' });
    expect(result.success).toBe(false);
  });
});
