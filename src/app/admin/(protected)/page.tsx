import { getTranslations } from "next-intl/server"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import db from "@/lib/db"
import { formatCurrency, formatNumber } from "@/lib/format"

async function getOrderData() {
  const data = await db.order.aggregate({
    _sum: { pricePaid: true },
    _count: true,
  })

  return {
    amount: data._sum.pricePaid || 0,
    count: data._count,
  }
}

async function getUserData() {
  const data = await db.user.aggregate({
    _count: true,
  })
  return {
    count: data._count,
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({
      where: { isAvailableForSale: true },
    }),
    db.product.count({
      where: { isAvailableForSale: false },
    }),
  ])

  return {
    activeCount,
    inactiveCount,
  }
}

export default async function Admin() {
  const t = await getTranslations("admin.dashboard")

  const [orderData, userData, productData] = await Promise.all([
    getOrderData(),
    getUserData(),
    getProductData(),
  ])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title={t("cards.sales")}
        subtitle={formatNumber(orderData.amount)}
        body={formatCurrency(orderData.amount)}
      />

      <DashboardCard
        title={t("cards.customersTitle")}
        subtitle={t("cards.customersSubtitle", { count: userData.count })}
        body={formatCurrency(userData.count)}
      />

      <DashboardCard
        title={t("cards.activeProductsTitle")}
        subtitle={t("cards.activeProductsSubtitle", {
          count: productData.activeCount,
        })}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  )
}
type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  )
}
