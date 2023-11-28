import React from "react"
import { IVerificationTaskConsolidated } from "@/interfaces/verificationTasks"
import { undefined } from "zod"
import CreateMetadata from "@/app/[locale]/test/pinata/CreateMetadata"

const metadataSample = {
    "task_id": "0",
    "status": "Approuvée",
    "sector": "Incendie",
    "type": "extincteur",
    "date": "24/07/2023 14:24:24",
    "company": {
        "account": "0xE4192BF486AeA10422eE097BC2Cf8c28597B9F11",
        "name": "Compagnie 1",
        "address": "800 Ohio Rd.Woodhaven, NY 11421",
        "site": "Ohio 1",
        "siteAddress": "800 Ohio Rd.Woodhaven, NY 11421",
        "siret": "123456",
        "accountCompany": {
            "account": "0xE4192BF486AeA10422eE097BC2Cf8c28597B9F11",
            "name": "McQueen",
            "firstName": "Steve"
        }
    },
    "verifier": {
        "account": "0x5a1C4Fb0AE5470B0a502b9395ff30E7292947c11",
        "name": "Verifier 1",
        "address": "797 Newcastle Street Fuquay Varina, NC 27526",
        "siret": "121212",
        "approvalNumber": "456987",
        "accountVerifier": {
            "account": "0x5a1C4Fb0AE5470B0a502b9395ff30E7292947c11",
            "name": "Smith",
            "firstName": "John"
        }
    }
}

const task: IVerificationTaskConsolidated = {
    company: "0xe4192bf486aea10422ee097bc2cf8c28597b9f11",
    companyAccount: "0xE4192BF486AeA10422eE097BC2Cf8c28597B9F11",
    companyAccountFirstName: "Hagen",
    companyAccountName: "De Hades",
    companyAddress: "800 Ohio Rd.Woodhaven, NY 11421",
    companyName: "Compagnie 1",
    companySiret: "123456",
    registerId: 0,
    securityType: "test",
    siteAddress: "800 Ohio Rd.Woodhaven, NY 11421",
    siteName: "Ohio 1",
    taskId: BigInt(47),
    taskStatus: BigInt(0),
    timeStamp: BigInt(1700756472),
    verifier: "0x5a1c4fb0ae5470b0a502b9395ff30e7292947c11",
    verifierAccount: "0x5a1c4fb0ae5470b0a502b9395ff30e7292947c11",
    verifierAddressName: "737 Redwood St.Branford, CT 06405",
    verifierApprovalNumber: "987654",
    verifierCompanyName: "Verificateur 1",
    verifierFirstName: "John",
    verifierName: "Smith",
    verifierSiret: "789456",
}


const MainMetadata = () => {

    // const task: IVerificationTaskConsolidated = {
    //
    // }

    return (
        <>
            <CreateMetadata props={task} />
        </>
    )
}

export default MainMetadata
