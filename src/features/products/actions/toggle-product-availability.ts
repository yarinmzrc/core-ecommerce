"use server"

import { toggleProductAvailability } from "../dal/queries"

export async function toggleProductAvailabilityAction(
  productId: string,
  isAvailableForSale: boolean,
) {
  return toggleProductAvailability(productId, isAvailableForSale)
}
