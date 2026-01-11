import React from "react"
import type { Control, FieldValues, Path } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Input } from "../input"
import { FormField } from "./form"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

export type FormInputProps<TFormValues extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> &
    FormFieldWrapperPassThroughProps & {
      name: Path<TFormValues>
      control: Control<TFormValues>
      className?: string
    }

function FormInput<TFormValues extends FieldValues>({
  className,
  type,
  name,
  control,
  label,
  error,
  ...props
}: FormInputProps<TFormValues>) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            type={type}
            {...field}
            onChange={(e) => {
              field.onChange(
                type === "number" ? Number(e.target.value) : e.target.value,
              )
            }}
            {...props}
            className={cn("w-full", className)}
          />
        )}
      />
    </FormFieldWrapper>
  )
}

FormInput.displayName = "FormInput"

export { FormInput }
