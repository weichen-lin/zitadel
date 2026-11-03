export interface Lang {
  name: string;
  code: string;
}

export const LANGS: Lang[] = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "Deutsch",
    code: "de",
  },
  {
    name: "Italiano",
    code: "it",
  },
  {
    name: "Español",
    code: "es",
  },
  {
    name: "Français",
    code: "fr",
  },
  {
    name: "Nederlands",
    code: "nl",
  },
  {
    name: "Polski",
    code: "pl",
  },
  {
    name: "Português",
    code: "pt",
  },
  {
    name: "简体中文",
    code: "zh",
  },
  {
    name: "繁體中文",
    code: "zh-TW",
  },
  {
    name: "Русский",
    code: "ru",
  },
  {
    name: "Magyar",
    code: "hu",
  },
  {
    name: "Türkçe",
    code: "tr",
  },
  {
    name: "日本語",
    code: "ja",
  },
  {
    name: "Українська",
    code: "uk",
  },
  {
    name: "العربية",
    code: "ar",
  },
];

export const LANGUAGE_COOKIE_NAME = "NEXT_LOCALE";
export const LANGUAGE_HEADER_NAME = "accept-language";

export function shouldUILocalesOverrideCookie(): boolean {
  return process.env.ZITADEL_UI_LOCALES_OVERRIDE_COOKIE === "true";
}

// Keep the Chinese script when matching a regional browser or OIDC language tag.
export function resolveLoginLocale(tag: string): string | undefined {
  try {
    const locale = new Intl.Locale(tag.trim());
    if (locale.language === "zh" && locale.maximize().script === "Hant") return "zh-TW";
    return LANGS.find((lang) => lang.code === locale.language)?.code;
  } catch {
    return undefined;
  }
}

export function getLoginLanguages(allowed: string[]): Lang[] {
  if (!allowed.length) return LANGS;
  const codes = new Set(allowed.map(resolveLoginLocale));
  // ZITADEL's generic Chinese setting covers both of the UI's Chinese translations.
  if (allowed.some((tag) => tag.toLowerCase() === "zh")) codes.add("zh-TW");
  return LANGS.filter(({ code }) => codes.has(code));
}
