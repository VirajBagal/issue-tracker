'use client';

import React from 'react';
import { Button } from '@radix-ui/themes'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalIssues: number
}

export function Pagination({ currentPage, pageSize, totalIssues }: PaginationProps) {
  const totalPages = Math.ceil(totalIssues / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const router = useRouter();
  const searchParams = useSearchParams()
  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }
  

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        color="gray"
        disabled={isFirstPage}
        onClick={() => changePage(1)}
      >
         <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        disabled={isFirstPage}
        onClick={() => changePage(currentPage - 1)}>
        <ChevronLeftIcon />
      </Button>
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={isLastPage}
        color="gray"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        disabled={isLastPage}
        color="gray"
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </div>
  );
}