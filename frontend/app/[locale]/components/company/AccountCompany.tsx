'use client'

import {
    getCompanyAccountUpdatedEventsv2,
    writeContractByFunctionName
} from "@/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { AccountCompanyButton } from "@/app/[locale]/components/company/AccountCompanyButton";
import { useToast } from "@chakra-ui/react";
import { useIdentityContext } from "@/contexts/Identity";
import { ICompanyAccountUpdated } from "@/interfaces/company";

export const AccountCompany = () => {
    const { address} = useAccount()
    const { accountRefresh, setAccountRefresh} = useIdentityContext()

    const toast = useToast()
    const [activeAccounts, setActiveAccounts ] = useState<ICompanyAccountUpdated[]>([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        getCompanyAccountUpdatedEventsv2().then(data => {
            const companyAccountsUpdated: Map<`0x${string}`, ICompanyAccountUpdated> = new Map();

            for (let i = 0; i < data.length; i++) {
                const companyAccountUpdated: ICompanyAccountUpdated = data[i]

                if(companyAccountUpdated.company !== address)
                    continue

                // Add account
                companyAccountsUpdated.set(companyAccountUpdated.account, companyAccountUpdated)

                // Delete account if action = remove
                if (companyAccountUpdated.action == "remove")
                    companyAccountsUpdated.delete(companyAccountUpdated.account)
            }

            const accounts: ICompanyAccountUpdated[] = []
            companyAccountsUpdated.forEach((data) => accounts.push(data))
            setActiveAccounts(accounts)
        })
    }, [refresh, accountRefresh])

    const submitRemoveCompanyAccount = (account: `0x${string}`, name: string, firstName: string) => {

        writeContractByFunctionName("updateCompanyAccount", account, name, firstName, "remove")
            .then(() => {
                setLoading(true)
                toast({
                    title: 'Suppression du compte.',
                    description: `Compte ${account} supprimé avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("Remove account error => " + err)
                toast({
                    title: 'Erreur',
                    description: "Impossible de supprimer le compte! " + account,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setRefresh(Math.random())
                setAccountRefresh(true)
            })
    }

    return (
        <div>

            {/*Show sites*/}
            <div className="rounded h-auto text-center border-gray-800 border bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg
                 md:basis-1 py-2 md:p-5 md:border-t-rose-500">

                <div className="flex justify-between px-2 md:px-0">
                    <div className="text-sm md:text-base text-center py-2">
                        <h1 className="text-rose-500">Utilisateurs</h1>
                    </div>

                    <AccountCompanyButton />
                </div>

                <div className="flex flex-col md:py-2">
                    <div className="hidden md:grid md:grid-cols-5 md:gap-0 border-b border-rose-500 bg-gray-700 font-bold
                        text-xs md:text-sm md:py-3 text-center md:text-center md:mb-2">
                        <div className="md:border-gray-900 md:border-x">#</div>
                        <div className="md:border-gray-900 md:border-x">Comptes</div>
                        <div className="md:border-gray-900 md:border-x">Nom</div>
                        <div className="md:border-gray-900 md:border-x">Prénom</div>
                        <div className="md:border-gray-900 md:border-x">X</div>
                    </div>
                    {/*{activeAccounts?.map((data: `0x${string}`[], index: number ) =>*/}
                    {activeAccounts?.map((data: ICompanyAccountUpdated, index: number ) =>
                        <div key={index} className="flex flex-col md:grid md:grid-cols-5 text-xs text-center
                             border-t border-t-gray-600 md:border-0  pb-3 md:p-0 md:my-0
                             bg-gradient-to-b from-gray-800 to-gray-900
                             md:bg-gradient-to-t md:from-gray-900 md:to-gray-900
                             hover:bg-gradient-to-t hover:from-gray-800 hover:to-gray-700 hover:text-cyan-300
                             active:bg-gradient-to-t active:from-cyan-500 active:to-cyan-400 active:text-gray-700
                            " >

                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">#</div>
                                    <div className="pl-1 md:p0">{index}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Clé</div>
                                    <div className="pl-1 md:p0">{data.account}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Nom</div>
                                    <div className="pl-1 md:p0">{data.name}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Prénom</div>
                                    <div className="pl-1 md:p0">{data.firstName}</div>
                                </div>
                            </div>

                            <button className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3"
                                    onClick={() => submitRemoveCompanyAccount(data.account as `0x${string}`, data.name, data.firstName)}>
                                <div className="flex justify-end md:block md:text-center border-b border-gray-700 md:border-0 p-2 md:p-0">
                                    <div className="font-bold md:hidden pl-1">Supprimer</div>
                                    <div className="hidden md:block">X</div>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};