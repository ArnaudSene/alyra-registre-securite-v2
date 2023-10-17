// Interface related to events

export interface IVerifierProfile {
    verifier: `0x${string}`
    account: `0x${string}`
    name: string
    firstName: string
    nameCompany: string
    addressName: string
    siret: string
    approvalNumber: string
}


export interface IVerifierAccountUpdated {
    verifier: `0x${string}`
    account: `0x${string}`
    name: string
    firstName: string
    action: string
}

export interface IVerifierCreated {
    verifier: `0x${string}`
    name: string
    addressName: string
    siret: string
    approvalNumber: string
}


export interface IRegisterCreated {
    account: `0x${string}`
    name: string
    addressName: string
    siret: string
    siteName: string
    siteAddressName: string
}





export interface ICompanyAccountUpdated {
    company: `0x${string}`
    account: `0x${string}`
    name: string
    firstName: string
    action: string
}



export interface IVerifierAddedToCompany {
    company: `0x${string}`
    verifier: `0x${string}`
}

export interface IVerificationTaskCreated {
    company: `0x${string}`,
    verifier: `0x${string}`,
    registerId: number,
    securityType: string,
    taskId: BigInt,
    taskStatus: BigInt
    siteName: string,
    timeStamp: BigInt
}

export interface IVerificationTaskCreatedv2 {
    company: `0x${string}`
    companyName: string
    companyAddress: string
    siteName: string
    siteAddress: string
    companySiret: string
    companyAccount: `0x${string}`
    companyAccountName: string
    companyAccountFirstName: string

    registerId: number
    securityType: string
    taskId: BigInt
    taskStatus: BigInt
    timeStamp: BigInt

    verifier: `0x${string}`
    verifierCompanyName: string
    verifierAddressName: string
    verifierSiret: string
    verifierApprovalNumber: string

    verifierAccount: `0x${string}`
    verifierName: string
    verifierFirstName: string
}

export interface IVerificationTaskValidated {
    verifier: `0x${string}`,
    taskId: BigInt,
    taskStatus: BigInt
}

export interface IVerificationTaskUpdated {
    company: `0x${string}`
    taskId: BigInt
    taskStatus: BigInt
}




// -----------------------------
export interface CompanyAccount {
    company: `0x${string}`
    active: boolean
}

export interface Register {
    siteName: string
    securitySector: string
}

export interface VerificationTask {
    register: Register
    verifier: `0x${string}`
    securityType: string
    date: BigInt
    taskStatus: string
}


export interface IVerificationTaskMetadata {

    task_id: number
    status: string
    sector: string
    type: string
    date: string
    timestamp: number
    accountCompany: {
        account: `0x${string}` | undefined
        name: string | undefined
        firstName: string | undefined
    }
    company: {
        account: `0x${string}`
        name: string | undefined
        address: string | undefined
        site: string
        siteAddress: string | undefined;
        siret: string | undefined
    }
    verifier: {
        account: `0x${string}`
        name: string | undefined
        address: string | undefined
        siret: string | undefined
        approvalNumber: string | undefined
    }
}
