export const paths = {
  admin: {
    root: {
      getHref: () => "/admin",
    },
    products: {
      root: {
        getHref: () => "/admin/products",
      },
      new: {
        getHref: () => "/admin/products/new",
      },
      edit: {
        getHref: (id: string) => `/admin/products/${id}/edit`,
      },
    },
    categories: {
      root: {
        getHref: () => "/admin/categories",
      },
      new: {
        getHref: () => "/admin/categories/new",
      },
      edit: {
        getHref: (id: string) => `/admin/categories/${id}/edit`,
      },
    },
    orders: {
      root: {
        getHref: () => "/admin/orders",
      },
    },
  },

  app: {
    root: {
      getHref: () => "/",
    },
    products: {
      root: {
        getHref: () => "/products",
      },
      purchase: {
        getHref: (id: string) => `/products/${id}/purchase`,
      },
    },
    orders: {
      root: {
        getHref: () => "/orders",
      },
    },
    stripe: {
      purchaseSuccess: {
        getHref: () => "/stripe/purchase-success",
      },
    },
  },
} as const
