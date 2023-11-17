'use client'

import Link from "next/link"
import React, { useState } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'

const LanguageSwitcher = () => {
    const [toggle, setToggle] = useState(false)
    const pathname: string = usePathname().split('/').slice(2).join('/')
    const { isConnected } = useAccount()
    
    return (
        <div className="mr-2">
            {/* Show language */}
            <div onClick={() => setToggle((prevToggle) => !prevToggle)} 
                className="cursor-pointer bg-fuchsia-600/90 text-slate-100 w-10
                            p-2 shadow-lg rounded font-medium
                            transition ease-in-out delay-100 duration-100 hover:scale-105"
            >
                {useLocale().toUpperCase()}
            </div>

            {/* Language selection menu */}
            <div className={`
                ${toggle ? '' : 'hidden'}
                bg-indigo-950/90 py-2
                absolute w-full left-0 md:w-12 md:left-auto md:right-[163px] ${isConnected ? 'md:right-[56px]' : ''} 
                sidebar top-[64px] z-20`}
            >
                <div className='text-slate-100'>
                    <ul>
                        <li>
                            <Link href={'/en/'.concat(pathname)} locale="en">EN</Link>
                        </li>
                        <li>
                            <Link href={'/fr/'.concat(pathname)} locale="fr">FR</Link>
                        </li>
                    </ul>        
                </div>
            </div>
        </div>
    )
}

export default LanguageSwitcher
