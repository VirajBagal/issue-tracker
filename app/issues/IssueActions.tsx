import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssueActionsPage = () => {
    return (
        <div className='mb-4'>
            <Button>
                <Link href={"/issues/new"}>Create new issue</Link>
            </Button>
        </div>
    )
}

export default IssueActionsPage