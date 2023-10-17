'use client'

import {MouseEventHandler, useEffect, useState} from "react";
import {useAccount } from "wagmi";
import {
    getRegisterCreatedEvents,
    writeContractByFunctionName
} from "@/utils";
import { useToast } from "@chakra-ui/react";
import {useIdentityContext} from "@/contexts/Identity";


export const SiteCompanyModalForm = ({closeModal}: {closeModal:  MouseEventHandler<HTMLDivElement | HTMLButtonElement> } ) => {
    const {address, isConnected} = useAccount()
    const {setRefreshScreen,  refreshScreen, setAddSiteRefresh } = useIdentityContext()

    const toast = useToast()
    const [name, setName] = useState("")
    const [addressName, setAddressName] = useState("")
    const [siret, setSiret] = useState("")
    const [siteName, setSiteName] = useState("")
    const [siteAddressName, setSiteAddressName] = useState("")
    const [loading, setLoading] = useState(true)
    const [messageHeaderForm, setMessageHeaderForm] = useState("invisible")
    const [refresh, setRefresh] = useState(0)
    const [siteAdded, setSiteAdded] = useState("")
    const [isSiteAdded, setIsSiteAdded] = useState(false)

    useEffect(() => {
        setMessageHeaderForm("invisible")

        getRegisterCreatedEvents().then(data => {
            for (const [i, companySite] of data.entries()) {
                if (address == companySite.account && siteAdded === companySite.siteName && !isSiteAdded) {
                    setMessageHeaderForm("visible")
                    setIsSiteAdded(true)
                }

                if (address == companySite.account) {
                    setName(companySite.name)
                    setAddressName(companySite.addressName)
                    setSiret(companySite.siret)
                }
            }
        })

    }, [isConnected, refresh, refreshScreen])


    const submitCreateCompany = () => {
        writeContractByFunctionName("createRegister", name, addressName, siret, siteName, siteAddressName)
            .then(() => {
                setLoading(true)
                toast({
                    title: 'Ajout de site.',
                    description: `Site ${siteName} ajouté avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("Add new site error => " + err)
                toast({
                    title: 'Erreur',
                    description: "Impossible d'ajouter un site!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setLoading(false)
                setSiteAdded(siteName)
                setSiteName("")
                setSiteAddressName("")
                setAddSiteRefresh(true)
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
                <p className="font-bold text-base ">Ajoutez un site</p>

                {/*Message header*/}
                <div className={`text-xs pt-2 text-cyan-400 ${messageHeaderForm}`}>
                    Le site <span className="text-amber-400">{siteAdded}</span> a été ajouté avec succès.<br />
                    Vous pouvez fermer la fenêtre ou ajouter un autre site!
                </div>

                <div className="flex flex-col ">
                    {/*Show company information*/}
                    <ul className="mb-2 flex flex-col">
                        <li className="flex flex-row pt-0  ">
                            <span className="flex-none text-xs md:text-sm w-1/4 font-bold">Compagnie</span>
                            <span className="grow text-xs md:text-sm text-amber-200">{name}</span></li>
                        <li className="flex flex-row pt-0">
                            <span className="flex-none text-xs md:text-sm w-1/4 font-bold">Adresse</span>
                            <span className="grow text-xs md:text-sm text-amber-200  ">{addressName}</span></li>
                        <li className="flex flex-row pt-0">
                            <span className="flex-none text-xs md:text-sm w-1/4 font-bold">Siret</span>
                            <span className="grow text-xs md:text-sm text-amber-200">{siret}</span></li>
                    </ul>

                    {/*Input fields*/}
                    <form className="flex flex-col my-1">
                        <input onChange={e => setSiteName(e.target.value)}
                               placeholder="Nom du site/Bâtiment" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                        <input onChange={e => setSiteAddressName(e.target.value)}
                               placeholder="Adresse du site/Bâtiment" type="text"
                               className="mb-0.5 py-1 rounded text-rose-500"/>
                    </form>

                    <button
                        className="mx-auto py-2 px-3.5 box-border h-10 rounded bg-rose-500 text-slate-50 font-bold w-full"
                        onClick={() => submitCreateCompany()}>Ajouter
                    </button>
                </div>

                {/*Close form modal*/}
                <button
                    className="absolute top-1 right-1 w-7 h-7 bg-rose-600 text-gray-50 rounded"
                    onClick={closeModal}
                >X</button>
            </div>
        </>
    );
};