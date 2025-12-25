import "dotenv/config"

import { hash } from "bcryptjs"

import { env } from "@/config/env"
import db from "@/lib/db"

import { Role } from "./generated/prisma/enums"

async function main() {
  // Clean up existsing data
  // await db.orderItem.deleteMany()
  await db.order.deleteMany()
  await db.product.deleteMany()
  await db.category.deleteMany()

  // Create Admin user for testing
  const password = await hash(env.ADMIN_PASSWORD ?? "password", 12)
  await db.user.upsert({
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
    { name: "ראשונות", imageUrl: "", imagePublicId: "" },
    { name: "עיקריות", imageUrl: "", imagePublicId: "" },
    { name: "קינוחים", imageUrl: "", imagePublicId: "" },
    { name: "שתייה", imageUrl: "", imagePublicId: "" },
    { name: "סלטים", imageUrl: "", imagePublicId: "" },
  ]

  const categories = []

  for (const cat of categoriesData) {
    const category = await db.category.create({ data: cat })
    categories.push(category)
  }

  const [appetizers, mainCourses, desserts] = categories

  // Create products
  const productsData = [
    {
      name: "המבורגר",
      slug: "hamburger",
      basePrice: 70,
      description: "המבורגר נדיר בשוק",
      categoryId: mainCourses.id,
      images: [
        {
          url: "https://res.cloudinary.com/dexzucg7a/image/upload/v1766057709/products/x4upbn9zchl06z6jd1rt.jpg",
          publicId: "products/x4upbn9zchl06z6jd1rt",
        },
      ],
      options: {
        create: [
          {
            name: "מידת עשייה",
            values: [
              { name: "M", extraPrice: 0 },
              { name: "MW", extraPrice: 0 },
              { name: "WD", extraPrice: 0 },
            ],
          },
        ],
      },
    },
    {
      name: "צ׳יזבורגר",
      slug: "cheeseburger",
      basePrice: 77,
      description: "צ׳יזבורגר עם גבינה",
      categoryId: mainCourses.id,
      images: [
        {
          url: "https://res.cloudinary.com/dexzucg7a/image/upload/v1766057867/products/eqleq3f0zuhk5gifgq4c.jpg",
          publicId: "products/eqleq3f0zuhk5gifgq4c",
        },
      ],
    },
    {
      name: "צ׳יפס",
      slug: "chips",
      basePrice: 24,
      description: "צ׳יפס נדיר",
      categoryId: appetizers.id,
      images: [
        {
          url: "https://res.cloudinary.com/dexzucg7a/image/upload/v1766058043/products/z7ekt9wnl46dgkhzwxdg.jpg",
          publicId: "products/z7ekt9wnl46dgkhzwxdg",
        },
      ],
    },
    {
      name: "טבעות בצל",
      slug: "lilzy",
      basePrice: 26,
      description: "טבעות בצל נדירות",
      categoryId: appetizers.id,
      images: [
        {
          url: "https://res.cloudinary.com/dexzucg7a/image/upload/v1766058110/products/lilzyflbzuj9h7z3givd.jpg",
          publicId: "products/lilzyflbzuj9h7z3givd",
        },
      ],
    },
    {
      name: "גלידה",
      slug: "ice-cream",
      basePrice: 3.99,
      description: "הגלידה הגדול",
      categoryId: desserts.id,
      images: [
        {
          url: "https://res.cloudinary.com/dexzucg7a/image/upload/v1766058179/products/zb74kk1lzx2fns1rnkb5.jpg",
          publicId: "products/zb74kk1lzx2fns1rnkb5",
        },
      ],
    },
  ]

  for (const product of productsData) {
    await db.product.create({ data: product })
  }

  console.log("Data has been seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
