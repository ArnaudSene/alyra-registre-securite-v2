import 'dotenv/config'
import {
    BaseError,
    ContractFunctionRevertedError,
    createPublicClient,
    GetLogsReturnType,
    http,
    HttpTransport,
    parseAbiItem
} from "viem"
import { hardhat, sepolia } from "viem/chains"
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core"
import { 
    CompanyAccountUpdatedsDocument, RegisterCreatedsDocument, 
    VerificationTaskCreatedsDocument, VerificationTaskUpdatedsDocument, 
    VerificationTaskValidatedsDocument, VerifierAccountUpdatedsDocument, 
    VerifierAddedToCompaniesDocument, VerifierCreatedsDocument,
    execute, 
    VerificationTaskCreatedByIDDocument
} from './../.graphclient/index'
import { abi, contractAddress, genesisBlock, httpTransport, network } from "@/constants"
import {
    CompanyAccountUpdated,
    RegisterCreated,
    VerificationTaskCreated,
    VerificationTaskUpdated,
    VerificationTaskValidated,
    VerifierAccountUpdated,
    VerifierAddedToCompany,
    VerifierCreated
} from "@/constants/events"
import {
    ICompanyAccountUpdated,
    IRegisters,
    IRegisterCreated
} from "@/interfaces/registers"
import { IVerifierAddedToCompany } from "@/interfaces/verifier"
import { IVerifierAccountUpdated, IVerifierCreated, IVerifierProfile } from "@/interfaces/verifier"
import {
    IVerificationTaskCreated,
    IVerificationTaskUpdated, IVerificationTaskValidated
} from "@/interfaces/verificationTasks"
import { RegisterVerificationId } from "@/constants/enums"


const usedNetwork = () => {
    switch (network) {
        case 'sepolia': return sepolia
        case 'hardhat': return hardhat
    }
}

const useHttp = (): HttpTransport => {
    switch (network) {
        case 'sepolia': return http(httpTransport)
        case 'hardhat': return http()
        default: return http()
    }
}
export const client = createPublicClient({
    chain: usedNetwork(),
    transport: useHttp()
})


export const readContractByFunctionName = async <T>(
    functionName: string,
    address: `0x${string}`,
    ...args: `0x${string}`[]|any[]
): Promise<T> => {

    try {
        const data: Promise<T>|unknown = await readContract({
            address: contractAddress,
            abi: abi,
            functionName: functionName,
            account: address,
            args: args
        })

        return data as T
    } catch (err) {
        throw formattedError(err)
    }
}

export const writeContractByFunctionName = async (
    functionName: string,
    ...args: `0x${string}`[]|any[]
): Promise<`0x${string}`> => {
    try {
        const { request } = await prepareWriteContract({
            address: contractAddress,
            abi: abi,
            functionName: functionName,
            args: args
        })

        const { hash } = await writeContract(request)
        
        return hash
    } catch (err) {
        throw formattedError(err)
    }
}


export const readEvents = async (signature: string): Promise<GetLogsReturnType<any>> => {
    try {
        return await client.getLogs({
            address: contractAddress,
            event: parseAbiItem([signature]),
            fromBlock: BigInt(genesisBlock),
            toBlock: 'latest'
        })
        
    } catch (err) {
        throw formattedError(err)
    }
}


export const readEventsDev = async (signature: string): Promise<GetLogsReturnType<any>> => {
    const blockNumber = await client.getBlockNumber()

    console.log("client.transport: " + client.transport.url)
    console.log("client.chain: " + client.chain.name)
    console.log(JSON.stringify(client))
    console.log("contractAddress: " + contractAddress)
    console.log("signature: " + signature)
    console.log("fromBlock: " + BigInt(genesisBlock))

    const event = {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_addr",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_addressName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_siret",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_siteName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "_siteAddressName",
                "type": "string"
            }
        ],
        "name": "RegisterCreated",
        "type": "event"
    } as const
    
    try {

        return await client.getLogs({
            address: contractAddress,
            event: event,
            fromBlock: blockNumber - 20n,
            toBlock: 'latest'
        })
        
    } catch (err) {
        throw formattedError(err)
    }
}

export const TestReadEvent = async () => {
    return readEventsDev(RegisterCreated)
        .then(events => {
            let data: IRegisterCreated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const registerCreated: IRegisterCreated = {
                    account: e._addr as `0x${string}`,
                    name: e._name,
                    addressName: e._addressName,
                    siret: e._siret,
                    siteName: e._siteName,
                    siteAddressName: e._siteAddressName
                }
                data.push(registerCreated)
            }

            return data
        })
}

// The Graph (GraphQL)

export const getRegisterCreateds = async () => {
    return execute(RegisterCreatedsDocument, {})
        .then((result)=> {
            let data: IRegisterCreated[] = []

            for (let i = 0; i < result?.data.registerCreateds.length; i++) {

                const e: any = result?.data.registerCreateds[i]
                const o: IRegisterCreated = {
                    account: e._addr as `0x${string}`,
                    name: e._name,
                    addressName: e._addressName,
                    siret: e._siret,
                    siteName: e._siteName,
                    siteAddressName: e._siteAddressName
                }
                data.push(o)
            }
            
            return data
        })
}

export const getCompanyAccountUpdateds = async () => {
    return execute(CompanyAccountUpdatedsDocument, {})
        .then((result)=> {
            let data: ICompanyAccountUpdated[] = []

            for (let i = 0; i < result?.data.companyAccountUpdateds.length; i++) {

                const e: any = result?.data.companyAccountUpdateds[i]
                const o: ICompanyAccountUpdated = {
                    company: e._company as `0x${string}`,
                    account: e._account as `0x${string}`,
                    name: e._name,
                    firstName: e._firstName,
                    action: e._action
                }
                data.push(o)
            }
            
            return data
        })
}

export const getVerifierCreateds = async () => {
    return execute(VerifierCreatedsDocument, {})
        .then((result)=> {
            let data: IVerifierCreated[] = []

            for (let i = 0; i < result?.data.verifierCreateds.length; i++) {

                const e: any = result?.data.verifierCreateds[i]
                const o: IVerifierCreated = {
                    verifier: e._verifier as `0x${string}`,
                    name: e._name,
                    addressName: e._addressName,
                    siret: e._siret,
                    approvalNumber: e._approvalNumber,
                }
                data.push(o)
            }
            
            return data
        })
}

export const getVerifierAccountUpdateds = async () => {
    return execute(VerifierAccountUpdatedsDocument, {})
        .then((result)=> {
            let data: IVerifierAccountUpdated[] = []

            for (let i = 0; i < result?.data.verifierAccountUpdateds.length; i++) {

                const e: any = result?.data.verifierAccountUpdateds[i]
                const o: IVerifierAccountUpdated = {
                    verifier: e._verifier as `0x${string}`,
                    account: e._account,
                    name: e._name,
                    firstName: e._firstName,
                    action: e._action,
                }
                data.push(o)
            }
            
            return data
        })
}


export const getVerifierAddedToCompanies = async () => {
    return execute(VerifierAddedToCompaniesDocument, {})
        .then((result)=> {
            let data: IVerifierAddedToCompany[] = []

            for (let i = 0; i < result?.data.verifierAddedToCompanies.length; i++) {

                const e: any = result?.data.verifierAddedToCompanies[i]
                const o: IVerifierAddedToCompany = {
                    verifier: e._verifier as `0x${string}`,
                    company: e._company,
                }
                data.push(o)
            }
            
            return data
        })
}


export const getVerificationTaskCreateds = async (
    first: number,
    skip: number,
    company?: `0x${string}`,
) => {
    interface IParams {
        _company?: `0x${string}`,
        first: number,
        skip: number
    }

    let params: IParams = {
        first: first,
        skip: skip
    }

    if ( company ) params._company = company

    console.log(params)

    const query = company ? execute(VerificationTaskCreatedByIDDocument, params) : execute(VerificationTaskCreatedsDocument, params)
    console.log(query)

    return query
        .then((result)=> {
            let data: IVerificationTaskCreated[] = []

            for (let i = 0; i < result?.data.verificationTaskCreateds.length; i++) {

                const e: any = result?.data.verificationTaskCreateds[i]
                const o: IVerificationTaskCreated = {
                    company: e._company as `0x${string}`,
                    verifier: e._verifier as `0x${string}`,
                    registerId: e._registerId,
                    securityType: e._securityType,
                    taskId: e._taskId,
                    taskStatus: e._taskStatus,
                    siteName: e._siteName,
                    timeStamp: e._timestamp
                }
                data.push(o)
            }
            
            return data
        })
}

export const getVerificationTaskValidateds = async () => {
    return execute(VerificationTaskValidatedsDocument, {})
        .then((result)=> {
            let data: IVerificationTaskValidated[] = []

            for (let i = 0; i < result?.data.verificationTaskValidateds.length; i++) {

                const e: any = result?.data.verificationTaskValidateds[i]
                const o: IVerificationTaskValidated = {
                    verifier: e._verifier as `0x${string}`,
                    taskId: e._taskId,
                    taskStatus: e._taskStatus
                }
                data.push(o)
            }
            
            return data
        })
}

export const getVerificationTaskUpdateds = async () => {
    return execute(VerificationTaskUpdatedsDocument, {})
        .then((result)=> {
            let data: IVerificationTaskUpdated[] = []

            for (let i = 0; i < result?.data.verificationTaskUpdateds.length; i++) {

                const e: any = result?.data.verificationTaskUpdateds[i]
                const o: IVerificationTaskUpdated = {
                    company: e._company as `0x${string}`,
                    taskId: e._taskId,
                    taskStatus: e._taskStatus
                }
                data.push(o)
            }
            
            return data
        })
}


const defaultFirst = 10

export const getVerificationTasksFromEvents = async (
    id?: `0x${string}`,
    first: number = defaultFirst,
    skip: number = 0,
): Promise<IRegisters> => {

    const verificationTaskCreateds = await getVerificationTaskCreateds(first, skip, id)
    console.log(`verificationTaskCreateds:`)
    console.log(verificationTaskCreateds)
    const registerCreated = await getRegisterCreateds()
    const verificationTaskValidated = await getVerificationTaskValidateds()
    const verificationTaskUpdated = await getVerificationTaskUpdateds()
    const companyAccount = await getCompanyAccountUpdateds()
    const verifiersAsCompany = await getVerifierCreateds()
    const verifiersAsAccount = await getVerifierAccountUpdateds()
    let verifiersProfile: IVerifierProfile[] = []

    verifiersAsAccount.map((verifierAccount) => {

        const i = verifiersAsCompany.findIndex(
            (verifierAsAccount) => verifierAsAccount.verifier === verifierAccount.verifier)

        if (i !== -1) {
            verifiersProfile.push({
                verifier: verifierAccount.verifier,
                account: verifierAccount.account,
                name: verifierAccount.name,
                firstName: verifierAccount.firstName,
                nameCompany: verifiersAsCompany[i].name,
                addressName: verifiersAsCompany[i].addressName,
                siret: verifiersAsCompany[i].siret,
                approvalNumber: verifiersAsCompany[i].approvalNumber
            })
        }
    })

    const data: IRegisters = {
        verificationTasks: verificationTaskCreateds,
        verifiersProfile: verifiersProfile,
        registerCreated: registerCreated,
        verificationTaskValidated: verificationTaskValidated,
        verificationTaskUpdated: verificationTaskUpdated,
        companyAccount: companyAccount
    }

    return data
}



// SecurityRegister Smart contract methods

export const getVerificationTaskStatus = async (address: `0x${string}`, taskId: bigint): Promise<bigint> => {
    return readContractByFunctionName<bigint>('getVerificationTaskStatus', address, taskId)
        .then(taskStatus => taskStatus)
        .catch((err) => {
            console.log(err)
            return BigInt("0")
        })
}


export const isVerifierAccount = async (address: `0x${string}`, _account: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<boolean>('isVerifierAccount', address, _account )
        .then(value => value)
}

export const isCompanyAccount = async (address: `0x${string}`, _account: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<boolean>('isCompanyAccount', address, _account )
        .then(value => value)
}


export const isCompanyFromContract = async (address: `0x${string}`): Promise<boolean> => {
    return readContractByFunctionName<boolean>('isCompany', address, address )
        .then(value => value)
}


// write contract


export const safeMint = async (_tokenId: bigint, _tokenURI: string) => {
    writeContractByFunctionName('safeMint', _tokenId, _tokenURI)
        .then(hash => console.log("safeMint => " + hash))
        .catch(err => console.log("safeMint error => " + err))
}


const formattedError = (err: any): Error => {
    if (err instanceof BaseError) {
        // Option 1: checking the instance of the error
        if (err.cause instanceof ContractFunctionRevertedError) {
            const cause: ContractFunctionRevertedError = err.cause
            const error = cause.reason ?? 'Unknown error'

            throw new Error(error)
        }

        // Option 2: using `walk` method from `BaseError`
        const revertError: any = err.walk(err => err instanceof ContractFunctionRevertedError)
        if (revertError) {
            const error = revertError.data?.message ?? 'Unknown error'

            throw new Error(error)
        }
    }


    throw new Error(err.message)
}



// Events

export const getVerificationTaskUpdatedEvents = async () => {
    return readEvents(VerificationTaskUpdated)
        .then(events => {
            let data: IVerificationTaskUpdated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const verificationTaskUpdated = {
                    company: e._company,
                    taskId: e._taskId,
                    taskStatus: e._taskStatus
                }
                data.push(verificationTaskUpdated)
            }
            return data
        })
}


export  const getRegisterCreatedEvents = async () => {
    return readEvents(RegisterCreated)
        .then(events => {
            let data: IRegisterCreated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const registerCreated: IRegisterCreated = {
                    account: e._addr as `0x${string}`,
                    name: e._name,
                    addressName: e._addressName,
                    siret: e._siret,
                    siteName: e._siteName,
                    siteAddressName: e._siteAddressName
                }
                data.push(registerCreated)
            }

            return data
        })
}


export  const getCompanyAccountUpdatedEventsv2 = async () => {
    return readEvents(CompanyAccountUpdated)
        .then(events => {
            let data: ICompanyAccountUpdated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const companyAccountUpdated: ICompanyAccountUpdated = {
                    company: e._company,
                    account: e._account,
                    name: e._name,
                    firstName: e._firstName,
                    action: e._action
                }
                data.push(companyAccountUpdated)
            }
            return data
        })
}
export  const getCompanyAccountUpdatedEvents = async () => {
    return readEvents(CompanyAccountUpdated)
        .then(events => {
            let data: any[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                data.push([e._company, e._account, e._name, e._firstName, e._action])
            }
            return data
        })
}


export  const getVerifierAddedToCompanyEvents = async () => {
    return readEvents(VerifierAddedToCompany)
        .then(events => {
            let data: any[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                data.push([e._company, e._verifier])
            }
            return data
        })
}

export  const getVerifierAddedToCompanyEventsv2 = async () => {
    return readEvents(VerifierAddedToCompany)
        .then(events => {
            let data: IVerifierAddedToCompany[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const verifierAddedToCompany: IVerifierAddedToCompany = {
                    company: e._company,
                    verifier: e._verifier
                }
                data.push(verifierAddedToCompany)
            }
            return data
        })
}

export  const getVerificationTaskCreatedEventsv2 = async () => {
    return readEvents(VerificationTaskCreated)
        .then(events => {
            let data: IVerificationTaskCreated[] = []
            
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const verificationTaskCreated: IVerificationTaskCreated = {
                    company: e._company,
                    verifier: e._verifier,
                    registerId: e._registerId,
                    securityType: e._securityType,
                    taskId: e._taskId,
                    taskStatus: e._taskStatus,
                    siteName: e._siteName,
                    timeStamp: e._timestamp
                }

                data.push(verificationTaskCreated)
            }
            return data
        })
}

export  const getVerificationTaskCreatedEvents = async () => {
    return readEvents(VerificationTaskCreated)
        .then(events => {
            let data: any[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                data.push([e._company, e._verifier, e._registerId, e._securityType, e._taskId, e._taskStatus])
            }
            return data
        })
}

export const getVerificationTaskValidatedEvents = async () => {
    return readEvents(VerificationTaskValidated)
        .then(events => {
            let data: any[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                data.push([e._verifier, e._taskId, e._taskStatus])
            }
            return data
        })
}

export const getVerificationTaskValidatedEventsv2 = async () => {
    return readEvents(VerificationTaskValidated)
        .then(events => {
            let data: IVerificationTaskValidated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const verificationTaskValidated: IVerificationTaskValidated = {
                    verifier: e._verifier,
                    taskId: e._taskId,
                    taskStatus: e._taskStatus
                }
                data.push(verificationTaskValidated)
            }
            return data
        })
}

export const getRegisterVerification = (registerId: number): string => {
    return RegisterVerificationId[registerId]
}

export const getRegisterVerifications = (): string[] => {
    return [...RegisterVerificationId]
}

export const convertTimestampToDate = (timestamp: number) => {
    const dateObject = new Date(timestamp * 1000)

    let date = new Intl.DateTimeFormat("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).format(dateObject)
    return date
}

// Verifier section


export const getVerifiersProfile = async (): Promise<IVerifierProfile[]> => {
    let verifiersProfile: IVerifierProfile[] = []

    const verifiersAsCompany = await getVerifierCreatedEvents()
    const verifiersAsAccount = await getVerifierAccountUpdatedEventsv2()

    verifiersAsAccount.map((verifierAccount) => {

        const i = verifiersAsCompany.findIndex(
            (verifierAsAccount) => verifierAsAccount.verifier === verifierAccount.verifier)

        if (i !== -1) {
            verifiersProfile.push({
                verifier: verifierAccount.verifier,
                account: verifierAccount.account,
                name: verifierAccount.name,
                firstName: verifierAccount.firstName,
                nameCompany: verifiersAsCompany[i].name,
                addressName: verifiersAsCompany[i].addressName,
                siret: verifiersAsCompany[i].siret,
                approvalNumber: verifiersAsCompany[i].approvalNumber
            })
        }
    })

    return verifiersProfile
}


export const getVerifierProfileByAccountv2 = async (account: string): Promise<IVerifierProfile | undefined> => {
    const data = await getVerifiersProfile()

    let _verifierProfile: IVerifierProfile | undefined

    data.map((verifierProfile) => {
        if (verifierProfile.account === account || verifierProfile.verifier === account)
            _verifierProfile = verifierProfile
    });

    return _verifierProfile
}


export const getVerifierCreatedEvents = async () => {
    return readEvents(VerifierCreated)
        .then(events => {
            let data: IVerifierCreated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const verifierCreated = {
                    verifier: e._verifier,
                    name: e._name,
                    addressName: e._addressName,
                    siret: e._siret,
                    approvalNumber: e._approvalNumber
                }
                data.push(verifierCreated)
            }
            return data
        })
}


export  const getVerifierAccountUpdatedEventsv2 = async () => {
    return readEvents(VerifierAccountUpdated)
        .then(events => {
            let data: IVerifierAccountUpdated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                const verifierAccountUpdated: IVerifierAccountUpdated = {
                    verifier: e._verifier,
                    account: e._account,
                    name: e._name,
                    firstName: e._firstName,
                    action: e._action
                }

                data.push(verifierAccountUpdated)
            }
            return data
        })
}

export  const getVerifierAccountUpdatedEvents = async () => {
    return readEvents(VerifierAccountUpdated)
        .then(events => {
            let data: any[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i]
                data.push([e._verifier, e._account, e._name, e._firstName, e._action])
            }
            return data
        })
}
