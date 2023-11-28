'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation' 
import { SubscribeCompany } from "@/app/[locale]/components/company/SubscribeCompany"
import { SubscribeVerifier } from "@/app/[locale]/components/verifier/SubscribeVerifier"


const Subscription = () => {
    const searchParams = useSearchParams()
    const name: string | null = searchParams.get('name')   

    return (
        <div className="pb-10 pt-16 z-10 flex flex-col">
            <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between w-full pt-2 md:pt-4">
                    {(!name || name === 'company') && (<SubscribeCompany />)}
                    {(!name || name === 'verifier') && (<SubscribeVerifier />)}
                </div>
            </div>
        </div>
  )
}

export default Subscription