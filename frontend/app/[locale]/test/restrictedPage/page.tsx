"use client"
import React, { useEffect } from "react"
import { useIdentityContext } from "@/contexts/Identity"
import { useAccount } from "wagmi"
import RestrictArea from "@/app/[locale]/components/RestrictArea"

const TestRestrictedPage = () => {
    const { isConnected, address} = useAccount()
    const { isCompany, isVerifier} = useIdentityContext()

    const myFunc = () => {
        console.log("myFunc")
        if(isConnected) {
            if (isCompany) {
                console.log("company")
            } else if (isVerifier) {
                console.log("verifier")
            }
        } else {
            console.log('disconnected')
        }
    }

    useEffect(() => {
        myFunc()
    }, [isConnected, address]);

    return (
        <>
            <RestrictArea asCompany={true}>
                <div className={`p-2 bg-blue-500/50`}>
                    <p>Company: {isCompany.toString()}</p>
                    <p>Verifier: {isVerifier.toString()}</p>
                </div>
            </RestrictArea>
        </>
    )
}
export default TestRestrictedPage