import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';

describe('public site facts', () => {
  it('uses the current GitHub identity', () => {
    expect(site.github).toBe('https://github.com/leelanshkharbanda');
    expect(site.github).not.toContain('breaking-byts');
  });

  it('publishes only the intended contact routes', () => {
    expect(site.email).toBe('leelansh24319@iiitd.ac.in');
    expect(site.linkedin).toBe('https://linkedin.com/in/leelansh-kharbanda');
  });

  it('keeps positioning specific to the verified domains', () => {
    expect(site.positioning).toContain('software and hardware');
    expect(site.themes).toEqual([
      'Signal processing',
      'Computer architecture',
      'Hardware telemetry',
      'Local-first software',
    ]);
  });
});
