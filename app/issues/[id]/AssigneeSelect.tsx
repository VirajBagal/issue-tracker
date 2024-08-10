'use client';
import React from 'react'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '@/app/components/Skeleton';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    issueId: number;
    assignedToUserId: string | null;
}

const AssigneeSelect = ({ issueId, assignedToUserId }: Props) => {
    const router = useRouter();

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axios.get('/api/users');
            return response.data;
        },
        staleTime: 1000 * 60,  // 1 minute
        retry: 3
    });

    const assignIssue = async (userId: string) => {
        try {
            await axios.patch(`/api/issues/${issueId}`, { 
                assignedToUserId: userId === 'unassigned' ? null : userId 
            });
            toast.success('Issue updated successfully');
            router.refresh();
        } catch (error) {
            toast.error('Failed to update issue');
        }
    };

    if (error) return null;
    if (isLoading) return <Skeleton />;

    return (
        <>
        <Select.Root 
            onValueChange={assignIssue} 
            defaultValue={assignedToUserId || 'unassigned'}
        >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    <Select.Item value="unassigned">Unassigned</Select.Item>
                    {users?.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
        <Toaster />
        </>
    )
}

export default AssigneeSelect