import { Card, Flex } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgressIssues = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const doneIssues = await prisma.issue.count({ where: { status: 'DONE' } });

  return (
    <Flex direction="column" gap="4">
        <IssueChart 
          open={openIssues}
          inProgress={inProgressIssues}
          done={doneIssues}
        />
    </Flex>
  );
}