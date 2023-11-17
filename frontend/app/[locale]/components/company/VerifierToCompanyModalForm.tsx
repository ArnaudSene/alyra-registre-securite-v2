'use client'

import { useToast } from "@chakra-ui/react"
import { MouseEventHandler, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { IVerifierAddedToCompany } from "@/interfaces/verifier"
import { getVerifierAddedToCompanyEventsv2, writeContractByFunctionName } from "@/utils"


export const VerifierToCompanyModalForm = ({closeModal}: {closeModal:  MouseEventHandler<HTMLDivElement | HTMLButtonElement> } ) => {
    const {address, isConnected} = useAccount()
    const {refreshScreen, setRefreshScreen,  setVerifierToCompanyRefresh} = useIdentityContext()
    const toast = useToast()
    const [loading, setLoading] = useState(true)
    const [messageHeaderForm, setMessageHeaderForm] = useState("invisible")
    const [refresh, setRefresh] = useState(0)
    const [verifier, setVerifier] = useState<`0x${string}`>("0x")
    const [verifierAdded, setVerifierAdded] = useState("")
    const [isVerifierAdded, setIsVerifierAdded] = useState(false)

    useEffect(() => {
        setMessageHeaderForm("invisible")
        setVerifierToCompanyRefresh(false)

        getVerifierAddedToCompanyEventsv2()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    const verifierAddedToCompany: IVerifierAddedToCompany = data[i]

                    if (address == verifierAddedToCompany.company && verifierAdded == verifierAddedToCompany.verifier && !isVerifierAdded) {
                        setMessageHeaderForm("visible")
                        setIsVerifierAdded(true)
                    }
                }
            })

    }, [isConnected, address, refresh, refreshScreen])

    const submitAddVerifier = () => {
        writeContractByFunctionName("addVerifierToCompany", verifier as `0x${string}`)
            .then(() => {
                setLoading(true)
                toast({
                    title: 'Ajout du vérificateur.',
                    description: `Vérificateur ${verifier} ajouté avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("Add new verifier error => " + err)
                toast({
                    title: 'Erreur',
                    description: "Impossible d'ajouter un vérificateur!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setLoading(false)
                setVerifierToCompanyRefresh(true)
                setVerifierAdded(verifier)
                setVerifier("0x")
                setRefresh(Math.random())
                setRefreshScreen(Math.random())
            })
    }

    return (
        <>
            {/*Close form modal*/}
            <div onClick={closeModal} className="fixed inset-0 backdrop-blur-sm bg-black/50"></div>

            {/*Form add site*/}
            <div className="text-sm fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded border border-gray-800 shadow-md shadow-black/50
                w-full md:w-1/2 p-2 md:p-10 text-sm md:text-base">
                <p className="font-bold text-base">Ajoutez un vérificateur</p>

                {/*Message header*/}
                <div className={`text-xs pt-2 text-cyan-400 ${messageHeaderForm}`}>
                    Le véricateur <span className="text-amber-400">{verifierAdded}</span> a été ajouté avec succès.<br />
                    Vous pouvez fermer la fenêtre ou ajouter un autre site!
                </div>

                <div className="flex flex-col">

                    {/*Input fields*/}
                    <form className="flex flex-col my-1">

                        <input onChange={e => setVerifier(e.target.value as `0x${string}`)}
                               placeholder="Clé du vérificateur (0x000)" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>

                    </form>

                    <button
                        className="mx-auto py-2 px-3.5 box-border h-10 rounded bg-rose-500 text-slate-50 font-bold w-full"
                        onClick={() => submitAddVerifier()}>Ajouter
                    </button>
                </div>

                {/*Close form modal*/}
                <button
                    className="absolute top-1 right-1 w-7 h-7 bg-rose-600 text-gray-50 rounded"
                    onClick={closeModal}
                >X</button>
            </div>
        </>
    )
}