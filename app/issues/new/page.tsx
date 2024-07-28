'use client';
import React from 'react'
import { TextField, TextArea, Button } from '@radix-ui/themes'

const newIssuePage = () => {
    return (
        <div className='max-w-xl px-4 space-y-3'>
            <TextField.Root>
                <TextField.Input placeholder="Title" />
            </TextField.Root>
            <TextArea placeholder="Write issue description" />
            <Button>Submit New Issue</Button>
        </div >
    )
}

export default newIssuePage