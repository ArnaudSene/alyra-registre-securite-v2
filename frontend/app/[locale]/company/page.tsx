'use client'

import { useState } from "react"
import Loader from "@/app/[locale]/components/Loader"
import {CompanyRootPage} from "@/app/[locale]/components/company/CompanyRootPage";
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs";
import {useIdentityContext} from "@/contexts/Identity";

const CompanyPage = () => {
    const { company, verifier } = useIdentityContext()
    const [loading] = useState(false)

    return (
        <Loader isLoading={loading}>
            <IsConnectedAs asCompany={true}>
                <CompanyRootPage />
            </IsConnectedAs>
        </Loader>
  )
}

export default CompanyPage;