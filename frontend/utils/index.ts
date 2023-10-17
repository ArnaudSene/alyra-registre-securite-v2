import {abi, contractAddress, genesisBlock, httpTransport, network} from "@/constants"
import { readContract, prepareWriteContract, writeContract } from "@wagmi/core"
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
import {
    CompanyAccountUpdated,
    RegisterCreated,
    VerificationTaskCreated,
    VerificationTaskUpdated,
    VerificationTaskValidated,
    VerifierAccountUpdated,
    VerifierAddedToCompany,
    VerifierCreated
} from "@/constants/events";
import {
    ICompanyAccountUpdated,
    IRegisterCreated, IVerificationTaskCreated,
    IVerificationTaskUpdated, IVerificationTaskValidated, IVerifierAccountUpdated, IVerifierAddedToCompany,
    IVerifierCreated, IVerifierProfile
} from "@/interfaces/company";
import {RegisterVerificationId} from "@/constants/enums";
import 'dotenv/config'


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

export const readEventsFromTheGraph = async (signature: string): Promise<GetLogsReturnType<any>> => {
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

// export const getRegisterCreatedEvents = async (): Promise<GetLogsReturnType<any>> => {
//     try {
//         return await client.getLogs({
//             address: contractAddress,
//             event: parseAbiItem(RegisterCreated),
//             fromBlock: BigInt(genesisBlock),
//             toBlock: 'latest'
//         })
//     } catch (err) {
//         throw formattedError(err)
//     }
// }

// export const getCompanyAccountAddedEvents = async (): Promise<GetLogsReturnType<any>> => {
//     try {
//         return await client.getLogs({
//             address: contractAddress,
//             event: parseAbiItem(CompanyAccountAdded),
//             fromBlock: BigInt(genesisBlock),
//             toBlock: 'latest'
//         })
//     } catch (err) {
//         throw formattedError(err)
//     }
// }


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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
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
    }).format(dateObject);
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
    const data = await getVerifiersProfile();

    let _verifierProfile: IVerifierProfile | undefined;

    data.map((verifierProfile) => {
        if (verifierProfile.account === account || verifierProfile.verifier === account)
            _verifierProfile = verifierProfile;
    });

    return _verifierProfile;
};


export const getVerifierCreatedEvents = async () => {
    return readEvents(VerifierCreated)
        .then(events => {
            let data: IVerifierCreated[] = []
            for (let i = 0; i < events.length; i++) {
                const e: any = events[i].args
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
                const e: any = events[i].args
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
                const e: any = events[i].args
                data.push([e._verifier, e._account, e._name, e._firstName, e._action])
            }
            return data
        })
}
