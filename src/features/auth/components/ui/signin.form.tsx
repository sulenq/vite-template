// src/features/auth/components/ui/signin.form.tsx

"use client";

import { Button } from "@/design-system/components/button/ui/button";
import type { FieldsetProps } from "@/design-system/components/input/types/fieldset.type";
import { Field } from "@/design-system/components/input/ui/field";
import { Fieldset } from "@/design-system/components/input/ui/fieldset";
import { NavLink } from "@/design-system/components/navigation/ui/link";

export type SigninFormProps = FieldsetProps & {};

export const SigninForm = (props: SigninFormProps) => {
  // Props
  const { ...restProps } = props;

  return (
    <Fieldset {...restProps}>
      <Field label={"Email"}></Field>
      <Field label={"Password"}></Field>
      <NavLink to={"/portal/welcome"}>
        <Button primary>Signin</Button>
      </NavLink>
    </Fieldset>
  );
};
