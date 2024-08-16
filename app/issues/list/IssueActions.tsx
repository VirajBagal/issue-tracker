import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import IssueStatusFilter from '@/app/issues/list/IssueStatusFilter'

const IssueActionsPage = () => {
    return (
        <div className='flex items-center justify-between'>
            <IssueStatusFilter />
            <Button>
                <Link href={"/issues/new"}>Create new issue</Link>
            </Button>
        </div>
    )
}

export default IssueActionsPage