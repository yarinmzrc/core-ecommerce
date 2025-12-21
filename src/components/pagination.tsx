"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PaginatedResult } from "@/types/pagination"

type PaginationProps = {
  metadata: PaginatedResult<unknown>["metadata"]
  activePage: number
}

export function Pagination({ metadata, activePage = 1 }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(page))
    router.push(`?${params.toString()}`)
  }

  if (metadata.totalPages <= 1) return null

  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={metadata.hasPreviousPage ? `?page=${activePage - 1}` : "#"}
            onClick={(e) => {
              e.preventDefault()
              metadata.hasPreviousPage ? goToPage(activePage - 1) : null
            }}
          />
        </PaginationItem>
        {metadata.totalPages > 1 &&
          Array.from({ length: metadata.totalPages }, (_, i) => i + 1).map(
            (page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`?page=${page}`}
                  onClick={(e) => {
                    e.preventDefault()
                    goToPage(page)
                  }}
                  isActive={page === activePage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        <PaginationItem>
          <PaginationNext
            href={metadata.hasNextPage ? `?page=${activePage + 1}` : "#"}
            onClick={(e) => {
              e.preventDefault()
              metadata.hasNextPage ? goToPage(activePage + 1) : null
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
