'use client';

import { TextField, Button, Callout, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod'
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

type IssueForm = z.infer<typeof createIssueSchema>
const newIssuePage = () => {
    const [error, setError] = useState('')
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const onSubmit = async (data: IssueForm) => {
        try {
            await axios.post('/api/issues', data)
            router.push('/issues')

        } catch (error) {
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
                    <TextField.Input placeholder="Title" {...register('title')} />
                </TextField.Root>
                {errors.title && <Text color='red' as='p'> {errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE {...field} placeholder="Write issue description" />
                    )
                    }
                />
                {errors.description && <Text color='red' as='p'> {errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form >
        </div>
    )
}

export default newIssuePage