'use client'

import {getVerifierCreatedEvents} from "@/utils";
import {useEffect, useState} from "react";
import {useAccount} from "wagmi";
import {useRouter} from "next/navigation";
import {useIdentityContext} from "@/contexts/Identity";
import {AccountVerifier} from "@/app/[locale]/components/verifier/AccountVerifier";
import {VerificationTaskForVerifier} from "@/app/[locale]/components/verifier/VerificationTaskForVerifier";
import {VerificationTaskMenuForVerifier} from "@/app/[locale]/components/verifier/VerificationTaskMenuForVerifier";
import {VerificationTask} from "@/app/[locale]/components/company/VerificationTask";
import {VerificationTaskForVerifierv2} from "@/app/[locale]/components/verifier/VerificationTaskForVerifierv2";

export const VerifierRootPage = () => {
    const { address, isConnected } = useAccount()
    const {setSelectedScreen, verifier, refreshScreen, setRefreshScreen} = useIdentityContext()
    const { push } = useRouter()

    const [name, setName] = useState("")
    const [addressName, setAddressName] = useState("")
    const [siret, setSiret] = useState("")
    const [approvalNumber, setApprovalNumber] = useState("")

    const [toggleAddCompanySite, setToggleAddCompanySite] = useState("hidden")
    const [toggleSecurityRegister, setToggleSecurityRegister ] = useState("hidden")
    const [toggleAccount, setToggleAccount ] = useState("hidden")
    const [toggleVerification, setToggleVerification ] = useState("hidden")

    useEffect(() => {
        if(!verifier)
            push("/")

        getVerifierCreatedEvents().then(data => {
            for (let i = 0; i < data.length; i++) {
                if(data[i].verifier == address) {
                    setName(data[i].name)
                    setAddressName(data[i].addressName)
                    setSiret(data[i].siret)
                    setApprovalNumber(data[i].approvalNumber)
                }
            }
        })

    }, [isConnected, address])

    const toggleMenu = (menu: string) => {
        setSelectedScreen(menu)

        setToggleAddCompanySite("hidden")
        setToggleSecurityRegister("hidden")
        setToggleAccount("hidden")
        setToggleVerification("hidden")

        switch(menu) {
              case 'account':
                toggleAccount == "hidden" ? setToggleAccount("flex") : setToggleAccount("hidden")
                break
            case 'verification':
                toggleVerification == "hidden" ? setToggleVerification("flex") : setToggleVerification("hidden")
                break
        }
    }

    return (
        <div>
            <div className="flex flex-col text-sm md:text-base p-3 md:p-5 md:flex-row text-center md:text-left shadow-lg shadow-gray-800">
                <div className="font-extrabold text-slate-300 md:pr-3">{name}</div>
                <div className="text-slate-300 md:pr-3">{addressName}</div>
                <div className="grow text-slate-300">
                    <span className="font-bold">Siret:</span>{siret}
                    <span className="font-bold pl-2">Agrément:</span> {approvalNumber}
                </div>

            </div>

            {/**/}
            <div className="flex flex-col text-sm md:text-base md:flex-row mt-3 md:mt-5">

                {/*Menu*/}
                <div className="flex-none md:w-72 pt-0">
                    <div className="border-gray-800 border md:border-t-rose-500 mb-1 mx1 md:pl-5  md:mb-2 md:mx-2 rounded bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg">
                        <h1 className="md:hidden py-2 bg-rose-500 font-semibold text-center rounded-t">Menu</h1>

                        <div className="flex flex-col py-0 md:py-4 ">
                            <button className="focus:text-amber-200 px-2 font-light leading-6 md:leading-8 text-center md:text-left hover:text-cyan-400 hover:bg-gray-800"
                                    onClick={() => toggleMenu('account')}
                            >Gérer les comptes</button>

                            <button className="focus:text-amber-200 px-2 font-light leading-6 md:leading-8 text-center md:text-left hover:text-cyan-400 hover:bg-gray-800"
                                    onClick={() => toggleMenu('verification')}
                            >Gérer les vérifications</button>

                        </div>
                    </div>

                    <VerificationTaskMenuForVerifier />
                </div>

                {/*MAIN page*/}
                <div className="md:grow">

                    {/*Register*/}


                    {/*Account*/}
                    <div className={`flex flex-col mx-auto ${toggleAccount}`}>
                        <AccountVerifier />
                    </div>

                    {/*Verification*/}
                    <div className={`flex flex-col mx-auto ${toggleVerification}`}>
                        <VerificationTaskForVerifierv2 />

                    </div>
                </div>

            </div>
        </div>
    );
};