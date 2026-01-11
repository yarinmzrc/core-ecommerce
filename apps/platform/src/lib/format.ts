export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency: "ILS",
  }).format(amount)
}

export function formatNumber(amount: number) {
  return new Intl.NumberFormat("he-IL").format(amount)
}
