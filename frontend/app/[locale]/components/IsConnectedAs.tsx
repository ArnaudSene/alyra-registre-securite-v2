"use client"

import { useToast } from "@chakra-ui/react"
import React, { ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { IToasterMessages } from "@/interfaces/intl"
import { toasterMessages } from "@/utils/intl"
import {
    getRegisterCreatedsByCompany, getVerifierCreatedsByAddress
} from "@/utils/verificationTasks"


const IsConnectedAs = ({ children, asVerifier, asCompany }: {
    children: ReactNode,
    asVerifier?: boolean,
    asCompany?: boolean,
}) => {
    // context
    const { address, isConnected } = useAccount()
    const { setCompany, setVerifier, verifier, company } = useIdentityContext()
    const { push } = useRouter()

    // utils
    const toast = useToast()
    const toasterMessagesIntl: IToasterMessages = toasterMessages()
    const pathName = usePathname()

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

    useEffect(() => {
        console.log("useEffect verifier:", verifier, " company:", company)
        handleIsConnected()
    }, [address, isConnected])



    const handleIsConnected = () => {
        if (isConnected) {
            if(asCompany) {
                console.log('Company checking')
                getRegisterCreatedsByCompany(address as `0x${string}`,)
                    .then((registerCreated) => {
                        if (registerCreated.length > 0) {
                            setCompany(true)
                            console.log('company ok')
                        }
                        else {
                            unauthorized(
                                toasterMessagesIntl.unauthorizedTitle,
                                toasterMessagesIntl.unauthorizedDescription
                            )
                        }
                    })
                    .catch(() => unauthorized(
                        toasterMessagesIntl.unauthorizedTitle,
                        toasterMessagesIntl.unauthorizedDescription
                    ))
            }
            else if (asVerifier) {
                console.log('Verifier checking')
                getVerifierCreatedsByAddress([address as `0x${string}`],)
                    .then((verifierCreated) => {
                        console.log('verifierCreated', verifierCreated)
                        if (verifierCreated.length > 0) {
                            setVerifier(true)
                            console.log('verifier ok')
                        }
                        else {
                            unauthorized(
                                toasterMessagesIntl.unauthorizedTitle,
                                toasterMessagesIntl.unauthorizedDescription
                            )
                        }
                    })
                    .catch(() => unauthorized(
                        toasterMessagesIntl.unauthorizedTitle,
                        toasterMessagesIntl.unauthorizedDescription
                    ))
            }
            else {
                setCompany(false)
                setVerifier(false)
            }

        } else if (pathName !== '/') {
            unauthorized(
                toasterMessagesIntl.notConnectedTitle,
                toasterMessagesIntl.notConnectedDescription
            )
        } 
    }

    return (
        <>
            {children}
        </>
    )
}
export default IsConnectedAs
