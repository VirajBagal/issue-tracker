import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { authOptions } from "@/app/auth/AuthOptions";
import { getServerSession } from 'next-auth'
import AssigneeSelect from './AssigneeSelect'
import { Metadata } from 'next';

interface Props {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

  return {
    title: issue ? `Issue ${issue.id} - ${issue.title}` : 'Issue Not Found',
    description: issue ? `Details for issue #${issue.id}` : 'The requested issue could not be found.',
  };
}

const IssueDetailsPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions);
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
            {session && <Box>
                <Flex gap="2" direction='column'>
                    <AssigneeSelect 
                        issueId={issue.id} 
                        assignedToUserId={issue.assignedToUserId}
                    />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </Flex>
            </Box>}
        </Grid>

    )
}

export default IssueDetailsPage