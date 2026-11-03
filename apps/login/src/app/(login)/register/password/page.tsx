import { AccountShell } from "@/components/account-entry";
import { SetRegisterPasswordForm } from "@/components/set-register-password-form";
import { Translated } from "@/components/translated";
import { getServiceConfig } from "@/lib/service-url";
import {
  getBrandingSettings,
  getDefaultOrg,
  getLegalAndSupportSettings,
  getLoginSettings,
  getPasswordComplexitySettings,
} from "@/lib/zitadel";
import { Organization } from "@zitadel/proto/zitadel/org/v2/org_pb";
import { headers } from "next/headers";

export default async function Page(props: { searchParams: Promise<Record<string | number | symbol, string | undefined>> }) {
  const searchParams = await props.searchParams;

  let { firstname, lastname, email, organization, requestId } = searchParams;

  const _headers = await headers();
  const { serviceConfig } = getServiceConfig(_headers);

  if (!organization) {
    const org: Organization | null = await getDefaultOrg({ serviceConfig });
    if (org) {
      organization = org.id;
    }
  }

  const missingData = !firstname || !lastname || !email || !organization;

  const legal = await getLegalAndSupportSettings({ serviceConfig, organization });
  const passwordComplexitySettings = await getPasswordComplexitySettings({ serviceConfig, organization });

  const branding = await getBrandingSettings({ serviceConfig, organization });

  const loginSettings = await getLoginSettings({ serviceConfig, organization });

  return missingData ? (
    <AccountShell branding={branding}>
      <div className="account-step-heading">
        <h1>
          <Translated i18nKey="missingdata.title" namespace="register" />
        </h1>
        <p className="account-description">
          <Translated i18nKey="missingdata.description" namespace="register" />
        </p>
      </div>
    </AccountShell>
  ) : loginSettings?.allowRegister && loginSettings.allowLocalAuthentication ? (
    <AccountShell branding={branding}>
      <div className="account-step-heading">
        <h1>
          <Translated i18nKey="password.title" namespace="register" />
        </h1>
        <p className="account-description">
          <Translated i18nKey="description" namespace="register" />
        </p>
      </div>

      <div className="w-full">
        {legal && passwordComplexitySettings && (
          <SetRegisterPasswordForm
            passwordComplexitySettings={passwordComplexitySettings}
            email={email}
            firstname={firstname}
            lastname={lastname}
            organization={organization as string} // organization is guaranteed to be a string here otherwise we would have returned earlier
            requestId={requestId}
          ></SetRegisterPasswordForm>
        )}
      </div>
    </AccountShell>
  ) : (
    <AccountShell branding={branding}>
      <div className="account-step-heading">
        <h1>
          <Translated i18nKey="disabled.title" namespace="register" />
        </h1>
        <p className="account-description">
          <Translated i18nKey="disabled.description" namespace="register" />
        </p>
      </div>
    </AccountShell>
  );
}
