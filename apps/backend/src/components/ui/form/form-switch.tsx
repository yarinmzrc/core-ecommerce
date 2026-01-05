import { Control, FieldValues, Path } from "react-hook-form"

import { Switch } from "../switch"
import { FormField } from "./form"
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from "./form-field-wrapper"

export type FormSwitchProps<TFormValues extends FieldValues> =
  FormFieldWrapperPassThroughProps & {
    name: Path<TFormValues>
    control: Control<TFormValues>
    className?: string
  }

function FormSwitch<TFormValues extends FieldValues>({
  name,
  control,
  className,
  label,
  error,
  ...props
}: FormSwitchProps<TFormValues>) {
  return (
    <FormFieldWrapper label={label} error={error}>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value}
            onCheckedChange={field.onChange}
            className={className}
            {...props}
          />
        )}
      />
    </FormFieldWrapper>
  )
}
FormSwitch.displayName = "FormSwitch"

export { FormSwitch }
