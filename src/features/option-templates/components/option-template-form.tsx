"use client"

import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import {
  OptionInput,
  OptionPricingStrategy,
  OptionTemplateDTO,
  OptionUI,
} from "../dtos"
import { CreateOptionTemplateSchema } from "../schemas"

export type FormStateNormalized = Omit<
  CreateOptionTemplateSchema,
  "values" | "appType"
> & {
  inputs: {
    value: string
    label: string
    priceDelta?: number
    id: string
  }[]
}

const initialState: FormStateNormalized = {
  name: "",
  uiType: OptionUI.SELECT,
  inputType: OptionInput.TEXT,
  pricingStrategy: OptionPricingStrategy.NONE,
  inputs: [],
  required: false,
  isActive: true,
}

export function normalizeToFormState(
  data?: CreateOptionTemplateSchema,
): FormStateNormalized {
  if (!data) return initialState

  return {
    name: data.name,
    uiType: data.uiType,
    inputType: data.inputType,
    pricingStrategy: data.pricingStrategy,
    required: data.required,
    isActive: data.isActive,
    inputs: data.values.map((v) => ({
      id: crypto.randomUUID(),
      value: String(v.value),
      label: v.label,
      priceDelta: v.priceDelta,
    })),
  }
}

export function normalizeToOptionTemplate(
  data: FormStateNormalized,
): CreateOptionTemplateSchema {
  return {
    name: data.name,
    isActive: data.isActive,
    required: data.required,
    inputType: data.inputType,
    uiType: data.uiType,
    pricingStrategy: data.pricingStrategy,
    values: data.inputs.map((v) => ({
      value: v.value,
      label: v.label,
      priceDelta: v.priceDelta,
    })),
  }
}

type OptionTemplateFormProps = {
  optionTemplate?: OptionTemplateDTO
  onSave: (data: CreateOptionTemplateSchema) => void
}

export function OptionTemplateForm({
  optionTemplate,
  onSave,
}: OptionTemplateFormProps) {
  const t = useTranslations("admin.optionTemplates")

  const [state, setState] = useState<FormStateNormalized>(() =>
    optionTemplate ? normalizeToFormState(optionTemplate) : initialState,
  )

  const handleChange = (key: string, value: string) => {
    setState((prev) => {
      return { ...prev, [key]: value }
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="name">{t("form.name")}</Label>
        <Input
          id="name"
          placeholder={t("form.namePlaceholder")}
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="uiType">{t("form.uiType")}</Label>
        <Select
          value={state.uiType}
          onValueChange={(v) => handleChange("uiType", v)}
        >
          <SelectTrigger className="w-full" id="uiType">
            <SelectValue placeholder="Option UI Type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OptionUI).map((uiType) => (
              <SelectItem key={uiType} value={uiType}>
                {uiType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pricingStrategy">{t("form.pricingStrategy")}</Label>
        <Select
          value={state.pricingStrategy}
          onValueChange={(v) => handleChange("pricingStrategy", v)}
        >
          <SelectTrigger className="w-full" id="pricingStrategy">
            <SelectValue placeholder="Pricing Strategy" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OptionPricingStrategy).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {state.uiType !== "BOOLEAN" && (
        <div className="space-y-2">
          <Label htmlFor="inputType">{t("form.inputType")}</Label>
          <Select
            value={state.inputType}
            onValueChange={(v) => handleChange("inputType", v)}
          >
            <SelectTrigger className="w-full" id="inputType">
              <SelectValue placeholder="Pricing Strategy" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(OptionInput).map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {state.inputs.map((input, index) => (
        <div
          key={input.id}
          className="flex flex-col items-end gap-2 md:col-span-2 md:flex-row"
        >
          <div className="space-y-1">
            <Label htmlFor={`option-value-${index + 1}`}>
              {t("form.optionValueLabel", { number: index + 1 })}
            </Label>
            <Input
              id={`option-value-${index + 1}`}
              type={state.inputType}
              value={input.value}
              onChange={(e) => {
                const newInputs = state.inputs.map((i) => {
                  if (i.id === input.id) {
                    return { ...i, value: e.target.value }
                  }
                  return i
                })
                setState((prev) => ({ ...prev, inputs: newInputs }))
              }}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`option-label-${index + 1}`}>
              {t("form.optionlabelLabel", { number: index + 1 })}
            </Label>
            <Input
              id={`option-label-${index + 1}`}
              type={state.inputType}
              value={input.label}
              onChange={(e) => {
                const newInputs = state.inputs.map((i) => {
                  if (i.id === input.id) {
                    return { ...i, label: e.target.value }
                  }
                  return i
                })
                setState((prev) => ({ ...prev, inputs: newInputs }))
              }}
            />
          </div>
          {state.pricingStrategy === OptionPricingStrategy.ADDON && (
            <div className="space-y-1">
              <Label htmlFor={`price-delta-${index + 1}`}>
                {t("form.pricingDeltaLabel", { number: index + 1 })}
              </Label>
              <Input
                id={`price-delta-${index + 1}`}
                placeholder="Price Delta"
                type={state.inputType}
                value={input.priceDelta?.toString() ?? ""}
                onChange={(e) => {
                  const newInputs = state.inputs.map((i) => {
                    if (i.id === input.id) {
                      return {
                        ...i,
                        priceDelta: Number(e.target.value),
                      }
                    }
                    return i
                  })
                  setState((prev) => ({ ...prev, inputs: newInputs }))
                }}
              />
            </div>
          )}
          <Button
            type="button"
            variant="destructive"
            onClick={() =>
              setState((prev) => ({
                ...prev,
                inputs: prev.inputs.filter((i) => i.id !== input.id),
              }))
            }
          >
            {t("actions.delete")}
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="link"
        className="w-20 md:col-span-2"
        onClick={() =>
          setState((prev) => {
            return {
              ...prev,
              inputs: [
                ...prev.inputs,
                {
                  id: crypto.randomUUID(),
                  value: "",
                  label: "",
                  priceDelta: 0,
                },
              ],
            }
          })
        }
      >
        {t("form.addOption")}
      </Button>
      <div className="flex items-center gap-2">
        <Switch
          id="required"
          checked={state.required}
          onCheckedChange={(required) =>
            setState((prev) => ({ ...prev, required }))
          }
        />
        <Label htmlFor="required">{t("form.required")}</Label>
      </div>
      <Button
        className="col-span-1 w-full max-w-min md:col-span-2"
        type="button"
        onClick={() => onSave(normalizeToOptionTemplate(state))}
      >
        Save
      </Button>
    </div>
  )
}
