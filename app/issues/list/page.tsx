import React from 'react'
import prisma from '@/prisma/client'
import IssueActionsPage from './IssueActions'
import { authOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from 'next-auth'
import { Status } from '@prisma/client'
import { Pagination } from '@/app/components/Pagination'
import IssueTable, { columns } from './IssueTable'
import { Flex } from '@radix-ui/themes';

interface Props {
  searchParams: { 
    status: Status;
    orderBy: string;
    orderDirection: 'asc' | 'desc';
    page: string;
  }
}

const IssuesPage = async ({ searchParams }: Props) => {
    const session = await getServerSession(authOptions);
    const status = Object.values(Status).includes(searchParams.status)
      ? searchParams.status
      : undefined;
    
    const orderDirection = ['asc', 'desc'].includes(searchParams.orderDirection as string)
      ? searchParams.orderDirection as 'asc' | 'desc'
      : undefined;

    const orderBy = columns.some(column => column.value === searchParams.orderBy as string)
      ? searchParams.orderBy
      : undefined;


    const page = parseInt(searchParams.page) || 1;
    const pageSize = 5;

    const issues = await prisma.issue.findMany({
      where: {
        status
      },
      orderBy: {
        [orderBy!]: orderDirection
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const issueCount = await prisma.issue.count({ where: { status } });

    return (
        <Flex gap = '3' direction='column'>
            {session && <IssueActionsPage />}
            <IssueTable searchParams={searchParams} issues={issues} />
            <Pagination 
              currentPage={page} 
              pageSize={pageSize} 
              totalIssues={issueCount} 
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic';
export default IssuesPage