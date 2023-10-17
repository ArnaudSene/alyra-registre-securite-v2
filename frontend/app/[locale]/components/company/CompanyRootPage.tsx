'use client'

import {getRegisterCreatedEvents} from "@/utils";
import {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {useRouter} from "next/navigation";
import Loader from "@/app/[locale]/components/Loader";
import {useIdentityContext} from "@/contexts/Identity";

import {SiteCompany} from "@/app/[locale]/components/company/SiteCompany";
import {AccountCompany} from "@/app/[locale]/components/company/AccountCompany";
import {VerifierToCompany} from "@/app/[locale]/components/company/VerifierToCompany";
import {VerificationTask} from "@/app/[locale]/components/company/VerificationTask";
import {VerificationTaskMenu} from "@/app/[locale]/components/company/VerificationTaskMenu";

export const CompanyRootPage = () => {
    const { address, isConnected } = useAccount()
    const {setSelectedScreen, company} = useIdentityContext()
    const { push } = useRouter()

    const [loading, setLoading] = useState(true)
    const [nameCo, setNameCo] = useState("")
    const [addressCo, setAddressCo] = useState("")
    const [siretCo, setSiretCo] = useState("")
    const [siteNames, setSiteNames] = useState<string[]>([])
    const [siteAddresses, setSiteAddresses] = useState<string[]>([])
    const [toggleAddCompanySite, setToggleAddCompanySite] = useState("hidden")
    const [toggleSecurityRegister, setToggleSecurityRegister ] = useState("hidden")
    const [toggleAccount, setToggleAccount ] = useState("hidden")
    const [toggleVerification, setToggleVerification ] = useState("hidden")
    const [toggleVerifier, setToggleVerifier ] = useState("hidden")

    useEffect(() => {

        if(!company)
            push("/")

        getRegisterCreatedEvents().then(data => {
            let siteName: string[] = []
            let siteAddress: string[] = []

            for (const[i, companySite] of data.entries()) {
                if (companySite.account === address) {
                    setNameCo(companySite.name)
                    setAddressCo(companySite.addressName)
                    setSiretCo(companySite.siret)
                    siteName.push(companySite.siteName)
                    siteAddress.push(companySite.siteAddressName)
                }
            }

            setSiteNames(siteName)
            setSiteAddresses(siteAddress)
        }).finally(() => setLoading(false))
    }, [isConnected, address])

    const toggleMenu = (menu: string) => {
        setSelectedScreen(menu)

        setToggleAddCompanySite("hidden")
        setToggleSecurityRegister("hidden")
        setToggleAccount("hidden")
        setToggleVerification("hidden")
        setToggleVerifier("hidden")

        switch(menu) {
            case 'site':
                toggleAddCompanySite == "hidden" ? setToggleAddCompanySite("flex") : setToggleAddCompanySite("hidden")
                break
            case 'register':
                toggleSecurityRegister == "hidden" ? setToggleSecurityRegister("flex") : setToggleSecurityRegister("hidden")
                break
            case 'account':
                toggleAccount == "hidden" ? setToggleAccount("flex") : setToggleAccount("hidden")
                break
            case 'verification':
                toggleVerification == "hidden" ? setToggleVerification("flex") : setToggleVerification("hidden")
                break
            case 'verifier':
                toggleVerifier == "hidden" ? setToggleVerifier("flex") : setToggleVerifier("hidden")
                break
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:mb-5 pt-16 px-2 z-10">
                <div className="font-extrabold text-slate-300 md:pr-3">{nameCo}</div>
                <div className="text-slate-300 md:pr-3">{addressCo}</div>
                <div className="grow text-slate-300"><span className="font-bold">Siret:</span> {siretCo}</div>
            </div>

            {/**/}
            <div className="flex flex-col text-sm md:text-base md:flex-row mt-3 md:mt-5">

                {/*Menu*/}
                <div className="flex-none md:w-72 pt-0">
                    <div className="border-gray-800 border md:border-t-rose-500 mb-1 mx1 md:pl-5  md:mb-2 md:mx-2 rounded bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg ">
                        <h1 className="md:hidden py-2 bg-rose-500 font-semibold text-center rounded-t">Menu</h1>

                        <div className="flex flex-col py-0 md:py-4 ">
                            <button className="focus:text-amber-200 px-2 font-light leading-6 md:leading-8 text-center hover:text-cyan-400 hover:bg-gray-800
                                md:text-left "
                                    onClick={() => toggleMenu('account')}
                            >Gérer les comptes</button>

                            <button className="focus:text-amber-200 px-2 font-light leading-6 text-center md:text-left hover:text-cyan-400 hover:bg-gray-800
                                md:leading-7"
                                    onClick={() => toggleMenu('site')}
                            >Gérer les sites</button>

                            <button className="focus:text-amber-200 px-2 font-light leading-6 text-center md:text-left hover:text-cyan-400 hover:bg-gray-800
                                md:leading-7"
                                    onClick={() => toggleMenu('verifier')}
                            >Gérer le vérificateur</button>

                            <button className="focus:text-amber-200 px-2 font-light leading-6 text-center md:text-left hover:text-cyan-400 hover:bg-gray-800
                                md:leading-7"
                                    onClick={() => toggleMenu('verification')}
                            >Gérer les vérifications</button>

                            <button className="focus:text-amber-200 px-2 font-light leading-6 text-center md:text-left hover:text-cyan-400 hover:bg-gray-800
                                md:leading-7"
                                    onClick={() => toggleMenu('register')}
                            >Registres de sécurité</button>
                        </div>
                    </div>

                    {/*Custon menu*/}
                    <VerificationTaskMenu />
                </div>

                {/*MAIN page*/}
                <div className="md:grow">
                    {/*site*/}
                    <div className={`flex flex-col mx-auto ${toggleAddCompanySite}`}>
                        <SiteCompany />
                    </div>

                    {/*verificateur*/}
                    <div className={`flex flex-col mx-auto ${toggleVerifier}`}>
                        <VerifierToCompany />
                    </div>


                    {/*Register*/}
                    <div className={`flex flex-col mx-auto ${toggleSecurityRegister}`}>
                        <div className="p-5 bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg border-gray-800 border">
                            <div className="text-center"><h1 className="text-rose-500">Liste des registres de sécurité</h1></div>
                        </div>
                    </div>

                    {/*Account*/}
                    <div className={`flex flex-col mx-auto ${toggleAccount}`}>
                        <AccountCompany />
                    </div>

                    {/*Verification*/}
                    <div className={`flex flex-col mx-auto ${toggleVerification}`}>

                        <VerificationTask />
                    </div>
                </div>

            </div>
        </div>
    );
};