import React from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

import { Textarea } from "../textarea"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

export type FormTextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    FormFieldWrapperPassThroughProps & {
      className?: string
      registration: Partial<UseFormRegisterReturn>
    }

const FormTextArea = React.forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ className, label, error, registration, ...props }, ref) => {
    return (
      <FormFieldWrapper label={label} error={error}>
        <Textarea
          ref={ref}
          className={className}
          {...registration}
          {...props}
        />
      </FormFieldWrapper>
    )
  },
)
FormTextArea.displayName = "FormTextArea"

export { FormTextArea }
