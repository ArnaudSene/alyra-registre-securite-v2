"use client"

import { useToast } from "@chakra-ui/react"
import React, { ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAccount } from "wagmi"
import { ICompany, IVerifier, useIdentityContext } from "@/contexts/Identity"
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
    const { setCompany, isCompany, setIsCompany, isVerifier, setIsVerifier, setVerifier } = useIdentityContext()
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
        console.log("useEffect verifier:", isVerifier, " company:", isCompany)
        handleIsConnected()
    }, [address, isConnected])



    const handleIsConnected = () => {
        if (isConnected && asCompany && !isCompany) {
            unauthorized(
                toasterMessagesIntl.unauthorizedTitle,
                toasterMessagesIntl.unauthorizedDescription
            )
        } else if (isConnected && asVerifier && !isVerifier) {
            unauthorized(
                toasterMessagesIntl.unauthorizedTitle,
                toasterMessagesIntl.unauthorizedDescription
            )
        } else if (!isConnected && pathName !== '/') {
            unauthorized(
                toasterMessagesIntl.notConnectedTitle,
                toasterMessagesIntl.notConnectedDescription
            )
        }




        if (isConnected) {
            if(asCompany && !isCompany) {
                unauthorized(
                    toasterMessagesIntl.unauthorizedTitle,
                    toasterMessagesIntl.unauthorizedDescription
                )

                // console.log('Company checking')
                // getRegisterCreatedsByCompany(address as `0x${string}`,)
                //     .then((registerCreated) => {
                //         if (registerCreated.length > 0) {
                //             setIsCompany(true)
                //             setCompany({
                //                 addr: registerCreated[0].account,
                //                 name : registerCreated[0].name,
                //                 addressName: registerCreated[0].addressName,
                //                 siret: registerCreated[0].siret,
                //             } as ICompany)
                //             console.log('company ok', )
                //         }
                //         else {
                //             console.log('company not ok', )
                //             unauthorized(
                //                 toasterMessagesIntl.unauthorizedTitle,
                //                 toasterMessagesIntl.unauthorizedDescription
                //             )
                //         }
                //     })
                //     .catch(() => unauthorized(
                //         toasterMessagesIntl.unauthorizedTitle,
                //         toasterMessagesIntl.unauthorizedDescription
                //     ))
            }
            else if (asVerifier && !isVerifier) {
                unauthorized(
                    toasterMessagesIntl.unauthorizedTitle,
                    toasterMessagesIntl.unauthorizedDescription
                )

                // console.log('Verifier checking')
                // getVerifierCreatedsByAddress([address as `0x${string}`],)
                //     .then((verifierCreated) => {
                //         console.log('verifierCreated', verifierCreated)
                //         if (verifierCreated.length > 0) {
                //             setIsVerifier(true)
                //             setVerifier({
                //                 addr: verifierCreated[0].verifier,
                //                 name : verifierCreated[0].name,
                //                 addressName: verifierCreated[0].addressName,
                //                 siret: verifierCreated[0].siret,
                //                 approval: verifierCreated[0].approvalNumber,
                //             } as IVerifier)
                //             console.log('verifier ok')
                //         }
                //         else {
                //             unauthorized(
                //                 toasterMessagesIntl.unauthorizedTitle,
                //                 toasterMessagesIntl.unauthorizedDescription
                //             )
                //         }
                //     })
                //     .catch(() => unauthorized(
                //         toasterMessagesIntl.unauthorizedTitle,
                //         toasterMessagesIntl.unauthorizedDescription
                //     ))
            }
            else {
                setIsCompany(false)
                setIsVerifier(false)
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
