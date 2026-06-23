import { useMemo } from 'react';
export function t(key: string, opts?: { defaultValue?: string }): string {
  return opts?.defaultValue ?? key;
}
export function useTranslation() {
  return useMemo(() => ({ t, i18n: { language: 'en', changeLanguage: async () => undefined } }), []);
}
