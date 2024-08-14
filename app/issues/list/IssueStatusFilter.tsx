'use client';
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string; value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Done', value: 'DONE' },
]

const IssueStatusFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'all'}
      onValueChange={(status) => {
        const params = new URLSearchParams(searchParams);
        if (status === 'all') {
          params.delete('status');
        } else {
          params.set('status', status);
        }
        const query = params.toString() ? `?${params.toString()}` : '';
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value || 'all'} value={status.value || 'all'}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter