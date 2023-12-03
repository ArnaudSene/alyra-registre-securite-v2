import React from "react"
import { VerifierRootPage } from "@/app/[locale]/components/verifier/VerifierRootPage"
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs"
import RestrictArea from "@/app/[locale]/components/RestrictArea"

const VerifierPage = () => {
    return (
        // <IsConnectedAs asVerifier={true}>
            <RestrictArea asVerifier={true}>
            <VerifierRootPage />
            </RestrictArea>
        // </IsConnectedAs>
    )
}

export default VerifierPage