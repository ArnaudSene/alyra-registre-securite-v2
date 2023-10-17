'use client'

import Loader from "./Loader"
import { getRegisterCreatedEvents, getVerifierCreatedEvents} from "@/utils"
import { useRouter, usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity";
import { useToast } from "@chakra-ui/react";
import { toasterMessages } from "@/utils/intl"
import { IToasterMessages } from "@/interfaces/intl"


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
    const [loading, setLoading] = useState(true)
    const pathName = usePathname()

    useEffect(() => {
        setLoading(true)
        setCompany(false)
        setVerifier(false)

        if (isConnected) {
            if(asCompany) {
                getRegisterCreatedEvents()
                    .then(data => {
                        const index = data.findIndex((d) => d.account === address )
                        console.log('Company data ' + index)
                        if (index !== -1) {
                            setCompany(true)
                        }

                    })
                    .catch(() => push('/'))
                    .finally(() => setLoading(false))
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
                    .finally(() => setLoading(false))
            }
            else setLoading(false)

        } else if (pathName !== '/') {
            toast({
                title: toasterMessagesIntl.notConnectedTitle,
                description: toasterMessagesIntl.notConnectedDescription,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            push('/')
        }
        else {
            setLoading(false)
        }
    }, [address, isConnected])

    return (
        <Loader isLoading={loading}>
            {isConnected ? children :
                <div className="flex flex-row">
                    <div className="border-t border-t-rose-500 text-center w-1/2 mt-10 p-5
                        bg-gradient-to-t from-gray-700 to-gray-800 
                        text-slate-100
                        rounded mx-auto
                     ">
                        <p>Ho, n'oublies pas de te connecter à ton wallet1</p>

                    </div>
                </div>
            }
        </Loader>
    )
}
export default IsConnectedAs