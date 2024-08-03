'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes';

const Navbar = () => {
    const { status, data: session } = useSession();
    const path = usePathname()
    const navbarOptions = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues/list' }
    ]
    return (
        <nav className="flex space-x-3 border-b px-4 h-12 items-center mb-8">
            <Link href="/"><AiFillBug /></Link>
            {/* text-zinc-300 hover:text-zinc-800' */}
            <ul className='flex space-x-3'>
                {
                    navbarOptions.map(option => (
                        <li key={option.href}>
                            <Link className={classNames({
                                'text-zinc-300': path !== option.href,
                                'text-zinc-800': path === option.href,
                                'hover:text-zinc-800 transition-colors': true
                            }

                            )} href={option.href} > {option.name}</Link></li>
                    )
                    )
                }
            </ul>
            <Box>
                {status === 'authenticated' && <Link href='/api/auth/signout'>Sign out</Link>}
                {status === 'unauthenticated' && <Link href='/api/auth/signin'>Sign in</Link>}
            </Box>

        </nav >
    )
}

export default Navbar