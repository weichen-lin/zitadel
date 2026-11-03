import "@/styles/account-entry.scss";
import "@/styles/globals.scss";

import { BackgroundWrapper } from "@/components/background-wrapper";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Skeleton } from "@/components/skeleton";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeSwitch from "@/components/theme-switch";
import { getLoginLanguages, LANGS } from "@/lib/i18n";
import { getServiceConfig } from "@/lib/service-url";
import { getAllowedLanguages } from "@/lib/zitadel";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Lato } from "next/font/google";
import { headers } from "next/headers";
import React, { Suspense } from "react";

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common");
  return {
    title: { default: t("title"), template: "%s · ParaZeni" },
    icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/brand/favicon.svg` },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  const t = await getTranslations("appearance");
  const themeLabels = { light: t("light"), system: t("system"), dark: t("dark") };
  let languages = LANGS;
  try {
    const settings = await getAllowedLanguages({ serviceConfig });
    if (settings.allowedLanguages?.length) {
      languages = getLoginLanguages(settings.allowedLanguages);
    }
  } catch (e) {
    console.error("Failed to load supported languages", e);
  }

  return (
    <html lang={await getLocale()} className={`${lato.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Tooltip.Provider>
            <Suspense
              fallback={
                <BackgroundWrapper className="login-surface bg-background-light-500 dark:bg-background-dark-600 text-text-light-500 dark:text-text-dark-500 relative flex min-h-screen flex-col justify-center">
                  <div className="relative mx-auto w-full max-w-[440px] py-8">
                    <Skeleton>
                      <div className="h-40"></div>
                    </Skeleton>
                    <div className="flex flex-row items-center justify-end space-x-4 py-4">
                      <ThemeSwitch labels={themeLabels} />
                    </div>
                  </div>
                </BackgroundWrapper>
              }
            >
              <LanguageProvider>
                <BackgroundWrapper className="login-surface bg-background-light-500 dark:bg-background-dark-600 text-text-light-500 dark:text-text-dark-500 relative flex min-h-screen flex-col justify-center">
                  <div className="login-frame relative mx-auto w-full max-w-[1100px] py-8">
                    <div>{children}</div>
                    <div className="login-tools mx-auto flex max-w-[440px] flex-row items-center justify-end space-x-4 px-4 py-4 md:max-w-full md:px-8">
                      <LanguageSwitcher languages={languages} />
                      <ThemeSwitch labels={themeLabels} />
                    </div>
                  </div>
                </BackgroundWrapper>
              </LanguageProvider>
            </Suspense>
          </Tooltip.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
