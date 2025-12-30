import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

import { Switch } from "../switch"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

export type FormSwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  FormFieldWrapperPassThroughProps & {
    className?: string
    registration: Partial<UseFormRegisterReturn>
  }

const FormSwitch = React.forwardRef<HTMLButtonElement, FormSwitchProps>(
  ({ className, label, error, registration, ...props }, ref) => {
    return (
      <FormFieldWrapper label={label} error={error}>
        <Switch ref={ref} className={className} {...registration} {...props} />
      </FormFieldWrapper>
    )
  },
)
FormSwitch.displayName = "FormSwitch"

export { FormSwitch }
