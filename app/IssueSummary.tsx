import { Status } from '@prisma/client';
import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link';
import prisma from '@/prisma/client';

async function getIssueCounts() {
  const statuses = Object.values(Status);
  const counts = await Promise.all(
    statuses.map(async (status) => ({
      status,
      count: await prisma.issue.count({ where: { status } }),
    }))
  );
  return counts;
}

export default async function IssueSummary() {
  const issueCounts = await getIssueCounts();
  const statusLabels: {status: Status, label: string}[] = [
    { status: 'OPEN', label: 'Open Issues' },
    { status: 'IN_PROGRESS', label: 'In Progress Issues' },
    { status: 'DONE', label: 'Closed Issues' },
  ];

  const summaryData = statusLabels.map(({ status, label }) => ({
    status,
    label,
    count: issueCounts.find(count => count.status === status)?.count || 0,
  }));

  return (
    <div className="grid grid-cols-3 gap-4">
      {summaryData.map(({ status, label, count }) => (
        <Card key={status} mb="2">
          <Link href={`/issues/list?status=${status}`} className="block p-4 text-xl font-semibold">
            {label}
            
          </Link>
          <Text className="text-3xl font-bold">
          {count}
          </Text>
        </Card>
      ))}
    </div>
  );
}
