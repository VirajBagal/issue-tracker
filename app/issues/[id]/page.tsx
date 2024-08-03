import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'

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
        <Grid columns={{ initial: "1", sm: "5" }} gap="4">
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex gap="2" direction='column'>
                    <EditIssueButton issueId={issue.id.toString()} />
                    <DeleteIssueButton issueId={issue.id.toString()} />
                </Flex>
            </Box>
        </Grid>

    )
}

export default IssueDetailsPage