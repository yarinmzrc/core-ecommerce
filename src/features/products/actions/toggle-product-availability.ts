"use server"

import { toggleProductAvailability } from "../dal/mutations"

export async function toggleProductAvailabilityAction(
  productId: string,
  isAvailableForSale: boolean,
) {
  return toggleProductAvailability(productId, isAvailableForSale)
}
