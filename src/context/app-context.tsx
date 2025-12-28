"use client"

import { createContext, useContext } from "react"

import { appConfig, AppData } from "@/config/app/app.config"
import { StockModeType } from "@/config/app/app-type.config"
import { OptionTemplate } from "@/config/app/option-templates"

export type AppContextType = {
  appConfig: typeof appConfig
  optionTemplates: OptionTemplate[]
  usesVariants: boolean
  stockMode: StockModeType
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: AppData
}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider")
  return ctx
}
