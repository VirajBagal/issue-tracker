'use client';
import React, { useEffect, useState } from 'react'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';

const AssigneeSelect = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get('/api/users');
            return response.data;
        },
        staleTime: 1000 * 60,  // 1 minute
        retry: 3
    });

    if (error) return null;
    if (isLoading) return <Skeleton />;

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {
                        users?.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))
                    }
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect