import { ChangeEvent } from "react"
import { Register } from "./registers"
import { IRegisterCreated } from "./registers"

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

}export interface IVerificationTaskGrid {
    pageTitle: string
    searchBar: string
    createVerificationButton: string
    sectors: string[]
    fieldGridTitle: string
    fieldGridValues: string[]
    fieldsubGridFirstTitle: string
    fieldsubGridFirstValues: string[]
    fieldsubGridSecondTitle: string
    fieldsubGridSecondValues: string[]
}

export interface IVerificationTaskGridMain {
    loading: boolean
    tasks: IVerificationTaskCreatedv2[]
    fieldsGrid: IVerificationTaskGrid
    first: number
    skip: number
    handlePagination: (first: number, skip: number) => void
}

export interface ITaskStatus {
    status: boolean
    id: string
}
export interface IFilterByCheckbox {
    checkboxes: { [key: string]: ITaskStatus }
    handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface IVerificationTaskFooter {
    eventSum: number
    first: number
    skip: number
    handlePagination: (first: number, skip: number) => void
}

export interface IVerificationTaskDetail {
    toggleLog: boolean
    index: number
    selectedTask: IVerificationTaskCreatedv2 | undefined
    fieldsGrid: IVerificationTaskGrid    
}

export interface IVerificationTaskGridRows {
    toggleLog: boolean
    task: IVerificationTaskCreatedv2
    selectedTask: IVerificationTaskCreatedv2 | undefined
    fieldsGrid: IVerificationTaskGrid    
    onClick: (data: IVerificationTaskCreatedv2, selectedTask: IVerificationTaskCreatedv2 | undefined) => void
}
export interface IVerificationTaskCreated {
    company: `0x${string}`
    verifier: `0x${string}`
    registerId: number
    securityType: string
    taskId: BigInt
    taskStatus: BigInt
    siteName: string
    timeStamp: BigInt
}
export interface IVerificationTaskValidated {
    verifier: `0x${string}`
    taskId: BigInt
    taskStatus: BigInt
}
export interface IVerificationTaskUpdated {
    company: `0x${string}`
    taskId: BigInt
    taskStatus: BigInt

}export interface IVerificationTask {
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
        siteAddress: string | undefined
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
export interface IVerificationTaskModalForm {
    registersCreated: IRegisterCreated[]
}

export interface IVerificationTaskModalFormNew {
    isModalOpen: boolean
    closeModal: () => void 
    verificationTaskModalForm: IVerificationTaskModalForm
}