"use client";

import { Label, Radio, RadioGroup } from "@headlessui/react";
import { Translated } from "./translated";

export enum AuthenticationMethod {
  Passkey = "passkey",
  Password = "password",
}

export const methods = [AuthenticationMethod.Passkey, AuthenticationMethod.Password];

export function AuthenticationMethodRadio({
  selected,
  selectionChanged,
}: {
  selected: any;
  selectionChanged: (value: any) => void;
}) {
  return (
    <RadioGroup value={selected} onChange={selectionChanged} className="account-methods">
      <Label className="sr-only">
        <Translated i18nKey="selectMethod" namespace="register" />
      </Label>
      {methods.map((method) => (
        <Radio key={method} value={method} data-testid={method + "-radio"} className="account-method">
          <span aria-hidden="true" />
          <Translated i18nKey={`methods.${method}`} namespace="register" />
        </Radio>
      ))}
    </RadioGroup>
  );
}
