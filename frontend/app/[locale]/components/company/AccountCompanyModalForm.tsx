'use client'

import React, { MouseEventHandler, useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useIdentityContext } from "@/contexts/Identity"
import {
    getCompanyAccountUpdatedEvents,
    writeContractByFunctionName
} from "@/utils"

export const AccountCompanyModalForm = ({closeModal}: {closeModal:  MouseEventHandler<HTMLDivElement | HTMLButtonElement> } ) => {
    const {address, isConnected} = useAccount()
    const {setRefreshScreen, refreshScreen, setAccountRefresh} = useIdentityContext()

    const [account, setAccount] = useState<`0x${string}`>()
    const [loading, setLoading] = useState(true)
    const [messageHeaderForm, setMessageHeaderForm] = useState("invisible")
    const toast = useToast()
    const [refresh, setRefresh] = useState(0)
    const [accountAdded, setAccountAdded] = useState<`0x${string}`>()
    const [isAccountAdded, setIsAccountAdded] = useState(false)
    const [accounts, setAccounts ] = useState<`0x${string}`|string[][]>([])
    const [name, setName] = useState("")
    const [firstName, setFirstName] = useState("")

    useEffect(() => {
        setMessageHeaderForm("invisible")
        setAccountRefresh(false)

        getCompanyAccountUpdatedEvents()
            .then(data => {
                let accounts: `0x${string}`|string[][] = []

                for (let i = 0; i < data.length; i++) {
                    const _address: `0x${string}` = data[i][0]
                    const _account: `0x${string}` = data[i][1]
                    const _name: `0x${string}` = data[i][1]
                    const _firstName: `0x${string}` = data[i][1]
                    const _action: string = data[i][4]

                    if (address == _address && accountAdded === _account && !isAccountAdded && _action == "add") {
                        setMessageHeaderForm("visible")
                        setIsAccountAdded(true)
                    }

                    if (address == _address) {
                        accounts.push([_account, _name, _firstName, _action])
                    }
                }
                setAccounts(accounts)
            })
    }, [isConnected, refresh, refreshScreen])


    const submitAddCompanyAccount = () => {
        writeContractByFunctionName("updateCompanyAccount", account, name, firstName, "add")
            .then(() => {
                setLoading(true)
                toast({
                    title: 'Ajout de compte.',
                    description: `Compte ${account} ajouté avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("Add new account error => " + err)
                toast({
                    title: 'Erreur',
                    description: "Impossible d'ajouter un compte!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setLoading(false)
                setAccountAdded(account)
                setRefresh(Math.random())
                setRefreshScreen(Math.random())
                setAccountRefresh(true)
            })
    }

    return (
        <>
            {/*Close form modal*/}
            <div onClick={closeModal} className="fixed inset-0 backdrop-blur-sm bg-black/50"></div>

            {/*Form*/}
            <div className="fixed z-10 top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-900 rounded border border-gray-800 shadow-md shadow-black/50
                w-full md:w-1/2 p-2 md:p-10 text-sm md:text-base">
                <p className="font-bold text-base">Ajoutez un utilisateur</p>

                {/*Message header*/}
                <div className={`text-xs pt-2 text-cyan-400 ${messageHeaderForm}`}>
                    L'utilisateur <span className="text-amber-400">{account}</span> a été ajouté avec succès.<br />
                    Vous pouvez fermer la fenêtre ou ajouter un autre utilisateur!
                </div>

                <div className="flex flex-col">
                    {/*Input fields*/}
                    <form className="flex flex-col my-1">
                        <input onChange={e => setAccount(e.target.value as `0x${string}`)}
                               placeholder="Clé utilisateur" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                        <input onChange={e => setName(e.target.value)}
                               placeholder="Nom" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                        <input onChange={e => setFirstName(e.target.value)}
                               placeholder="Prénom" type="text"
                               className="py-1 mb-0.5 rounded text-rose-500"/>
                    </form>

                    <button
                        className="mx-auto py-2 px-3.5 box-border h-10 rounded bg-rose-500 text-slate-50 font-bold w-full"
                        onClick={() => submitAddCompanyAccount() }
                    >Ajouter</button>
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