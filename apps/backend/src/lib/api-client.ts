import { toast } from "sonner"

import { env } from "@/config/env"

type RequestOptions = {
  method?: string
  headers?: Record<string, string>
  body?: any
  cookie?: string
  params?: Record<string, string | number | boolean | undefined | null>
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"],
): string {
  if (!params) return url

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null,
    ),
  )
  if (Object.keys(filteredParams).length === 0) return url
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>,
  ).toString()
  return `${url}?${queryString}`
}

export async function getServerCookies() {
  if (typeof window !== "undefined") return ""
  return import("next/headers").then(async ({ cookies }) => {
    try {
      const cookieStore = cookies()
      return (await cookieStore)
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ")
    } catch (error) {
      console.error("Failed to access cookies:", error)
      return ""
    }
  })
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {},
): Promise<ReturnType<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    params,
    cache = "no-store",
    next,
  } = options

  // Get cookies from the request when running on server
  let cookieHeader = cookie
  if (typeof window === "undefined" && !cookie) {
    cookieHeader = await getServerCookies()
  }

  const fullUrl = buildUrlWithParams(
    `${env.NEXT_PUBLIC_SERVER_URL}${url}`,
    params,
  )

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      cache,
      next,
    })

    const json = (await response.json()) as ReturnType<T>

    if (!json.success) {
      if (typeof window !== "undefined") {
        toast.error(json.error || "Something went wrong")
      }
    }

    return json
  } catch {
    return {
      success: false,
      error: "Network error",
    }
  }
}

type ReturnType<T> =
  | {
      success: true
      data: T
    }
  | {
      success: false
      error: string
    }

export const api = {
  get<T>(url: string, options?: RequestOptions) {
    return fetchApi<T>(url, { ...options, method: "GET" })
  },
  post<T>(url: string, body?: any, options?: RequestOptions) {
    return fetchApi<T>(url, { ...options, method: "POST", body })
  },
  put<T>(url: string, body?: any, options?: RequestOptions) {
    return fetchApi<T>(url, { ...options, method: "PUT", body })
  },
  patch<T>(url: string, body?: any, options?: RequestOptions) {
    return fetchApi<T>(url, { ...options, method: "PATCH", body })
  },
  delete<T>(url: string, options?: RequestOptions) {
    return fetchApi<T>(url, { ...options, method: "DELETE" })
  },
}
