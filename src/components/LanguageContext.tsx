import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "id" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
}>({ lang: "id", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
