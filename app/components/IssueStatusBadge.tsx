import React from 'react'
import { Badge } from '@radix-ui/themes'
import { Status } from '@prisma/client'

interface Props {
    status: Status
}

const statusMapper: Record<Status, { label: string, color: 'red' | 'violet' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In progress', color: 'violet' },
    DONE: { label: 'Resolved', color: 'green' },

}
const IssueStatusBadge = ({ status }: Props) => {
    return (
        <div>
            <Badge color={statusMapper[status].color}>{statusMapper[status].label}</Badge>
        </div>
    )
}

export default IssueStatusBadge