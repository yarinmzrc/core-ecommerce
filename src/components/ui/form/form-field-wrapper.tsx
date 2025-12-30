import { FieldError } from "react-hook-form"

import { Label } from "../label"
import { FormError } from "./form-error-new"

type FormFieldWrapperProps = {
  label?: string
  className?: string
  children: React.ReactNode
  error?: FieldError | undefined
}

export type FormFieldWrapperPassThroughProps = Omit<
  FormFieldWrapperProps,
  "children" | "className"
>

export const FormFieldWrapper = (props: FormFieldWrapperProps) => {
  const { label, children, error } = props

  return (
    <div>
      <Label className="flex-col items-start">
        {label}
        <div className="w-full">{children}</div>
      </Label>
      <FormError errorMessage={error?.message} />
    </div>
  )
}
