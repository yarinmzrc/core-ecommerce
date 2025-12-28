export const paths = {
  admin: {
    root: {
      getHref: () => "/admin",
    },
    login: {
      getHref: () => "/admin/login",
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
    optionTemplates: {
      root: {
        getHref: () => "/admin/option-templates",
      },
      new: {
        getHref: () => "/admin/option-templates/new",
      },
      edit: {
        getHref: (id: string) => `/admin/option-templates/${id}/edit`,
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
    },
    categories: {
      getHref: () => "/categories",
    },
    category: {
      getHref: (id: string) => `/categories/${id}`,
    },
    orders: {
      root: {
        getHref: () => "/orders",
      },
    },
    purchaseSuccess: {
      getHref: () => "/purchase-success",
    },
  },
} as const
