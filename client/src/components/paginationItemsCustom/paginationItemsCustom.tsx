import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

interface RenderPaginationItemsProps {
  total: number;
  limit: number;
  skip: number;
  handlePaginationItem: (page: number) => void;
}

const RenderPaginationItems: React.FC<RenderPaginationItemsProps> = ({
  total,
  limit,
  skip,
  handlePaginationItem,
}) => {
  const totalPages = Math.ceil(total / limit);
  const pageNumbers = [];
  const maxPaginationItems = 3;

  if (totalPages <= maxPaginationItems) {
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(
        <PaginationItem className="cursor-pointer" key={i + 1}>
          <PaginationLink
            className={skip == i ? "bg-slate-200 dark:text-black" : ""}
            onClick={() => handlePaginationItem(i)}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    // 1 2 3 ...
    if (skip == 0) {
      for (let i = skip; i < skip + maxPaginationItems; i++) {
        pageNumbers.push(
          <PaginationItem className="cursor-pointer" key={i}>
            <PaginationLink
              className={skip == i ? "bg-slate-200 dark:text-black" : ""}
              onClick={() => handlePaginationItem(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
      pageNumbers.push(<PaginationEllipsis />);
      pageNumbers.push(<PaginationEllipsis />);
      // 1 2 3 ...
    } else if (skip > 0 && skip < maxPaginationItems - 1) {
      for (let i = skip - 1; i < skip + maxPaginationItems - 1; i++) {
        pageNumbers.push(
          <PaginationItem className="cursor-pointer" key={i}>
            <PaginationLink
              className={skip == i ? "bg-slate-200 dark:text-black" : ""}
              onClick={() => handlePaginationItem(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
      pageNumbers.push(<PaginationEllipsis />);
      pageNumbers.push(<PaginationEllipsis />);
      // ... 2 3 4 ...
    } else if (skip > 0 && skip + maxPaginationItems < totalPages) {
      pageNumbers.push(<PaginationEllipsis />);
      for (let i = skip - 1; i < skip + maxPaginationItems - 1; i++) {
        pageNumbers.push(
          <PaginationItem className="cursor-pointer" key={i}>
            <PaginationLink
              className={skip == i ? "bg-slate-200 dark:text-black" : ""}
              onClick={() => handlePaginationItem(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
      pageNumbers.push(<PaginationEllipsis />);
      // ... 4 5 6
    } else if (skip > 0 && skip <= totalPages) {
      pageNumbers.push(<PaginationEllipsis />);
      pageNumbers.push(<PaginationEllipsis />);
      for (let i = totalPages - maxPaginationItems; i < totalPages; i++) {
        pageNumbers.push(
          <PaginationItem className="cursor-pointer" key={i}>
            <PaginationLink
              className={skip == i ? "bg-slate-200 dark:text-black" : ""}
              onClick={() => handlePaginationItem(i)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
  }

  return <>{pageNumbers}</>;
};

export default RenderPaginationItems;
