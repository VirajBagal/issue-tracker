'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box, Flex, Container, DropdownMenu, Avatar, Text } from '@radix-ui/themes';

const Navbar = () => {

    return (
        <nav className="border-b px-4 py-4 mb-5">
            <Container>
                <Flex justify='between'>
                    <NavLink />
                    <AuthStatus />
                </Flex>
            </Container>
        </nav >
    )
}

const NavLink = () => {
    const path = usePathname()
    const navbarOptions = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues/list' }
    ]
    return (
        <Flex gap='3' align='center'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-3'>
                {
                    navbarOptions.map(option => (
                        <li key={option.href}>
                            <Link className={classNames({
                                'text-zinc-500': path !== option.href,
                                '!text-zinc-800': path === option.href,
                                'hover:text-zinc-800 transition-colors': true
                            }

                            )} href={option.href} > {option.name}</Link></li>
                    )
                    )
                }
            </ul>
        </Flex>)
}

const AuthStatus = () => {
    const { status, data: session } = useSession();
    if (status === 'loading') return null
    if (status === 'unauthenticated') return <Box><Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href='/api/auth/signin'>Sign in</Link></Box>

    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback="?" size="2" radius='full' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size="2">
                            {session!.user!.name!}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Sign out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}
export default Navbar