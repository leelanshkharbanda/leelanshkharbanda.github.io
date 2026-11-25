import { describe, expect, it } from 'vitest';
import { archiveProjects, featuredProjects, homepageProjects } from '../../src/data/curation';

const allSlugs = [...homepageProjects, ...featuredProjects, ...archiveProjects];

describe('project curation', () => {
  it('keeps the approved 3 / 5 / 3 structure', () => {
    expect(homepageProjects).toHaveLength(3);
    expect(featuredProjects).toHaveLength(5);
    expect(archiveProjects).toHaveLength(3);
  });

  it('keeps homepage projects inside the featured set without other duplicates', () => {
    expect(new Set(featuredProjects).size).toBe(featuredProjects.length);
    expect(new Set(archiveProjects).size).toBe(archiveProjects.length);
    const featured = new Set<string>(featuredProjects);
    expect(archiveProjects.some((slug) => featured.has(slug))).toBe(false);
    for (const slug of homepageProjects) {
      expect(featuredProjects).toContain(slug);
    }
  });

  it('uses stable human-readable slugs', () => {
    for (const slug of allSlugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });
});
