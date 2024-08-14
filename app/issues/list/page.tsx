import React from 'react'
import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { Link, IssueStatusBadge } from '@/app/components'
import IssueActionsPage from './IssueActions'
import { authOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from 'next-auth'
import { Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'

interface Props {
  searchParams: { 
    status: Status;
    orderBy: string;
    orderDirection: 'asc' | 'desc';
  }
}

const columns = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const IssuesPage = async ({ searchParams }: Props) => {
    const session = await getServerSession(authOptions);
    const status = Object.values(Status).includes(searchParams.status)
      ? searchParams.status
      : undefined;
    
    const orderBy = searchParams.orderBy || 'createdAt';
    const orderDirection = searchParams.orderDirection || 'desc';

    const issues = await prisma.issue.findMany({
      where: {
        status
      },
      orderBy: {
        [orderBy]: orderDirection
      }
    });

    return (
        <div>
            {session && <IssueActionsPage />}
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => (
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
                                <NextLink
                                    href={{
                                        query: { 
                                            ...searchParams,
                                            orderBy: column.value, 
                                            orderDirection: column.value === orderBy && orderDirection === 'asc' ? 'desc' : 'asc',
                                        }
                                    }}
                                    className="flex items-center gap-1"
                                >
                                    {column.label}
                                    {column.value === orderBy && (
                                        <ArrowUpIcon className={orderDirection === 'desc' ? 'transform rotate-180' : ''} />
                                    )}
                                </NextLink>
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue =>
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`} children={issue.title} />
                                <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export const dynamic = 'force-dynamic';
export default IssuesPage