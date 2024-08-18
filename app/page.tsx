import { Card, Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';
import LatestIssues from './LatestIssues';

export default async function Home() {
  const openIssues = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgressIssues = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const doneIssues = await prisma.issue.count({ where: { status: 'DONE' } });

  return (
    <Grid columns={{ initial: '1', md: '2' }}>
      <Flex direction="column" gap="4">
        <IssueSummary             
          open={openIssues}
          inProgress={inProgressIssues}
          done={doneIssues}
        />
        <IssueChart 
            open={openIssues}
            inProgress={inProgressIssues}
            done={doneIssues}
          />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}