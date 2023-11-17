'use client'

import { useState } from "react"
import { useIdentityContext } from "@/contexts/Identity"
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs"
import Loader from "@/app/[locale]/components/Loader"
import { headerFooterIntl } from "@/utils/intl"
import { IHeaderFooter } from "@/interfaces/intl"


const Member = () => {
    const { company, verifier, setCompany, setVerifier } = useIdentityContext()
    const [loading, setLoading] = useState(false)
    const headerIntl: IHeaderFooter = headerFooterIntl()

    return (
        <div className="mb-10">

            {/* Dans cette section, on doit vérifier si le user est un membre */}
            {/* interroger les events pout vérifier si c'Est un membre et quel type de membre */}

            <Loader isLoading={loading}>
                <IsConnectedAs asVerifier={true} asCompany={true}>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className='p-2 md:w-1/2 z-10'>
                            <div className='text-slate-700'>
                                
                                <h1 className='md:pt-20 pb-2 md:pb-3 md:pl-10 font-extrabold 
                                    text-1xl md:text-4xl text-slate-800'>
                                    {headerIntl.member}
                                </h1>

                                {company && <div>Company</div>}
                                {verifier && <div>Verifier</div>}
                            </div>
                        </div>
                    </div>
                </IsConnectedAs>
            </Loader>
        </div>
    )   
}

export default Member