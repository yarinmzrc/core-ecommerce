import React from "react"
import type { Control, FieldValues, Path } from "react-hook-form"

import { Textarea } from "../textarea"
import { FormField } from "./form"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

export type FormTextAreaProps<TFormValues extends FieldValues> =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FormFieldWrapperPassThroughProps & {
      className?: string
      name: Path<TFormValues>
      control: Control<TFormValues>
    }

function FormTextArea<TFormValues extends FieldValues>({
  name,
  control,
  className,
  label,
  error,
  ...props
}: FormTextAreaProps<TFormValues>) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea {...field} className={className} {...props} />
        )}
      />
    </FormFieldWrapper>
  )
}
FormTextArea.displayName = "FormTextArea"

export { FormTextArea }
