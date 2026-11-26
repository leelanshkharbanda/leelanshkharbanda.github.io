import { z } from 'zod';

const evidenceClass = z.enum(['artifact', 'simulation', 'measured', 'mixed']);
const linkKind = z.enum(['source', 'tests', 'release', 'demo', 'report']);

export const projectSchema = z
  .object({
    title: z.string().min(2),
    summary: z.string().min(20),
    metaDescription: z.string().min(20).max(170),
    status: z.enum(['released', 'live-demo', 'prototype', 'research', 'coursework', 'archived']),
    role: z.enum(['individual', 'team-project', 'team-research', 'team-coursework']),
    teamSize: z.number().int().positive().optional(),
    creditLabel: z.string().min(3).optional(),
    stack: z.array(z.string().min(1)).min(2),
    links: z
      .array(
        z.object({
          label: z.string().min(2),
          url: z.url(),
          kind: linkKind,
        }),
      )
      .min(1),
    results: z
      .array(
        z.object({
          claim: z.string().min(3),
          value: z.string().min(1),
          evidenceClass: evidenceClass,
          method: z.string().min(5),
          source: z.url(),
        }),
      )
      .default([]),
    diagram: z.enum([
      'signal-path',
      'local-system',
      'constellation',
      'counter-ledger',
      'memory-grid',
      'instruction-trace',
      'none',
    ]),
    diagramAlt: z.string().min(10),
    diagramCaption: z.string().min(5),
    depth: z.enum(['flagship', 'medium', 'archive']),
    draft: z.boolean().default(true),
  })
  .superRefine((project, context) => {
    if (!project.links.some((link) => link.kind === 'source')) {
      context.addIssue({
        code: 'custom',
        message: 'Every project needs a primary source link.',
        path: ['links'],
      });
    }
  });
