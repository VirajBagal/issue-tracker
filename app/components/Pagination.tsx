import React from 'react';
import { Button } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalIssues: number
}

export function Pagination({ currentPage, pageSize, totalIssues }: PaginationProps) {
  const totalPages = Math.ceil(totalIssues / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        color="gray"
        disabled={isFirstPage}
      >
         <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        disabled={isFirstPage}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={isLastPage}
        color="gray"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        disabled={isLastPage}
        color="gray"
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
}