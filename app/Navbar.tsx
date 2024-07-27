'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import classNames from 'classnames'


const Navbar = () => {
    const path = usePathname()
    const navbarOptions = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' }
    ]
    return (
        <nav className="flex space-x-3 border-b px-4 h-12 items-center mb-8">
            <Link href="/"><AiFillBug /></Link>
            {/* text-zinc-300 hover:text-zinc-800' */}
            <ul className='flex space-x-3'>
                {
                    navbarOptions.map(option => (
                        <Link key={option.href} className={classNames({
                            'text-zinc-300': path !== option.href,
                            'text-zinc-800': path === option.href,
                            'hover:text-zinc-800 transition-colors': true
                        }

                        )} href={option.href} > {option.name}</Link>
                    )
                    )
                }
            </ul>
        </nav >
    )
}

export default Navbar