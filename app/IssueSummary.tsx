import { Status } from '@prisma/client';
import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link';

interface IssueChartProps {
    open: number;
    inProgress: number;
    done: number;
  }

export default async function IssueSummary( { open, inProgress, done }: IssueChartProps) {
  const summaryData: {status: Status, label: string, count: number}[] = [
    { status: 'OPEN', label: 'Open Issues', count: open },
    { status: 'IN_PROGRESS', label: 'In Progress Issues', count: inProgress },
    { status: 'DONE', label: 'Closed Issues', count: done },
  ];

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
