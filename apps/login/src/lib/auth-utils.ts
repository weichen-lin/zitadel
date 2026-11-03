import { LANGS, resolveLoginLocale } from "@/lib/i18n";

/**
 * Authentication utility functions that don't require server actions
 */

/**
 * Check if a language code is valid (supported by the login UI)
 */
export function isValidLanguage(code: string): boolean {
  const normalized = code.trim().toLowerCase();
  return LANGS.some((lang) => lang.code.toLowerCase() === normalized);
}

/**
 * Extract a valid language code from uiLocales array.
 * Returns the canonical code of the first supported translation.
 */
export function getValidLocaleFromUILocales(uiLocales: string[] | undefined): string | null {
  for (const tag of uiLocales ?? []) {
    const locale = resolveLoginLocale(tag);
    if (locale) return locale;
  }
  return null;
}

/**
 * Validate authentication request parameters
 */
export function validateAuthRequest(searchParams: URLSearchParams): string | null {
  const oidcRequestId = searchParams.get("authRequest");
  const samlRequestId = searchParams.get("samlRequest");

  const requestId =
    searchParams.get("requestId") ??
    (oidcRequestId ? `oidc_${oidcRequestId}` : samlRequestId ? `saml_${samlRequestId}` : undefined);

  return requestId || null;
}

/**
 * Check if request is an RSC request
 */
export function isRSCRequest(searchParams: URLSearchParams): boolean {
  return searchParams.has("_rsc");
}
