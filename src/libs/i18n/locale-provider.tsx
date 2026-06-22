// src/lib/i18n/locale-provider.tsx

import { createContext, useContext, useState, useCallback } from "react";
import {
  setLocale as paraglideSetLocale,
  getLocale,
  type Locale,
} from "@/paraglide/runtime";

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
} | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocale());

  const setLocale = useCallback((newLocale: Locale) => {
    paraglideSetLocale(newLocale, { reload: false });
    setLocaleState(newLocale);
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <div id={"locale-provider"} key={locale}>
        {children}
      </div>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
