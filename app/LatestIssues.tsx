import { Card, Flex, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { Avatar} from '@radix-ui/themes'
import prisma from '@/prisma/client'
import { IssueStatusBadge } from './components'

async function getLatestIssues() {
  return await prisma.issue.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      assignedToUser: {
        select: {
          image: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
}

export default async function LatestIssues() {
  const issues = await getLatestIssues()

  return (
    <Card className="p-5">
      <h2 className="text-xl font-semibold mb-4">Latest Issues</h2>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                </Flex>
                  {issue.assignedToUser && (
                    <Avatar
                      src={issue.assignedToUser.image!}
                      fallback="?"
                      size="4"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>

          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  )
}