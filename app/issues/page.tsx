import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    return (
        <div>
            <div className='mb-4'>
                <Button>
                    <Link href={"/issues/new"}>Create new issue</Link>
                </Button>
            </div>
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue =>
                        <Table.Row key={issue.id}>
                            <Table.Cell>{issue.title}</Table.Cell>
                            <Table.Cell>{issue.status}</Table.Cell>
                            <Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table.Root>
        </div>

    )
}

export default IssuesPage