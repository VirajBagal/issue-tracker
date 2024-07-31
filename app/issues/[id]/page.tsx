import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props {
    params: { id: string }
}
const IssueDetailsPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue)
        notFound();

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="2">
                <IssueStatusBadge status={issue.status} />
                <p>{issue.createdAt.toLocaleDateString()}</p>
            </Flex>
            <Card>{issue.description}</Card>
        </div>

    )
}

export default IssueDetailsPage