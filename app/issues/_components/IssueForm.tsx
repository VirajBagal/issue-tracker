'use client';

import { Button, Callout, TextField } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
// import SimpleMDE from "react-simplemde-editor";
import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueFormData = z.infer<typeof issueSchema>
const IssueForm = ({ issue }: { issue?: Issue }) => {
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const onSubmit = async (data: IssueFormData) => {
        try {
            setSubmitting(true)
            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues')
            // reset the router cache by refreshing. It lasts for 30 seconds on dynamic page and 5 minutes on static page
            router.refresh()

        } catch (error) {
            setSubmitting(false)
            setError("An unexpected error occurred")
        }

    }

    return (
        <div className='max-w-xl px-4 '>
            {
                error && <Callout.Root className='mb-4'>
                    <Callout.Text color='red'>{error}</Callout.Text>
                </Callout.Root>
            }
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register('title')} />
                </TextField.Root>
                <ErrorMessage> {errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => (
                        <SimpleMDE {...field} placeholder="Write issue description" />
                    )
                    }
                />
                <ErrorMessage> {errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>
                    {issue ? 'Edit Issue' : 'Submit New Issue'}{' '}{isSubmitting && <Spinner />}
                </Button>
            </form >
        </div >
    )
}

export default IssueForm