'use client'

import { useToast } from "@chakra-ui/react"
import { MouseEventHandler, useEffect, useState} from "react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { getVerifierCreatedEvents, writeContractByFunctionName} from "@/utils"

export const VerifierModalForm = ({closeModal}: {closeModal:  MouseEventHandler<HTMLDivElement | HTMLButtonElement> } ) => {
    const {address, isConnected} = useAccount()
    const {setRefreshScreen, refreshScreen, setVerifier} = useIdentityContext()

    const [nameVerifier, setNameVerifier] = useState("")
    const [addressVerifier, setAddressVerifier] = useState("")
    const [siret, setSiret] = useState("")
    const [approvalNumber, setApprovalNumber] = useState("")
    const [loading, setLoading] = useState(true)
    const [messageHeaderForm, setMessageHeaderForm] = useState("invisible")
    const toast = useToast()
    const [refresh, setRefresh] = useState(0)
    const [verifierAdded, setVerifierAdded] = useState("")
    const [isVerifierAdded, setIsVerifierAdded] = useState(false)

    useEffect(() => {
        setMessageHeaderForm("invisible")

        getVerifierCreatedEvents()
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    if (verifierAdded == data[i].name && !isVerifierAdded) {
                        setMessageHeaderForm("visible")
                        setIsVerifierAdded(true)
                    }
                }
            })

    }, [isConnected, address])

    const submitCreateVerifier = () => {
        writeContractByFunctionName("createVerifier", nameVerifier, addressVerifier, siret, approvalNumber)
            .then(() => {
                setLoading(true)
                toast({
                    title: "Création d'un vérificateur.",
                    description: `Vérificateur ${nameVerifier} créé avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                toast({
                    title: 'Erreur',
                    description: "Impossible de créer le vérificateur!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setVerifier(true)
                setVerifierAdded(nameVerifier)
                // setRefresh(Math.random())
                setRefreshScreen(Math.random())
                setIsVerifierAdded(false)
                setNameVerifier("")
                setAddressVerifier("")
                setSiret("")
                setApprovalNumber("")
                setLoading(false)
            })
    }

    return (
        <>
            <div onClick={closeModal} className="fixed inset-0 backdrop-blur-sm bg-black/50"></div>

            <div className="fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded border border-gray-800 shadow-md shadow-black/50
                w-full md:w-1/2 p-2 md:p-10 text-sm md:text-base">
                <p className="font-bold text-base">Créer votre compagnie VGP agrée</p>

                <div className={`text-xs pt-2 text-cyan-400 ${messageHeaderForm}`}>
                    Compagnie <span className="text-amber-400">{verifierAdded}</span> créée avec succès.<br />
                    Vous pouvez fermer la fenêtre!
                </div>

                <div className="flex flex-col">
                    <form className="flex flex-col my-1">
                        <input onChange={e => setNameVerifier(e.target.value)}
                               placeholder="Nom de compagnie" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                        <input onChange={e => setAddressVerifier(e.target.value)}
                               placeholder="Adresse de la compagnie" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                        <input onChange={e => setSiret(e.target.value)}
                               placeholder="Siret" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                        <input onChange={e => setApprovalNumber(e.target.value)}
                               placeholder="Nom d'approbation" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                    </form>

                    <button
                        className="mx-auto py-2 px-3.5 box-border h-10 rounded bg-rose-500 text-slate-50 font-bold w-full"
                        onClick={() => submitCreateVerifier()}
                    >
                        Valider
                    </button>
                </div>

                <button
                    className="absolute top-1 right-1 w-7 h-7 bg-rose-600 text-gray-50 rounded"
                    onClick={closeModal}
                >X</button>
            </div>
        </>
    )
}