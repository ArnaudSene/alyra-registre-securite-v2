'use client'

import { useToast } from "@chakra-ui/react"
import { MouseEventHandler, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import { IRegisterCreated } from "@/interfaces/registers"
import { 
    getRegisterCreatedEvents, getRegisterVerifications,
    writeContractByFunctionName
} from "@/utils"


export const VerificationTaskModalForm = ({closeModal}: {closeModal:  MouseEventHandler<HTMLDivElement | HTMLButtonElement> } ) => {
    const {address, isConnected} = useAccount()
    const {setRefreshScreen, refreshScreen, setCreateVerificationTaskRefresh } = useIdentityContext()

    const toast = useToast()
    const [loading, setLoading] = useState(true)
    const [messageHeaderForm, setMessageHeaderForm] = useState("invisible")
    const [refresh, setRefresh] = useState(0)

    const [sites, setSites] = useState<IRegisterCreated[]>([])
    const [siteSelected, setSiteSelected] = useState("")

    const [securitySelectorSelected, setSecuritySelectorSelected] = useState<BigInt>(BigInt("0"))
    const [securityType, setSecurityType] = useState("")


    useEffect(() => {
        setLoading(true)
        setMessageHeaderForm("invisible")
        setCreateVerificationTaskRefresh(false)
        getSites()
    }, [isConnected, address, refresh, loading, refreshScreen])


    const getSites = async () => {
        let _sites: IRegisterCreated[] = []

        getRegisterCreatedEvents()
            .then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        const registerCreated = data[i]

                        if(registerCreated.account !== address) {
                            continue
                        }

                        _sites.push(registerCreated)
                    }
                })
            .finally(() => {
                setSites(_sites)
                setLoading(false)
            })
    }

    const submitCreateVerificationTask = () => {
        writeContractByFunctionName("createVerificationTask", siteSelected, securityType, securitySelectorSelected)
            .then(() => {
                setLoading(true)
                toast({
                    title: "Création d'une tâche.",
                    description: `Tâche créée avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("Add new verification task error => " + err)
                toast({
                    title: 'Erreur',
                    description: "Impossible de créer une tâche!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setLoading(false)
                setCreateVerificationTaskRefresh(true)
                setRefresh(Math.random())
                setRefreshScreen(Math.random())
            })
    }

    const handleSiteOnChange = (event: any) => {
        setSiteSelected(event.target.value)
    }

    const handleSecuritySelectorOnChange = (event: any) => {
        setSecuritySelectorSelected(BigInt(event.target.value))
    }


    return (
        <>
            {/*Close form modal*/}
            <div onClick={closeModal} className="fixed inset-0 backdrop-blur-sm bg-black/50"></div>

            {/*Form add site*/}
            <div className="text-sm fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded border border-gray-800 shadow-md shadow-black/50
                w-full md:w-1/2 p-2 md:p-10 text-sm md:text-base">
                <p className="font-bold text-base">Créer une tâche de vérification</p>

                {/*Message header*/}
                <div className={`text-xs pt-2 text-cyan-400 ${messageHeaderForm}`}>
                    Le tâche a été créée avec succès.<br />
                    Vous pouvez fermer la fenêtre ou ajouter un autre site!
                </div>

                <div className="flex flex-col">

                    {/*Input fields*/}
                    <form className="flex flex-col my-1">

                        <select
                            className="text-gray-900"
                            value={siteSelected} onChange={handleSiteOnChange}>
                            <option value="">Sélectionner un site</option>
                            {sites.map((data, index) => (
                                <option key={index} value={data.siteName}>{data.siteName}</option>
                            ))}
                        </select>
                        <select
                            className="text-gray-900"
                            value={Number(securitySelectorSelected)} onChange={handleSecuritySelectorOnChange}>
                            <option value="">Sélectionner un sector</option>
                            {getRegisterVerifications().map((data, index) => (
                                <option key={index} value={index}>{data}</option>
                            ))}
                        </select>
                        <input onChange={e => setSecurityType(e.target.value)}
                               placeholder="Type de vérification" type="text"
                               className="py-1 mb-0.5 rounded text-gray-900"/>

                    </form>

                    <button
                        className="mx-auto py-2 px-3.5 box-border h-10 rounded bg-rose-500 text-slate-50 font-bold w-full"
                        onClick={() => submitCreateVerificationTask()}>Ajouter
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