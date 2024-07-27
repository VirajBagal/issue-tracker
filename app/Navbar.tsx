import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai"

const Navbar = () => {
    const navbarOptions = [
        { name: 'Dashboard', href: '/' },
        { name: 'Issues', href: '/issues' }
    ]
    return (
        <nav className="flex space-x-3 border-b px-4 h-12 items-center mb-8">
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-3'>
                {
                    navbarOptions.map(option => (
                        <Link key={option.href} className='text-zinc-300 hover:text-zinc-800 transition-colors' href={option.href}>{option.name}</Link>
                    )
                    )
                }
            </ul>
        </nav>
    )
}

export default Navbar