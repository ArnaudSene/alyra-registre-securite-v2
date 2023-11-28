'use client'

import React from "react"
import { useRouter } from 'next/navigation'

export const AppLogo = () => {
    const { push } = useRouter()

    return (
        <div className="pb-2 w-full md:w-1/3 mx-auto hover:underline hover:decoration-cyan-400">
            <div className={`text-center text-lg md:text-xl no-underline cursor-pointer`} onClick={() => push('/')}>
                <div className="flex flex-row ">
                    <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                             className="hidden md:flex w-5 h-5 mt-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </div>

                    <div className="mx-auto md:mx-0 md:pl-2">
                        <span className={`font-semibold text-rose-500`}>Registre de sécurité</span>
                        <span className="pl-2 text-cyan-400 italic">RS+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}