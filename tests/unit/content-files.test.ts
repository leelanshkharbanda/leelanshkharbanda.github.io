import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectDirectory = join(process.cwd(), 'src/content/projects');
const files = readdirSync(projectDirectory).filter((file) => file.endsWith('.md'));
const expectedTeamSizes: Record<string, number | undefined> = {
  'chronos-dsp.md': undefined,
  'life-os.md': 3,
  'modulation-studio.md': 2,
  'hpc-boost.md': undefined,
  'moe-memory-wall.md': undefined,
  'riscv-simulator.md': 4,
  'university-erp.md': 2,
  'tasveer.md': undefined,
};

function readProject(file: string) {
  return readFileSync(join(projectDirectory, file), 'utf8');
}

describe('project content invariants', () => {
  it('contains exactly the eight approved original projects', () => {
    expect(files.sort()).toEqual(Object.keys(expectedTeamSizes).sort());
  });

  it.each(files)('%s has source links and publishing metadata', (file) => {
    const content = readProject(file);
    expect(content).toMatch(/^\s*kind:\s*'?source'?$/m);
    expect(content).toContain('draft: false');
    expect(content).not.toContain('breaking-byts');
  });

  it.each(files)('%s preserves the verified team-size boundary', (file) => {
    const content = readProject(file);
    const match = content.match(/^teamSize:\s*(\d+)$/m);
    expect(match ? Number(match[1]) : undefined).toBe(expectedTeamSizes[file]);
  });

  it.each(files)('%s includes an overview section', (file) => {
    const content = readProject(file);
    expect(content).toContain('## Overview');
  });
});
