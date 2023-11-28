"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import React, { useState } from "react"
import { headerFooterIntl } from "@/utils/intl"
import { IHeaderFooter } from "@/interfaces/intl"

export const HeaderMenuButton = () => {
    // states
    const [toggle, setToggle] = useState(false)

    // utils
    const headerIntl: IHeaderFooter = headerFooterIntl()

    return (
        <>
            <div className={`text-sm`}>
                <div onClick={() => setToggle((prevToggle) => !prevToggle)}>
                    {!toggle
                        ? (
                            // Show menu
                            <div className="bg-gradient-to-br from-indigo-700 via-indigo-700 to-indigo-500
                                text-slate-100
                                flex flex-row justify-between
                                p-2 shadow-lg rounded font-medium cursor-pointer
                                transition-all ease-in-out delay-100 duration-100 hover:scale-105">

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
                                transition-all ease-in-out delay-100 duration-100 hover:scale-105"
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

                <div className={`${toggle ? '' : 'menuDisappearBottom opacity-0'} 
                    bg-indigo-950/90 text-slate-100 text-sm absolute w-full h-screen
                    lg:h-fit left-0 top-[64px] z-20 opacity-1 menuAppearsTop transition ease-in-out delay-200 duration-200`}>
                    <div className="flex justify-center p-4">
                        <ConnectButton accountStatus='address' chainStatus="name" showBalance={false}/>
                    </div>

                    <div className={`lg:grid grid-cols-3 p-1 my-2`}>
                        <div>
                            <div className={`font-bold text-base py-2`}>{headerIntl.products}</div>
                            <div className={`flex flex-col border-t border-slate-500`}>
                                {/*Register*/}
                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                         onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/register">{headerIntl.register}</Link></span>
                                    </div>
                                </div>

                                {/*Company*/}
                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/subscriptionCompany">{headerIntl.companySubscription}</Link></span>
                                    </div>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/company">{headerIntl.company}</Link></span>
                                    </div>
                                </div>

                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/subscriptionVerifier">{headerIntl.verifierSubscription}</Link></span>
                                    </div>

                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/verifier">{headerIntl.verifier}</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`font-bold text-base py-2`}>{headerIntl.support}</div>
                            <div className={`flex flex-col border-t border-slate-500`}>
                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>

                                        <span className={`p-1`}><a href="mailto:arnaud.sene@pm.me">{headerIntl.support}</a></span>
                                    </div>
                                </div>
                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/faq"><span>{headerIntl.faq}</span></Link></span>
                                    </div>
                                </div>
                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                             className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/documentation"><span>{headerIntl.documentation}</span></Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`font-bold text-base py-2`}>{headerIntl.developer}</div>
                            <div className={`flex flex-col border-t border-slate-500`}>

                                <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                    <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}
                                        onClick={() => setToggle((prevToggle) => !prevToggle)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                            className="w-5 h-7">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                        </svg>
                                        <span className={`p-1`}><Link href="/helper">{headerIntl.helper}</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderMenuButton