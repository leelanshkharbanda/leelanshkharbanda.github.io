import type { CollectionEntry } from 'astro:content';
import { describe, expect, it } from 'vitest';
import { requireProjectEntries } from '../../src/data/projects';

function entry(id: string, draft = false): CollectionEntry<'projects'> {
  return { id, data: { draft } } as CollectionEntry<'projects'>;
}

describe('project publishing safeguards', () => {
  it('returns published curated entries in order', () => {
    const projects = requireProjectEntries(['one', 'two'], [entry('one'), entry('two')]);
    expect(projects.map((project) => project.id)).toEqual(['one', 'two']);
  });

  it('throws when a curated entry is missing', () => {
    expect(() => requireProjectEntries(['one', 'two'], [entry('one'), undefined])).toThrow(
      'Curated project "two" is missing',
    );
  });

  it('throws when a curated entry is still a draft', () => {
    expect(() => requireProjectEntries(['one'], [entry('one', true)])).toThrow(
      'Curated project "one" is still a draft',
    );
  });
});
