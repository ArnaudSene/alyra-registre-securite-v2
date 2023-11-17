'use client'

import { useToast } from "@chakra-ui/react"
import { MouseEventHandler, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import {isCompanyFromContract, writeContractByFunctionName } from "@/utils"


export const CompanyModalForm = ({closeModal}: {closeModal:  MouseEventHandler<HTMLDivElement | HTMLButtonElement> } ) => {
    const {address, isConnected} = useAccount()
    const {setRefreshScreen, refreshScreen, setCompany} = useIdentityContext()
    const toast = useToast()
    const [nameCo, setNameCo] = useState("")
    const [addressCo, setAddressCo] = useState("")
    const [siretCo, setSiretCo] = useState("")
    const [siteCo, setSiteCo] = useState("")
    const [siteAddrCo, setSiteAddrCo] = useState("")
    const [isCompany, setIsCompany] = useState(false)
    const [loading, setLoading] = useState(true)
    const [messageHeaderForm, setMessageHeaderForm] = useState("invisible")
    const [refresh, setRefresh] = useState(0)
    const [isCompanyAdded, setIsCompanyAdded] = useState(false)

    useEffect(() => {
        setIsCompany(false)
        isCompanyFromChain()

        if (isCompany && isCompanyAdded){
            setCompany(true)
            setMessageHeaderForm("visible")
        }

    }, [isConnected, isCompany, refresh])

    const isCompanyFromChain = () => {
        isCompanyFromContract(address as `0x${string}`)
            .then(value => setIsCompany(value))
    }

    const submitCreateCompany = () => {

        writeContractByFunctionName("createRegister", nameCo, addressCo, siretCo, siteCo, siteAddrCo)
            .then(() => {
                setLoading(true)
                toast({
                    title: 'Company added.',
                    description: `Company ${nameCo} successfully created`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("x full error => " + err)
                toast({
                    title: 'Erreur',
                    description: "Impossible de créer la compagnie!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setRefresh(Math.random())
                setIsCompanyAdded(true)
                setRefreshScreen(Math.random())
            })
    }

    return (
        <>
            <div onClick={closeModal} className="fixed inset-0 backdrop-blur-sm bg-black/50"></div>

            <div className="text-sm fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded border border-gray-800 shadow-md shadow-black/50
                w-full md:w-1/2 p-2 md:p-10 text-sm md:text-base">
                <p className="font-bold text-base">Créer votre compagnie</p>

                <div className={`text-xs pt-2 text-cyan-400 ${messageHeaderForm}`}>
                    Compagnie créée avec succès.<br />
                    Vous pouvez fermer la fenêtre!
                </div>

                <div className="flex flex-col">
                    <form className="flex flex-col my-1">
                        <input onChange={e => setNameCo(e.target.value)}
                               placeholder="Nom de compagnie" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                        <input onChange={e => setAddressCo(e.target.value)}
                               placeholder="Adresse de la compagnie" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                        <input onChange={e => setSiretCo(e.target.value)}
                               placeholder="Siret" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                        <input onChange={e => setSiteCo(e.target.value)}
                               placeholder="Nom du site/Bâtiment" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                        <input onChange={e => setSiteAddrCo(e.target.value)}
                               placeholder="Adresse du site/Bâtiment" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                    </form>

                    <button
                        className="mx-auto py-2 px-3.5 box-border h-10 rounded bg-rose-500 text-slate-50 font-bold w-full"
                        onClick={() => submitCreateCompany()}
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