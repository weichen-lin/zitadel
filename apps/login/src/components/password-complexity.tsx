import { Translated } from "@/components/translated";
import { lowerCaseValidator, numberValidator, symbolValidator, upperCaseValidator } from "@/helpers/validators";
import { PasswordComplexitySettings } from "@zitadel/proto/zitadel/settings/v2/password_settings_pb";
import { useTranslations } from "next-intl";

type Props = {
  passwordComplexitySettings: PasswordComplexitySettings;
  password: string;
  equals: boolean;
};

function CheckIcon({ title }: { title: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="mt-0.5 h-4 w-4 text-green-500"
      role="img"
    >
      <title>{title}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function CrossIcon({ title }: { title: string }) {
  return (
    <svg
      className="text-warn-light-500 dark:text-warn-dark-500 mt-0.5 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      role="img"
    >
      <title>{title}</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function renderIcon(matched: boolean, t: ReturnType<typeof useTranslations>) {
  return matched ? <CheckIcon title={t("complexity.matches")} /> : <CrossIcon title={t("complexity.doesNotMatch")} />;
}
const desc = "text-sm leading-5 text-input-light-label dark:text-input-dark-label";

export function PasswordComplexity({ passwordComplexitySettings, password, equals }: Props) {
  const t = useTranslations("password");
  const hasMinLength = password?.length >= passwordComplexitySettings.minLength;
  const hasSymbol = symbolValidator(password);
  const hasNumber = numberValidator(password);
  const hasUppercase = upperCaseValidator(password);
  const hasLowercase = lowerCaseValidator(password);

  return (
    <ul className="m-0 grid list-none gap-1.5 p-0">
      {passwordComplexitySettings.minLength != undefined ? (
        <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2" data-testid="length-check">
          {renderIcon(hasMinLength, t)}
          <span className={desc}>
            <Translated
              i18nKey="complexity.length"
              namespace="password"
              data={{ minLength: passwordComplexitySettings.minLength.toString() }}
            />
          </span>
        </li>
      ) : null}
      {passwordComplexitySettings.requiresSymbol && (
        <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2" data-testid="symbol-check">
          {renderIcon(hasSymbol, t)}
          <span className={desc}>
            <Translated i18nKey="complexity.hasSymbol" namespace="password" />
          </span>
        </li>
      )}
      {passwordComplexitySettings.requiresNumber && (
        <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2" data-testid="number-check">
          {renderIcon(hasNumber, t)}
          <span className={desc}>
            <Translated i18nKey="complexity.hasNumber" namespace="password" />
          </span>
        </li>
      )}
      {passwordComplexitySettings.requiresUppercase && (
        <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2" data-testid="uppercase-check">
          {renderIcon(hasUppercase, t)}
          <span className={desc}>
            <Translated i18nKey="complexity.hasUppercase" namespace="password" />
          </span>
        </li>
      )}
      {passwordComplexitySettings.requiresLowercase && (
        <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2" data-testid="lowercase-check">
          {renderIcon(hasLowercase, t)}
          <span className={desc}>
            <Translated i18nKey="complexity.hasLowercase" namespace="password" />
          </span>
        </li>
      )}
      <li className="grid grid-cols-[1rem_minmax(0,1fr)] items-start gap-2" data-testid="equal-check">
        {renderIcon(equals, t)}
        <span className={desc}>
          <Translated i18nKey="complexity.equals" namespace="password" />
        </span>
      </li>
    </ul>
  );
}
