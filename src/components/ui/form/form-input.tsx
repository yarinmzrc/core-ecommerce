import React from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Input } from "../input"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

export type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  FormFieldWrapperPassThroughProps & {
    className?: string
    registration: Partial<UseFormRegisterReturn>
  }

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, type, label, error, registration, ...props }, ref) => {
    return (
      <FormFieldWrapper label={label} error={error}>
        <Input
          ref={ref}
          type={type}
          className={cn("w-full", className)}
          {...registration}
          {...props}
        />
      </FormFieldWrapper>
    )
  },
)
FormInput.displayName = "FormInput"

export { FormInput }
