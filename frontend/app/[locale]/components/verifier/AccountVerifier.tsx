'use client'

import {
    getVerifierAccountUpdatedEvents,
    writeContractByFunctionName
} from "@/utils";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {useToast} from "@chakra-ui/react";
import {useIdentityContext} from "@/contexts/Identity";
import {AccountVerifierButton} from "@/app/[locale]/components/verifier/AccountVerifierButton";


export const AccountVerifier = () => {
    const { address, isConnected} = useAccount()
    const {setRefreshScreen, refreshScreen, accountRefresh} = useIdentityContext()

    const toast = useToast()

    const [activeAccounts, setActiveAccounts ] = useState<any[][]>([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {

        getVerifierAccountUpdatedEvents().then(data => {
            const _accounts: Map<`0x${string}`, string> = new Map();
            const _accounts2: Map<`0x${string}`, string[]> = new Map();

            for (let i = 0; i < data.length; i++) {
                const _address: `0x${string}` = data[i][0]
                const _account: `0x${string}` = data[i][1]
                const _name: `0x${string}` = data[i][2]
                const _firstName: `0x${string}` = data[i][3]
                const _action: string = data[i][4]

                if(_address == address) {

                    if(_accounts.get(_account) == "add" && _action == "remove") {
                        _accounts.delete(_account)
                        _accounts2.delete(_account)
                    }
                    if (_action == "add") {
                        _accounts.set(_account, _action)
                        _accounts2.set(_account, [_name, _firstName, _action])
                    }
                }
            }

            const accounts: `0x${string}`| string[][] = []
            _accounts2.forEach((data, account) => {
                accounts.push([account, data[0], data[1], data[2]])
            })
            setActiveAccounts(accounts)
        })
    }, [isConnected, refreshScreen])

    const submitRemoveVerifierAccount = (account: `0x${string}`, name: string, firstName: string) => {
        writeContractByFunctionName("updateVerifierAccount", account, name, firstName, "remove")
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
                // setRefresh(Math.random())
                setRefreshScreen(Math.random())
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

                    <AccountVerifierButton />
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
                    {activeAccounts?.map((data: `0x${string}`[], index: number ) =>
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
                                    <div className="pl-1 md:p0">{data[0]}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Nom</div>
                                    <div className="pl-1 md:p0">{data[1]}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Prénom</div>
                                    <div className="pl-1 md:p0">{data[2]}</div>
                                </div>
                            </div>

                            <button className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3"
                                    onClick={() => submitRemoveVerifierAccount(data[0] as `0x${string}`, data[1], data[2])}>
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