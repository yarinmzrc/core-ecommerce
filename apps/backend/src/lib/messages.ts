"use server"

import twilio from "twilio"

import { CartProduct } from "@/stores/cart-store"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

function generateItemsForMessage(items: CartProduct[]) {
  return `
    ${items
      .map(
        (item) =>
          `${item.quantity}x ${item.name} - $${item.price.toFixed(2)} each`,
      )
      .join("\n")}
    `
}

export async function createMessage(items: CartProduct[]) {
  try {
    const message = await client.messages.create({
      contentSid: "HX427b3a36f3f09ff1b958ecb89228c479",
      contentVariables: JSON.stringify({ 1: generateItemsForMessage(items) }),
      from: "whatsapp:+14155238886",
      to: "whatsapp:+972509334416",
    })

    console.log(message)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
