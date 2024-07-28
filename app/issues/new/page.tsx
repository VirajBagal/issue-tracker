'use client';

import { TextField, Button } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const newIssuePage = () => {
    return (
        <div className='max-w-xl px-4 space-y-3'>
            <TextField.Root>
                <TextField.Input placeholder="Title" />
            </TextField.Root>
            <SimpleMDE placeholder="Write issue description" />
            <Button>Submit New Issue</Button>
        </div >
    )
}

export default newIssuePage