'use client';

import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;

}
const newIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const onSubmit = async (data: IssueForm) => {
        await axios.post('/api/issues', data)
        router.push('/issues')

    }
    return (
        <form className='max-w-xl px-4 space-y-3' onSubmit={handleSubmit(onSubmit)}>
            <TextField.Root>
                <TextField.Input placeholder="Title" {...register('title')} />
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <SimpleMDE {...field} placeholder="Write issue description" />
                )
                }
            />
            <Button>Submit New Issue</Button>
        </form >
    )
}

export default newIssuePage