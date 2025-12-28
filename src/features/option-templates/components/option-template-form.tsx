"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

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

import { OptionInput, OptionPricingStrategy, OptionUI } from "../dtos"
import { CreateOptionTemplateSchema } from "../schemas"

type StateTypeNormalized = Omit<
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

const initialState: StateTypeNormalized = {
  name: "",
  uiType: OptionUI.SELECT,
  inputType: OptionInput.TEXT,
  pricingStrategy: OptionPricingStrategy.NONE,
  inputs: [],
  required: false,
  isActive: true,
}

export function OptionTemplateForm() {
  const t = useTranslations("admin.optionTemplates")

  const [state, setState] = useState(initialState)

  const handleChange = (key: string, value: string) => {
    setState((prev) => {
      return { ...prev, [key]: value }
    })
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="col-span-2 space-y-2">
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
        <div key={input.id} className="col-span-2 flex items-end gap-2">
          <div className="space-y-1">
            <Label htmlFor={`option-${index + 1}`}>
              {t("form.optionLabel", { number: index + 1 })}
            </Label>
            <Input
              id={`option-${index + 1}`}
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
        className="col-span-2"
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
      <div className="space-y-2">
        <Switch
          id="required"
          checked={state.required}
          onCheckedChange={(required) =>
            setState((prev) => ({ ...prev, required }))
          }
        />
        <Label htmlFor="required">{t("form.required")}</Label>
      </div>
    </div>
  )
}
