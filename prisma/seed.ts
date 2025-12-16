import "dotenv/config"
import { hash } from "bcryptjs"
import { prisma } from "./client"
import { env } from "@/config/env"
import { Role } from "./generated/prisma/enums"

async function main() {
  // Clean up existsing data
  // await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Create Admin user for testing
  const password = await hash(env.ADMIN_PASSWORD ?? "password", 12)
  await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      passwordHash: password,
      role: Role.ADMIN,
    },
  })

  // Create categories
  const categoriesData = [
    { name: "Appetizers" },
    { name: "Main Courses" },
    { name: "Desserts" },
    { name: "Drinks" },
    { name: "Salads" },
  ]

  const categories = []

  for (const cat of categoriesData) {
    const category = await prisma.category.create({ data: cat })
    categories.push(category)
  }

  const [appetizers, mainCourses, desserts] = categories

  // Create products
  const productsData = [
    {
      name: "Cheeseburger",
      price: 5.99,
      description: "A Cheeseburger",
      categoryId: mainCourses.id,
      imagePath: "",
      imagePublicId: "",
    },
    {
      name: "Hamburger",
      price: 5.99,
      description: "A Hamburger",
      categoryId: mainCourses.id,
      imagePath: "",
      imagePublicId: "",
    },
    {
      name: "French Fries",
      price: 2.99,
      description: "French Fries",
      categoryId: appetizers.id,
      imagePath: "",
      imagePublicId: "",
    },
    {
      name: "Onion Rings",
      price: 3.99,
      description: "Onion Rings",
      categoryId: appetizers.id,
      imagePath: "",
      imagePublicId: "",
    },
    {
      name: "Ice Cream",
      price: 3.99,
      description: "Ice Cream",
      categoryId: desserts.id,
      imagePath: "",
      imagePublicId: "",
    },
  ]

  for (const product of productsData) {
    await prisma.product.create({ data: product })
  }

  console.log("Data has been seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
