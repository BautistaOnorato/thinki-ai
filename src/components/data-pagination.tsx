import { Button } from "@/components/ui/button"

interface DataPaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

// TODO: Dont let user go to a page that doesn't exist by changing the URL
export const DataPagination = ({ page, totalPages, onPageChange }: DataPaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page === 1}
          variant={"outline"}
          size={"sm"}
          onClick={() => onPageChange(Math.max(page - 1, 1))}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0}
          variant={"outline"}
          size={"sm"}
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}