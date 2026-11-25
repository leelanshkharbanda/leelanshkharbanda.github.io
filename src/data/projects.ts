import type { CollectionEntry } from 'astro:content';

export function requireProjectEntries(
  slugs: readonly string[],
  entries: readonly (CollectionEntry<'projects'> | undefined)[],
): CollectionEntry<'projects'>[] {
  if (entries.length !== slugs.length) {
    throw new Error(
      `Project curation mismatch: expected ${slugs.length} entries, received ${entries.length}.`,
    );
  }

  return entries.map((entry, index) => {
    if (!entry) {
      throw new Error(`Curated project "${slugs[index]}" is missing.`);
    }
    if (entry.data.draft) {
      throw new Error(`Curated project "${slugs[index]}" is still a draft.`);
    }
    return entry;
  });
}
