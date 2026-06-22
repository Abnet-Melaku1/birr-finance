import { resolveTheme } from './ThemeProvider';

describe('resolveTheme', () => {
  it('forces bold when pref is bold, ignoring scheme', () => {
    expect(resolveTheme('bold', 'dark').mode).toBe('bold');
    expect(resolveTheme('bold', 'light').mode).toBe('bold');
  });

  it('forces dark when pref is dark, ignoring scheme', () => {
    expect(resolveTheme('dark', 'light').mode).toBe('dark');
    expect(resolveTheme('dark', 'dark').mode).toBe('dark');
  });

  it('follows the OS scheme when pref is system', () => {
    expect(resolveTheme('system', 'dark').mode).toBe('dark');
    expect(resolveTheme('system', 'light').mode).toBe('bold');
  });

  it('defaults to bold (light) when the scheme is unknown', () => {
    expect(resolveTheme('system', null).mode).toBe('bold');
    expect(resolveTheme('system', undefined).mode).toBe('bold');
  });
});
