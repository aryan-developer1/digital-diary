import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
  } from "../ui/pagination";
  
  const PaginationControls = ({ page, setPage, totalPages }: { page: number; setPage: (page: number) => void; totalPages: number }) => {
    console.log("ndsknfdskjg",page,totalPages)
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
            className="cursor-pointer"
              onClick={() => setPage(page - 1)}
             size="default"
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                size="default"
                isActive={i + 1 === page}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(i + 1);
                }}
              >
              {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
             className="cursor-pointer"
             onClick={() => setPage(page + 1)}
             size="default"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };
  
  export default PaginationControls;
  