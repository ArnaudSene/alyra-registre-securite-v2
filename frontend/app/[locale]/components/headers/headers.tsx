'use client'

import LanguageSwitcher from "./languageSwitcher"
import Link from 'next/link'
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { IHeaderFooter } from "@/interfaces/intl"
import { headerFooterIntl } from '@/utils/intl'
import { useHeaderFooterContext } from "@/contexts/HeaderFooter"


const Headers = () => {
    const { isConnected } = useAccount()
    const { headerOn } = useHeaderFooterContext()
    const [toggle, setToggle] = useState(false)
    const [scrolling, setScrolling] = useState(false);
    const headerIntl: IHeaderFooter = headerFooterIntl()
    
    useEffect(() => {
        setToggle(false)

        // Update header on scrolling
        const handleScroll = () => {
            // scroll > 10%
            if (window.scrollY > (document.body.clientHeight - window.innerHeight) * 0.1) {
              setScrolling(true);
            } else {
              setScrolling(false);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };

    }, [isConnected, usePathname()])

    return (
        <header>
            {headerOn && (
                <div className={`${scrolling ? "bg-teal-50/80 bg-gradient-to-br from-indigo-600/20              via-fuchsia-500/20 to-indigo-500/20 backdrop-blur-sm shadow-xl ease-in-out duration-300" : "bg-transparent ease-in-out duration-300"} fixed top-0 left-0 w-full z-50 mb-20`}>
                    <nav className="flex flex-row justify-between text-center p-3">
                        <div className="md:w-full mr-3">
        
                            <div className="flex flex-row">
                                {/* Home */}
                                <div className="flex flex-row">
                                    <Link className="bg-fuchsia-600/90 text-slate-100
                                        p-2 shadow-lg rounded font-medium
                                        transition ease-in-out delay-100 duration-100 hover:scale-105" 
                                        href="/"><span>RS+</span>
                                    </Link>
                                </div>
                                {/* Show registers */}
                                <div className="flex flex-row justify-end w-full">
                                    <Link className="text-slate-700 p-2 font-medium hidden md:block 
                                        transition ease-in-out delay-100 duration-100
                                        border-b hover:border-gray-900/10 border-transparent" 
                                        href="/register"><span className="">{headerIntl.register}</span>
                                    </Link>
            
                                    {/* Members */}
                                    {isConnected && (
                                        <Link className="text-slate-700 p-2 font-medium hidden md:block 
                                            transition ease-in-out delay-100 duration-100
                                            border-b hover:border-gray-900/10 border-transparent" 
                                            href="/member"><span>{headerIntl.member}</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                
        
                        {/* Connection Metamask */}
                        <div className="flex flex-row items-center">
                            <LanguageSwitcher />
        
                            {isConnected
                                ? (
                                    <div>
                                        <div onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                            {!toggle
                                                ? (
                                                    // Show menu
                                                    <div className="bg-gradient-to-br from-indigo-700 via-indigo-700 to-indigo-500
                                                        text-slate-100
                                                        flex flex-row justify-between
                                                        p-2 shadow-lg rounded font-medium cursor-pointer
                                                        transition ease-in-out delay-100 duration-100 hover:scale-105"> 

                                                        {/* icon bars-3 */}
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                                            className="w-6 h-6 stroke-slate-100">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                                        </svg>
                                                    </div>
                                                ) : (
                                                    // Hide menu
                                                    <div className="bg-gradient-to-br from-indigo-700 via-indigo-700 to-indigo-500
                                                        text-slate-100
                                                        flex flex-row justify-between
                                                        p-2 shadow-lg rounded font-medium cursor-pointer
                                                        transition ease-in-out delay-100 duration-100 hover:scale-105"
                                                    >
                                                        {/* icon cross */}
                                                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                                            className="w-6 h-6 stroke-slate-100">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </div>
                                                )
                                            }
                                        </div>
            
                                        <div className={`${toggle ? '' : 'hidden'} 
                                            bg-indigo-950/90
                                            absolute w-full left-0 p-6 sidebar top-[64px] z-20 `}>

                                            {/* Connect Wallet */}
                                            <div className="flex justify-center">
                                                <ConnectButton accountStatus='address' chainStatus="name" showBalance={false}/>
                                            </div>
            
            
                                            {/* Menu small media */}
                                            <div className="md:hidden mt-8 flex flex-col justify-end">
                                                <ul className="p-2 list-none border-t border-slate-500 flex flex-col justify-end items-center flex-1 text-slate-100">
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/register">{headerIntl.register}</Link>
                                                    </li>
            
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/member">{headerIntl.member}</Link>
                                                    </li>
                                                    
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/subscriptionCompany">{headerIntl.companySubscription}</Link>
                                                    </li>

                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/subscriptionVerifier">{headerIntl.verifierSubscription}</Link>
                                                    </li>
            
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/company">{headerIntl.company}</Link>
                                                    </li>
            
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/verifier">{headerIntl.verifier}</Link>
                                                    </li>
                                                </ul>
            
                                                <ul className="p-2 list-none border-t border-slate-500 flex flex-col justify-end items-center flex-1 text-slate-100">
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <a href="mailto:arnaud.sene@pm.me">{headerIntl.support}</a>
                                                    </li>
            
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/faq"><span>{headerIntl.faq}</span></Link>
                                                    </li>
                                                    
                                                    <li className="py-1 font-normal cursor-pointer">
                                                        <Link href="/documentation"><span>{headerIntl.documentation}</span></Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )                                
                                : (
                                    <div className="flex items-center justify-center min-w-[150px]">
                                        <ConnectButton />
                                    </div>
                                )
                            }
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
export default Headers;