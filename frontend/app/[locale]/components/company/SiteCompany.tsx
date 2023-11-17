'use client'

import { useEffect, useState } from "react"
import { useIdentityContext } from "@/contexts/Identity"
import { IRegisterCreated } from "@/interfaces/registers"
import { getRegisterCreatedEvents } from "@/utils"
import { SiteCompanyButton } from "@/app/[locale]/components/company/SiteCompanyButton"

export const SiteCompany = () => {
    const { addSiteRefresh } = useIdentityContext()
    const [sites, setSites ] = useState<IRegisterCreated[]>([])

    useEffect(() => {
        getRegisterCreatedEvents().then(data => setSites(data))
    }, [addSiteRefresh])

    return (
        <div>

            {/*Show sites*/}
            <div className="rounded h-auto text-center border-gray-800 border bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg
                 md:basis-1 py-2 md:p-5 md:border-t-rose-500">

                <div className="flex justify-between px-2 md:px-0">
                    <div className="text-sm md:text-base text-center py-2">
                        <h1 className="text-rose-500">Vos sites</h1>
                    </div>

                    <SiteCompanyButton />
                </div>

                <div className="flex flex-col md:py-2">
                    <div className="hidden md:grid md:grid-cols-3 md:gap-0 border-b border-rose-500 bg-gray-700 font-bold
                        text-xs md:text-sm md:py-3 text-center md:text-center md:mb-2">
                        <div className="md:border-gray-900 md:border-x">#</div>
                        <div className="md:border-gray-900 md:border-x">Nom du site</div>
                        <div className="md:border-gray-900 md:border-x">Adresse</div>
                    </div>
                    {sites.map((data: IRegisterCreated, index) =>
                        <div key={index} className="flex flex-col md:grid md:grid-cols-3 text-xs text-center
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
                                    <div className="font-bold w-2/12 md:hidden pl-1">Site</div>
                                    <div className="pl-1 md:p0">{data.siteName}</div>
                                </div>
                            </div>
                            <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                <div className="flex md:block">
                                    <div className="font-bold w-2/12 md:hidden pl-1">Adresse</div>
                                    <div className="pl-1 md:p0">{data.siteAddressName}</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}