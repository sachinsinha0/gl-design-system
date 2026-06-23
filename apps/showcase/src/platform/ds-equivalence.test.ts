import { describe, it, expect, beforeAll } from 'vitest';
import '../catalogs/magna';
import '../catalogs/jedi';
import '../catalogs/glds-web';
import { equivalentSlug } from './ds-equivalence';

describe('equivalentSlug', () => {
  beforeAll(() => {
    // imports above trigger registration as a side effect
  });

  it('returns same slug when from === to', () => {
    expect(equivalentSlug('magna', 'buttons', 'magna')).toBe('buttons');
  });

  it('maps Magna inputs to GLDS text-field', () => {
    expect(equivalentSlug('magna', 'inputs', 'glds-web')).toBe('text-field');
  });

  it('maps Jedi buttons to GLDS button (singular)', () => {
    expect(equivalentSlug('jedi', 'buttons', 'glds-web')).toBe('button');
  });

  it('maps unknown slugs to home', () => {
    expect(equivalentSlug('magna', 'this-does-not-exist', 'jedi')).toBe('home');
  });

  it('preserves guidelines slugs across DS', () => {
    expect(equivalentSlug('magna', 'guidelines/color', 'jedi')).toBe('guidelines/color');
  });
});
