'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"
import { useHeaderFooterContext } from "@/contexts/HeaderFooter"
import { IHeaderFooter } from "@/interfaces/intl"
import LanguageSwitcher from "./languageSwitcher"
import { headerFooterIntl } from '@/utils/intl'
import {
    getRegisterCreatedsByCompany,
    getVerifierCreatedsByAddress
} from "@/utils/verificationTasks"
import { useIdentityContext } from "@/contexts/Identity"
import HeaderMenuButton from "@/app/[locale]/components/headers/HeaderMenuButton"


const Headers = () => {
    // contexts
    const { address, isConnected } = useAccount()
    const { headerOn } = useHeaderFooterContext()
    const { setIsCompany, setIsVerifier, isVerifier, isCompany } = useIdentityContext()

    // states
    const [scrolling, setScrolling] = useState(false)

    // utils
    const headerIntl: IHeaderFooter = headerFooterIntl()

    /**
     * Update header on scrolling
     */
    const handleScroll = () => {
        // scroll > 10%
        if (window.scrollY > (document.body.clientHeight - window.innerHeight) * 0.1)
            setScrolling(true)
        else
            setScrolling(false)
    }

    const handleCompanyAccount = () => {
        getRegisterCreatedsByCompany(address as `0x${string}`,)
            .then((registerCreated) => {
                if (registerCreated.length > 0) {
                    setIsCompany(true)
                }
            })
    }

    const handleVerifierAccount = () => {
        getVerifierCreatedsByAddress([address as `0x${string}`],)
            .then((verifierCreated) => {
                if (verifierCreated.length > 0) {
                    setIsVerifier(true)
                }
            })
    }

    useEffect(() => {
        setIsCompany(false)
        setIsVerifier(false)

        if(isConnected) {
            handleCompanyAccount()
            handleVerifierAccount()
        }
    }, [isConnected, address]);

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isConnected, address, usePathname()])

    return (
        <header>
            {headerOn && (
                <div className={`${scrolling 
                    ? "bg-teal-50/80 bg-gradient-to-br from-indigo-600/20 via-fuchsia-500/20 to-indigo-500/20 \
                        backdrop-blur-sm shadow-xl ease-in-out duration-300" 
                    : "bg-transparent ease-in-out duration-300"} 
                    fixed top-0 left-0 w-full z-10 mb-20 text-sm`}>

                    <nav className="flex flex-row justify-between text-center p-3">
                        <div className="md:w-full mr-3">
        
                            <div className="flex flex-row">
                                {/* Home button */}
                                <div className="flex flex-row">
                                    <Link className="bg-fuchsia-600/90 text-slate-100
                                        p-2 shadow-lg rounded font-medium
                                        transition ease-in-out delay-100 duration-100 hover:scale-105" 
                                        href="/"><span>RS+</span>
                                    </Link>
                                </div>

                                {/* Show registers link */}
                                <div className="flex flex-row justify-end w-full">
                                    <Link className="text-slate-700 p-2 font-medium hidden md:block
                                        transition ease-in-out delay-100 duration-100
                                        border-b hover:border-gray-900/10 border-transparent"
                                          href="/"><span className="">{headerIntl.home}</span>
                                    </Link>

                                    <Link className="text-slate-700 p-2 font-medium hidden md:block
                                        transition ease-in-out delay-100 duration-100
                                        border-b hover:border-gray-900/10 border-transparent" 
                                        href="/register"><span className="">{headerIntl.register}</span>
                                    </Link>
            
                                    {/* Members link */}
                                    {isConnected && isCompany  && (
                                        <Link className="text-slate-700 p-2 font-medium hidden md:block 
                                            transition ease-in-out delay-100 duration-100
                                            border-b hover:border-gray-900/10 border-transparent" 
                                            href="/company"><span>{headerIntl.company}</span>
                                        </Link>
                                    )}
                                    {isConnected && isVerifier  && (
                                        <Link className="text-slate-700 p-2 font-medium hidden md:block
                                            transition ease-in-out delay-100 duration-100
                                            border-b hover:border-gray-900/10 border-transparent"
                                              href="/verifier"><span>{headerIntl.verifier}</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Connection Metamask */}
                        <div className="flex flex-row items-center">
                            <LanguageSwitcher />
        
                            {isConnected
                                ? (<HeaderMenuButton />)
                                : (<div className="flex items-center justify-center min-w-[150px]"><ConnectButton /></div>)
                            }
                        </div>
                    </nav>
                </div>
            )}
        </header>
    )
}
export default Headers