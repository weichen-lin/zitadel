import { Logo } from "@/components/logo";
import { ThemeWrapper } from "@/components/theme-wrapper";
import type { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  page: "login" | "register";
  branding?: BrandingSettings;
  requestId?: string;
  organization?: string;
  orgDomain?: string;
  showRegistration: boolean;
  children: ReactNode;
};

export async function AccountEntry({
  page,
  branding,
  requestId,
  organization,
  orgDomain,
  showRegistration,
  children,
}: Props) {
  const t = await getTranslations("accountEntry");
  const login = await getTranslations("loginname");
  const query: Record<string, string> = {};
  if (organization) query.organization = organization;
  if (requestId) query.requestId = requestId;
  if (orgDomain) query.orgDomain = orgDomain;

  return (
    <ThemeWrapper branding={branding}>
      <main className="account-entry">
        <div className="account-identity">
          <Logo lightSrc={branding?.lightTheme?.logoUrl} darkSrc={branding?.darkTheme?.logoUrl} />
          <div
            className="account-impression"
            aria-hidden="true"
            style={{
              maskImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/parazeni-impression.svg)`,
            }}
          />
        </div>
        <div className="account-content">
          {showRegistration && (
            <nav className="account-tabs" aria-label={t("navigation")}>
              {page === "login" ? (
                <span aria-current="page">{t("login")}</span>
              ) : (
                <Link href={{ pathname: "/loginname", query }} prefetch={false}>
                  {t("login")}
                </Link>
              )}
              {page === "register" ? (
                <span aria-current="page">{login("register")}</span>
              ) : (
                <Link href={{ pathname: "/register", query }} prefetch={false} data-testid="register-button">
                  {login("register")}
                </Link>
              )}
            </nav>
          )}
          {children}
        </div>
      </main>
    </ThemeWrapper>
  );
}
