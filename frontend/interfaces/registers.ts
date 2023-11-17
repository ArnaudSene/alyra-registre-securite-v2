import { IVerificationTaskCreated, IVerificationTaskValidated, IVerificationTaskUpdated } from "./verificationTasks"
import { IVerifierProfile } from "./verifier"

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
export interface CompanyAccount {
    company: `0x${string}`
    active: boolean
}
export interface Register {
    siteName: string
    securitySector: string
}
export interface IRegisters {
    verificationTasks:  IVerificationTaskCreated[]
    verifiersProfile: IVerifierProfile[]
    registerCreated:  IRegisterCreated[]
    verificationTaskValidated:  IVerificationTaskValidated[]
    verificationTaskUpdated:  IVerificationTaskUpdated[]
    companyAccount: ICompanyAccountUpdated[]
}

