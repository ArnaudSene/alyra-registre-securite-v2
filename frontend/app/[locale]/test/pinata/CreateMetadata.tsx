"use client"

import {
    IVerificationTaskConsolidated,
    IVerificationTaskMetadata
} from "@/interfaces/verificationTasks"
import { getTaskEditStatusName } from "@/utils/verificationTasks"
import { convertTimestampToDate, getRegisterVerification } from "@/utils"
import { checkPinata, getMetadataFromIPFS, saveMetadataToIPFS } from "@/utils/metadata"
import { useEffect, useState } from "react"
import { PinataPinListResponse, PinataPinResponse } from "@pinata/sdk"

const SaveMetadataToIPFS = ({props}: {props: IVerificationTaskConsolidated}) => {

    const verificationTaskMetadata: IVerificationTaskMetadata = {
        taskId: props.taskId.toString(),
        status: getTaskEditStatusName(Number(props.taskStatus)),
        sector: getRegisterVerification(Number(props.registerId)),
        type: props.securityType,
        date: convertTimestampToDate(Number(props.timeStamp)),
        timestamp: props.timeStamp.toString(),
        company: {
            account: props.company,
            name: props.companyName,
            address: props.companyAddress,
            siret: props.companySiret,
            site: props.siteName,
            siteAddress: props.siteAddress,
            companyAccount: {
                account: props.companyAccount,
                firstName: props.companyAccountFirstName,
                name: props.companyAccountName
            },
        },
        verifier: {
            account: props.verifier,
            name: props.verifierCompanyName,
            address: props.verifierAddressName,
            siret: props.verifierSiret,
            approvalNumber: props.verifierApprovalNumber,
            verifierAccount: {
                account: props.verifierAccount,
                firstName: props.verifierFirstName,
                name: props.verifierName
            }
        },
    }

    const [isPinataConnected, setIsPinataConnected] = useState(false)
    const checkPinataConnection = () => {
        checkPinata()
            .then((result) => {
                console.log(result)
                setIsPinataConnected(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    interface NewPinataPinResponse extends PinataPinResponse {
        isDuplicate?: boolean
    }
    const [saveLog, setSaveLog] = useState<NewPinataPinResponse | undefined>(undefined)
    const [urlMetadata, setUrlMetadata] = useState("")
    const [ipfsEndpoint, setIpfsEndpoint] = useState("https://ipfs.io/ipfs/")

    const saveTask = () => {
        const fileName = `security-register-taskId-${verificationTaskMetadata.taskId}`

        saveMetadataToIPFS(fileName, verificationTaskMetadata)
            .then((data) => {
                const d: NewPinataPinResponse = data
                setSaveLog(d)
                setUrlMetadata(`${ipfsEndpoint}${d.IpfsHash}`)
                console.log('data', data)
                console.log('d', d)
            })
    }

    const [metadata, setMetadata] = useState<PinataPinListResponse | undefined>()
    const getMetadata = (taskId: string = "") => {
        const fileName = `security-register-taskId-${taskId}`
        getMetadataFromIPFS(fileName)
            .then((response) => {
                console.log('data', response)
                setMetadata(response)
            })
    }

    useEffect(() => {
        checkPinataConnection()
        getMetadata()
    }, []);

    return (
        <>
            <div className={`py-4`}>
                <div className={`flex flex-col py-2`}>
                    <div><h1 className={`font-bold text-lg`}>Save Metadata to IPFS - Pinata</h1></div>
                    <div className={`flex`}>
                        <div className={`p-1`}>Connected to pinata:</div>
                        <div className={``}>
                            <div className={`
                            ${isPinataConnected ? 'bg-green-500 border-lime-400' : 'bg-rose-500 border-rose-500'} 
                            p-1 rounded border w-16 text-center relative overflow-hidden`}>

                                <span className="absolute -inset-0.5 bg-cyan-400 opacity-50 rounded-md filter blur-md"></span>
                                {isPinataConnected.toString()}
                            </div>
                        </div>


                    </div>

                </div>

                <div className={`p-2`}>
                    <button
                        className={`rounded p-2 bg-gray-950/80 text-rose-500`}
                        onClick={saveTask}
                        type="button">Save task
                    </button>

                    <div className={`w-fit p-2 bg-gray-950/70 rounded border border-gray-300/70 text-slate-100`}>
                        <h2 className={`px-1 font-bold`}>Logs</h2>
                        <div className={`flex text-xs`}>
                            <div className={`font-semibold w-[100px] px-1`}>IpfsHash:</div>
                            <div className={`px-1 text-cyan-400`}>{saveLog?.IpfsHash}</div>
                        </div>

                        <div className={`flex text-xs`}>
                            <div className={`font-semibold w-[100px] px-1`}>PinSize:</div>
                            <div className={`px-1 text-cyan-400`}>{saveLog?.PinSize}</div>
                        </div>

                        <div className={`flex text-xs`}>
                            <div className={`font-semibold w-[100px] px-1`}>Timestamp:</div>
                            <div className={`px-1 text-cyan-400`}>{saveLog?.Timestamp}</div>
                        </div>

                        <div className={`flex text-xs`}>
                            <div className={`font-semibold w-[100px] px-1`}>isDuplicated:</div>
                            <div className={`px-1 text-cyan-400`}>{saveLog?.isDuplicate?.toString()}</div>
                        </div>

                        <div className={`flex text-xs`}>
                            <div className={`font-semibold w-[100px] px-1`}>IPFS Metadata:</div>
                            <div className={`px-1 text-amber-400`}>
                                <a href={urlMetadata || "NA"}>{urlMetadata}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`p-2`}>
                    <button
                        className={`rounded p-2 bg-gray-950/80 text-rose-500`}
                        onClick={() => getMetadata("34")}
                        type="button">Get metadata
                    </button>

                    <div className={`w-fit p-2 bg-gray-950/70 rounded border border-gray-300/70 text-slate-100`}>
                        <h2 className={`px-1 font-bold`}>Logs</h2>
                        <div className={`flex text-xs`}>
                            <div className={`font-semibold w-[100px] px-1`}>IpfsHash:</div>
                            <div className={`px-1 text-cyan-400`}>{metadata?.rows[0].ipfs_pin_hash}</div>
                        </div>

                        <div className={`font-semibold w-[100px] px-1`}>metadata:</div>
                        {metadata?.rows.map((row, index) => (
                            <div key={index} className={`flex text-xs`}>
                                <div className={`font-semibold w-[100px] px-1`}>name:</div>
                                <div  className={`flex text-xs`}>
                                    <div className={`px-1 text-cyan-400`}>{index}</div>
                                    <div className={`px-1 text-amber-400`}>
                                        <a href={`${ipfsEndpoint}${row.ipfs_pin_hash}` || ""}>
                                            {`${ipfsEndpoint}${row.ipfs_pin_hash}`}
                                        </a>
                                    </div>

                                    <div className={`px-1 text-cyan-400`}>{JSON.stringify(row.metadata.name)}</div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
        </>
    )
}

export default SaveMetadataToIPFS
