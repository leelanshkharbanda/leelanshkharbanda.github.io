# Domain Docs

This repository uses a single domain context.

## Before exploring or writing content

- Read `GLOSSARY.md` for canonical portfolio and engineering terms.
- Read relevant decisions in `docs/adr/` before changing architecture or scope.
- If a needed term is missing, resolve it with the domain-modeling workflow before introducing competing synonyms.
- If any of these files do not exist, proceed silently; create them lazily when a term or decision is actually resolved.

## Use the glossary's vocabulary

When an issue title, project narrative, hypothesis, or test names a domain concept, use the term defined in `GLOSSARY.md`. A missing term is a signal to resolve the language rather than silently introduce a synonym.

## Flag ADR conflicts

If a proposal contradicts an existing ADR, surface the conflict explicitly rather than silently overriding it.

## Layout

- `GLOSSARY.md`: project-specific vocabulary, free of implementation details.
- `docs/adr/`: concise records of hard-to-reverse architectural and scope decisions.
