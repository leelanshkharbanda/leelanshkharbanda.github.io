import { describe, expect, it } from 'vitest';
import { projectSchema } from '../../src/data/project-schema';

const fixture = {
  title: 'Test project',
  summary: 'A sufficiently descriptive project summary for schema validation.',
  metaDescription: 'A descriptive project meta description for search and social previews.',
  status: 'prototype',
  role: 'individual',
  stack: ['TypeScript', 'SVG'],
  links: [{ label: 'Source', url: 'https://github.com/example/project', kind: 'source' }],
  diagram: 'none',
  diagramAlt: 'No visual is used for this schema validation fixture.',
  diagramCaption: 'Text-only fixture.',
  depth: 'archive',
} as const;

describe('project schema publishing defaults', () => {
  it('defaults omitted draft fields to true', () => {
    expect(projectSchema.parse(fixture).draft).toBe(true);
  });

  it('allows explicit publication', () => {
    expect(projectSchema.parse({ ...fixture, draft: false }).draft).toBe(false);
  });

  it('requires at least one source link', () => {
    const result = projectSchema.safeParse({
      ...fixture,
      links: [{ label: 'Demo', url: 'https://example.com', kind: 'demo' }],
    });
    expect(result.success).toBe(false);
  });
});
