import "dotenv/config"

import { hash } from "bcryptjs"

import { AppType } from "@/config/app/app-type.config"
import { OptionPricingStrategy } from "@/config/app/option-templates"
import {
  OptionInput,
  OptionTemplateCreateDTO,
  OptionUI,
} from "@/features/option-templates/dtos"
import db from "@/lib/db"
import { env } from "@/config/env"
import { Role } from "./generated/prisma/enums"

async function main() {
  // Clean up existsing data
  await db.order.deleteMany()
  await db.user.deleteMany()
  await db.product.deleteMany()
  await db.category.deleteMany()
  await db.optionTemplate.deleteMany()

  // Create Admin user for testing
  const password = await hash(env.ADMIN_PASSWORD ?? "password", 12)
  await db.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      passwordHash: password,
      role: Role.SUPER_ADMIN,
    },
  })

  // Create Option Templates
  const optionTemplates: OptionTemplateCreateDTO[] = [
    {
      name: "מידת עשייה",
      appType: AppType.FOOD,
      inputType: OptionInput.TEXT,
      uiType: OptionUI.SELECT,
      pricingStrategy: OptionPricingStrategy.NONE,
      values: [
        {
          label: "M",
          value: "M",
        },
        {
          label: "MW",
          value: "MW",
        },
        {
          label: "WD",
          value: "WD",
        },
      ],
      isActive: true,
      required: true,
    },
  ]

  for (const optionTemplate of optionTemplates) {
    await db.optionTemplate.create({ data: optionTemplate })
  }

  const optionTemplate = await db.optionTemplate.findFirst({
    where: { name: "מידת עשייה" },
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
        create: {
          name: optionTemplate!.name,
          templateId: optionTemplate!.id,
        },
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
