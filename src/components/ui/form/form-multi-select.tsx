import { ChevronsUpDown } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Button } from "../button/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu"
import { FormField } from "./form"
import { FormFieldWrapper } from "./form-field-wrapper"

type Option = {
  label: string
  value: string
}

type FormMultiSelectProps = {
  name: string
  label?: string
  options: Option[]
  placeholder?: string
}

export function FormMultiSelect({
  name,
  label,
  options,
  placeholder,
}: FormMultiSelectProps) {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const fieldValue = (field.value as Option[]) || []

        return (
          <FormFieldWrapper label={label} error={fieldState.error}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {fieldValue.length > 0
                    ? `${fieldValue.length} selected`
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {options.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={fieldValue.some(
                      (val) => val.value === option.value,
                    )}
                    onCheckedChange={(checked) => {
                      const currentValue = fieldValue || []
                      const newValue = checked
                        ? [...currentValue, option]
                        : currentValue.filter(
                            (val) => val.value !== option.value,
                          )
                      field.onChange(newValue)
                    }}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </FormFieldWrapper>
        )
      }}
    />
  )
}
