export type PaginatedResult<T> = {
  data: T[]
  metadata: {
    total: number
    page: number
    pageSize: number
    totalPages: number
    hasNextPage: boolean
    hasPreviousPage: boolean
  }
}
