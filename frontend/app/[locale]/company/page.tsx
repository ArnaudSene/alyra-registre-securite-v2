import React from "react"
import { CompanyRootPage } from "@/app/[locale]/components/company/CompanyRootPage"
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs"

const CompanyPage = () => {
    return (
        <IsConnectedAs asCompany={true}>
            <CompanyRootPage />
        </IsConnectedAs>
    )
}

export default CompanyPage