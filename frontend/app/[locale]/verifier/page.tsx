'use client'

import { useState } from "react"
import Loader from "@/app/[locale]/components/Loader";
import {VerifierRootPage} from "@/app/[locale]/components/verifier/VerifierRootPage";
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs";

const VerifierPage = () => {
    const [loading, setLoading] = useState(false)

    return (
        <Loader isLoading={loading}>
             <IsConnectedAs asVerifier={true}>
                <VerifierRootPage />
             </IsConnectedAs>
        </Loader>
  )
}

export default VerifierPage;