import { z } from 'zod';

const evidenceClass = z.enum(['artifact', 'simulation', 'measured', 'mixed']);
const linkKind = z.enum(['source', 'tests', 'release', 'demo', 'report']);

export const projectSchema = z
  .object({
    title: z.string().min(3),
    question: z.string().min(20),
    summary: z.string().min(40),
    recruiterSummary: z.string().min(80),
    metaDescription: z.string().min(40).max(170),
    status: z.enum(['released', 'live-demo', 'prototype', 'research', 'coursework', 'archived']),
    role: z.enum(['individual', 'team-project', 'team-research', 'team-coursework']),
    teamSize: z.number().int().positive().optional(),
    contribution: z.string().min(40),
    creditLabel: z.string().min(10).optional(),
    creditNote: z.string().optional(),
    statusNote: z.string().min(10).optional(),
    evidenceClass: evidenceClass,
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
          claim: z.string().min(5),
          value: z.string().min(1),
          evidenceClass: evidenceClass,
          method: z.string().min(20),
          source: z.url(),
        }),
      )
      .default([]),
    limits: z.array(z.string().min(20)).min(1),
    nextStep: z.string().min(20),
    diagram: z.enum([
      'signal-path',
      'local-system',
      'constellation',
      'counter-ledger',
      'memory-grid',
      'instruction-trace',
      'none',
    ]),
    diagramAlt: z.string().min(20),
    diagramCaption: z.string().min(20),
    depth: z.enum(['flagship', 'medium', 'archive']),
    visualRights: z.literal('original'),
    checkedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    draft: z.boolean().default(true),
  })
  .superRefine((project, context) => {
    const marketingCopy = [project.question, project.summary, project.recruiterSummary].join(' ');
    const unsupported =
      /fully offline|calibrated RF|measured (?:Mixtral|GPU) speedup|deployed detector|production-ready|blazing-fast/i;

    if (unsupported.test(marketingCopy)) {
      context.addIssue({
        code: 'custom',
        message: 'Marketing copy contains an unsupported or prohibited claim.',
        path: ['summary'],
      });
    }

    if (!project.links.some((link) => link.kind === 'source')) {
      context.addIssue({
        code: 'custom',
        message: 'Every project needs a primary source link.',
        path: ['links'],
      });
    }

    if (
      (project.evidenceClass === 'measured' || project.evidenceClass === 'mixed') &&
      !project.results.some((result) => result.evidenceClass === 'measured')
    ) {
      context.addIssue({
        code: 'custom',
        message: 'Measured evidence requires at least one measured result with method and source.',
        path: ['results'],
      });
    }
  });
