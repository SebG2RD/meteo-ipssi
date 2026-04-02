import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center gap-1 py-6">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Page précédente"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          type="button"
          variant={currentPage === page ? "default" : "outline"}
          size="icon-sm"
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Page suivante"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export default Pagination;
