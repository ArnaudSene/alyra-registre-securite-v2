'use client'

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { IVerifierAddedToCompany } from "@/interfaces/verifier"
import { IVerifierCreated } from "@/interfaces/verifier"
import { getVerifierAddedToCompanyEventsv2, getVerifierCreatedEvents } from "@/utils"
import { VerifierToCompanyButton } from "@/app/[locale]/components/company/VerifierToCompanyButton"

export const VerifierToCompany = () => {
    const { address} = useAccount()
    const { refreshScreen, setRefreshScreen,verifierToCompanyRefresh } = useIdentityContext()

    const [ name, setName] = useState("")
    const [ addressName, setAddressName] = useState("")
    const [ siret, setSiret] = useState("")
    const [ approvalNumber, setApprovalNumber] = useState("")
    const [ verifier, setVerifier ] = useState("")
    const [ refresh, setRefresh] = useState(0)

    useEffect(() => {
        let verifier_: string = ""

        // get the verifier assigned to a company
        getVerifierAddedToCompanyEventsv2()
            .then(data => {
                // Only 1 verifier per company
                for (let i = 0; i < data.length; i++) {
                    const verifierAddedToCompany: IVerifierAddedToCompany = data[i]

                    if(verifierAddedToCompany.company == address)
                        verifier_ = verifierAddedToCompany.verifier

                }})
            .finally(() => {
                // get verifier name et firstname
                getVerifierCreatedEvents()
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            const verifierCreated: IVerifierCreated = data[i]
                            if(verifierCreated.verifier == verifier_) {
                                setVerifier(verifierCreated.verifier)
                                setName(verifierCreated.name)
                                setAddressName(verifierCreated.addressName)
                                setSiret(verifierCreated.siret)
                                setApprovalNumber(verifierCreated.approvalNumber)
                            }
                        }})
            })

    }, [refresh, verifierToCompanyRefresh, refreshScreen])

    return (
        <div>

            {/*Show verifier*/}
            <div className="rounded h-auto text-center border-gray-800 border bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg
                 md:basis-1 py-2 md:p-5 md:border-t-rose-500">

                <div className="flex justify-between px-2 md:px-0">
                    <div className="text-sm md:text-base text-center py-2">
                        <h1 className="text-rose-500">Votre vérificateur</h1>
                    </div>

                    <VerifierToCompanyButton />
                </div>

                <div className="flex flex-col md:py-2">
                    <div className="hidden md:grid md:grid-cols-5 md:gap-0 border-b border-rose-500 bg-gray-700 font-bold
                        text-xs md:text-sm md:py-3 text-center md:text-center md:mb-2">
                        <div className="md:w-full ">Comptes</div>
                        <div className="md:w-1/2  ">Nom</div>
                        <div className="md:w-1/2  ">Adresse</div>
                        <div className="md:w-1/2  ">Siret</div>
                        <div className="md:w-1/2  ">Approval</div>
                    </div>
                    {
                        <div className="flex flex-col md:grid md:grid-cols-5 text-xs text-center
                             border-t border-t-gray-600 md:border-0  pb-3 md:p-0 md:my-0
                             bg-gradient-to-b from-gray-800 to-gray-900
                             md:bg-gradient-to-t md:from-gray-900 md:to-gray-900
                             hover:bg-gradient-to-t hover:from-gray-800 hover:to-gray-700 hover:text-cyan-300
                             active:bg-gradient-to-t active:from-cyan-500 active:to-cyan-400 active:text-gray-700
                            " >

                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Clé</div>
                                    <div className="pl-1 md:p0">{verifier}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Nom</div>
                                    <div className="pl-1 md:p0">{name}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Addresse</div>
                                    <div className="pl-1 md:p0">{addressName}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Siret</div>
                                    <div className="pl-1 md:p0">{siret}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Approval</div>
                                    <div className="pl-1 md:p0">{approvalNumber}</div>
                                </div>
                            </div>

                        </div>
                    }
                </div>
            </div>
        </div>
    )
}