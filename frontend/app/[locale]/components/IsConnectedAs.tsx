"use client"

import { useToast } from "@chakra-ui/react"
import { ReactNode, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { IToasterMessages } from "@/interfaces/intl"
import { toasterMessages } from "@/utils/intl"
import { getRegisterCreatedEvents, getVerifierCreatedEvents} from "@/utils"


const IsConnectedAs = ({ children, asVerifier, asCompany }: {
    children: ReactNode,
    asVerifier?: boolean,
    asCompany?: boolean,
}) => {
    const { address, isConnected } = useAccount()
    const { setCompany, setVerifier } = useIdentityContext()
    const { push } = useRouter()
    const toast = useToast()
    const toasterMessagesIntl: IToasterMessages = toasterMessages()
    const pathName = usePathname()

    useEffect(() => {
        handleIsConnected()
    }, [address, isConnected])

    const handleIsConnected = () => {
        if (isConnected) {
            if(asCompany) {
                console.log('Company checking')
                getRegisterCreatedEvents()
                    .then(data => {
                        const index = data.findIndex((d) => d.account === address )
                        console.log('Company data ' + index)
                        if (index !== -1) {
                            setCompany(true)
                        }

                    })
                    .catch(() => push('/'))
            }
            else if (asVerifier) {
                console.log('Verifier checking')
                getVerifierCreatedEvents()
                    .then(data => {
                        const index = data.findIndex((d) => d.verifier === address )
                        console.log('Verifier data ' + index)
                        if (index !== -1) {
                            setVerifier(true)
                        }
                    })
                    .catch(() => push('/'))
            }
            else {
                setCompany(false)
                setVerifier(false)
            }

        } else if (pathName !== '/') {
            push('/')
            toast({
                title: toasterMessagesIntl.notConnectedTitle,
                description: toasterMessagesIntl.notConnectedDescription,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        } 
    }

    return (
        <>
            {children}
        </>
    )
}
export default IsConnectedAs
