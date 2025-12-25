export { default } from "next-intl/middleware"

export const config = {
  matcher: ["/admin((?!login).*)"],
}
