"use client"

import React, { ReactNode, useEffect } from "react"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { IProfileAccount, IToasterMessages } from "@/interfaces/intl"
import { getProfileAccount, toasterMessages } from "@/utils/intl"


const RestrictArea = ({ children, asVerifier, asCompany }: {
    children: ReactNode,
    asVerifier?: boolean,
    asCompany?: boolean,
}) => {
    // context
    const { address, isConnected } = useAccount()
    const { setIsCompany, setCompany, setIsVerifier, setVerifier } = useIdentityContext()
    const { push } = useRouter()

    // utils
    const toast = useToast()
    const toasterMessagesIntl: IToasterMessages = toasterMessages()

    const unauthorized = (title: string, description: string, redirect: boolean = true, redirectPath?: string) => {
        toast({
            title: title,
            description: description,
            status: 'error',
            duration: 5000,
            isClosable: true,
        })
        if (redirect)
            push(redirectPath || "/")
    }

    const setProfileConnected = async (profileAccount: IProfileAccount) => {
        // Reset context
        setCompany({})
        setIsCompany(false)
        setVerifier({})
        setIsVerifier(false)

        if (profileAccount.isCompany && profileAccount.company) {
            setIsCompany(profileAccount.isCompany)
            setCompany(profileAccount.company)
        }

        if (profileAccount.isVerifier && profileAccount.verifier) {
            setIsVerifier(profileAccount.isVerifier)
            setVerifier(profileAccount.verifier)
        }
    }

    const checkRestrictions = (profileAccount: IProfileAccount) => {
        if (asCompany && !profileAccount.isCompany) {
            unauthorized(
                toasterMessagesIntl.unauthorizedTitle,
                toasterMessagesIntl.unauthorizedDescription
            )
        } else if (asVerifier && !profileAccount.isVerifier) {
            unauthorized(
                toasterMessagesIntl.unauthorizedTitle,
                toasterMessagesIntl.unauthorizedDescription
            )
        }
    }

    useEffect(() => {
        if (isConnected && address) {
            const handleRestrictions = () => {
                getProfileAccount(address)
                    .then((profileAccount) => {
                        setProfileConnected(profileAccount).then()
                        checkRestrictions(profileAccount)
                        console.log('Update context')
                    })
            }

            handleRestrictions()
        }
    }, [address, isConnected])

    return (
        <>
            {children}
        </>
    )
}
export default RestrictArea
