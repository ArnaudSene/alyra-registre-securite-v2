import React from "react"
import { VerifierRootPage } from "@/app/[locale]/components/verifier/VerifierRootPage"
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs"

const VerifierPage = () => {
    return (
        <IsConnectedAs asVerifier={true}>
            <VerifierRootPage />
        </IsConnectedAs>
    )
}

export default VerifierPage