import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

import {
  OrdersTable,
  OrdersTableSkeleton,
} from "@/features/orders/components/orders-table"

import { PageHeader } from "../../_components/page-header"

type AdminOrdersPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminOrdersPage({
  searchParams,
}: AdminOrdersPageProps) {
  const t = await getTranslations("admin.orders")

  const pageSearchParam = (await searchParams).page
  const page =
    typeof pageSearchParam === "string" ? parseInt(pageSearchParam) : 1

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>{t("title")}</PageHeader>
      </div>
      <Suspense key={page} fallback={<OrdersTableSkeleton />}>
        <OrdersTable page={page} />
      </Suspense>
    </>
  )
}
