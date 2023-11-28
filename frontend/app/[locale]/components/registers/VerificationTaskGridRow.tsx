'use client'

import React, { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from "react";
import {
    IVerificationTaskGridRow,
    IVerificationTaskMetadata
} from "@/interfaces/verificationTasks";
import { useAccount } from "wagmi";
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent";
import {
    IGeneral,
    ILayoutEventLog,
    IToasterMessages,
    IVerificationTaskEditStatus,
    IVerificationTaskFilters, IVerificationTaskFinalStatus
} from "@/interfaces/intl";
import {
    layoutEventLogIntl,
    toasterMessages,
    verificationTaskFiltersIntl,
    verificationTaskEditStatusIntl,
    generalIntl, verificationTaskFinalStatusIntl
} from "@/utils/intl"
import { IEventLog, IhandleEventsResponse, ILayoutEventLogMapping } from "@/interfaces/layout";
import { useToast } from "@chakra-ui/react";
import { handleEvents } from "@/utils/events";
import { UpdateTaskStatus, VALID_TASK_STATUS_FOR_MINTING_NFT } from "@/constants/enums";
import { convertTimestampToDate, getRegisterVerification, writeContractByFunctionName } from "@/utils"
import { FormSelectLayout } from "@/app/[locale]/components/layout/FormInputLayout"
import { SubscribeEvent } from "@/app/[locale]/components/base/SubscribeEvent"
import { saveMetadataToIPFS } from "@/utils/metadata"
import { PinataPinResponse } from "@pinata/sdk"
import { IPFS_BASE_URL } from "@/constants"

export const VerificationTaskGridRow = ({props}: { props: IVerificationTaskGridRow }) => {
    interface ITaskStatusEditAndUpdate {
        editableTasks: number[]
        updatedTasks: number[]
    }
    interface ITaskStatusEditAndUpdateProfile {
        company: ITaskStatusEditAndUpdate
        verifier: ITaskStatusEditAndUpdate
    }

    const taskStatusEditAndUpdateProfile: ITaskStatusEditAndUpdateProfile = {
        company: {
            editableTasks: [1],
            updatedTasks: [2, 3, 4]
        },
        verifier: {
            editableTasks: [0],
            updatedTasks: [1]
        },
    }
    interface IAllowEditStatus {
        company: number[]
        verifier: number[]
    }
    const allowEditStatus: IAllowEditStatus = {
        company: [1],
        verifier: [0]
    }
    interface ISubmitTaskStatus {
        action: string
        taskId: string
    }
    interface IVerificationStatus {
        id: string
        value: string
        label: string
    }
    interface Mapping {
        [key: string]: string;
    }
    const _mapping: Mapping = {
        company: "_company",
        verifier: "_verifier"
    }
    interface NewPinataPinResponse extends PinataPinResponse {
        isDuplicate?: boolean
    }


    // context
    const { address, isConnected} = useAccount()
    const { setReloadPage, subscribeEventLogs, setSubscribeEventLogs } = useRegisterSecurityEventContext()


    // states
    const [loading, setLoading] = useState(true)
    const [isStatusEditAllowed, setIsStatusEditAllowed] = useState(false)
    const [statusEditAllowed, setStatusEditAllowed] = useState<number[]>([])
    const [selectStatusList, setSelectStatusList] = useState<IVerificationStatus[]>([])
    const [isStatusEditable, setIsStatusEditable] = useState(false)
    const [isStatusSelected, setIsStatusSelected] = useState(false)
    const [selectStatus, setSelectStatus] = useState<string>("")
    const [submitTaskStatus, setSubmitTaskStatus] = useState<ISubmitTaskStatus | undefined>()
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const [eventWaiting, setEventWaiting] = useState(false)
    const [eventName, setEventName] = useState("")
    const [layoutEventLogMapping, setLayoutEventLogMapping] =
        useState<ILayoutEventLogMapping>({
            addressAttribute: _mapping[props.accountProfile || ""],
            addressValue: address as `0x${string}`,
        })
    const [saveLog, setSaveLog] = useState<NewPinataPinResponse | undefined>(undefined)
    const [urlMetadata, setUrlMetadata] = useState("")
    const [ipfsEndpoint, setIpfsEndpoint] = useState(IPFS_BASE_URL)


    // utils
    const toast = useToast()
    const toastMessage: IToasterMessages = toasterMessages()
    const general: IGeneral = generalIntl()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const verificationTaskFilters: IVerificationTaskFilters = verificationTaskFiltersIntl()
    const verificationTaskEditStatus: IVerificationTaskEditStatus = verificationTaskEditStatusIntl()
    const verificationTaskFinalStatus: IVerificationTaskFinalStatus = verificationTaskFinalStatusIntl()

    const [isMetadataSaved, setIsMetadataSaved] = useState(false)
    const [mintLoading, setMintLoading] = useState(false)
    const [mintHash, setMintHash] = useState<`0x${string}` | undefined>()

    // functions
    /**
     *
     */
    const allowStatusToBeEdited = () => {
        let verificationStatus: IVerificationStatus[] = []

        if (isConnected && props.task.company.toLowerCase() === address?.toLowerCase()) {
            setIsStatusEditAllowed(true)
            setStatusEditAllowed(allowEditStatus.company)

            taskStatusEditAndUpdateProfile.company.updatedTasks.map((status: number) => {
                verificationStatus.push({
                    id: status.toString(),
                    value: status.toString(),
                    label: getTaskEditStatusName(Number(status))
                })
            })
            setSelectStatusList(verificationStatus)
        } else if (isConnected && props.task.verifier.toLowerCase() === address?.toLowerCase()) {
            setIsStatusEditAllowed(true)
            setStatusEditAllowed(allowEditStatus.verifier)

            taskStatusEditAndUpdateProfile.verifier.updatedTasks.map((status: number) => {
                verificationStatus.push({
                    id: status.toString(),
                    value: status.toString(),
                    label: getTaskEditStatusName(Number(status))
                })
            })
            setSelectStatusList(verificationStatus)
        } else {
            setIsStatusEditAllowed(false)
        }
    }

    /**
     * Get the task status name filter based on the index.
     *
     * See @IVerificationTaskFilters interface for more detail.
     * @param {number} taskStatus The index of the task status filter.
     * @returns {string} The task status name filter.
     */
    const getTaskStatusName = (taskStatus: number): string => {
        return verificationTaskFilters.status[taskStatus]
    }

    /**
     * Get the final task status name based on the index.
     *
     * See @IVerificationTaskFinalStatus interface for more detail.
     * @param {number} taskStatus The index of the task status filter.
     * @returns {string} The task final status name.
     */
    const getTaskFinalStatusName = (taskStatus: string): string => {
        console.log(' => ', taskStatus)
        return taskStatus === 'approve' ? verificationTaskFinalStatus.approve : verificationTaskFinalStatus.reject
    }

    /**
     *
     * @param taskStatus
     */
    const getTaskEditStatusName = (taskStatus: number): string => {
        return verificationTaskEditStatus.status[taskStatus]
    }

    /**
     * handle click -> select
     * @param event
     */
    const handleEditTaskStatus = (event: BaseSyntheticEvent) => {
        const taskStatus: number = Number(event.target.attributes.datatype.value)
        if (isConnected && statusEditAllowed.includes(taskStatus))
            setIsStatusEditable(true)
    }

    /**
     *
     * @param event
     */
    const handleClickOutside = (event: any) => {
        const selectIds = ['taskClicker', 'taskSelect', 'submitTaskStatus']
        const eventId: string = event.target.id.split('-')[0]

        if (!selectIds.includes(eventId)) {
            setIsStatusEditable(false)
            setIsStatusSelected(false)
        }
    }


    /**
     * Handle the update of task status.
     * @param event
     * @param data
     */
    const handleUpdateStatus = (event: ChangeEvent<HTMLSelectElement>, data: any) => {
        if (UpdateTaskStatus[Number(event.target.value)]) {
            setIsStatusSelected(true)
            setSelectStatus(event.target.value)
            setSubmitTaskStatus({action: UpdateTaskStatus[Number(event.target.value)], taskId: data.taskId})
        } else {
            setIsStatusSelected(false)
            setSelectStatus("")
            setSubmitTaskStatus(undefined)
        }
    }
    /**
     * Handle to submit the task status to the blockchain
     */
    const handleSubmitTaskStatus = () => {
        let actionName: string = ""
        let params: (string| undefined)[] = []

        if ( props.accountProfile === "company" ) {
            actionName = "updateVerificationTask"
            params = [submitTaskStatus?.taskId, submitTaskStatus?.action]
            setEventName("VerificationTaskUpdated")

        } else if ( props.accountProfile === "verifier" ) {
            actionName = "validateVerificationTask"
            params = [submitTaskStatus?.taskId]
            setEventName("VerificationTaskValidated")
        }

        writeContractByFunctionName(actionName, ...params)
            .then(() => {
                setLoading(true)
                setEventWaiting(true)

            })
            .catch(err => {
                console.log(`writeContractByFunctionName(${actionName}) error => ` + err)
                toast({
                    title: toastMessage.updateVerificationTaskStatusErrorTitle,
                    description: toastMessage.updateVerificationTaskStatusErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {
                setLoading(false)
                setIsStatusSelected(false)
                setSelectStatus("")
                setIsStatusEditable(false)
                if (!VALID_TASK_STATUS_FOR_MINTING_NFT.includes(submitTaskStatus?.action || "") )
                    setSubmitTaskStatus(undefined)
            })
    }

    /**
     *
     */
    const saveMetadata = (fileName: string, metadata: any) => {

        saveMetadataToIPFS(fileName, metadata)
            .then((_response) => {
                const response: NewPinataPinResponse = _response
                setSaveLog(response)
                setUrlMetadata(`${ipfsEndpoint}${response.IpfsHash}`)
                console.log('Success saveMetadataToIPFS', response)
            })
            .catch((error) => {
                console.log('Error saveMetadataToIPFS', error)
            })
            .finally(() => {
                setIsMetadataSaved(true)
            })
    }

    /**
     * Mint the verification task as NFT.
     */
    const mintVerificationTaskAsNFT = () => {
        let actionName: string = "safeMint"
        let params: (BigInt| string)[] = [props.task.taskId, urlMetadata]

        writeContractByFunctionName(actionName, ...params)
            .then((hash) => {
                setMintLoading(true)
                setMintHash(hash)
            })
            .catch(err => {
                console.log(`writeContractByFunctionName(${actionName}) error => ` + err)
                toast({
                    title: toastMessage.updateVerificationTaskStatusErrorTitle,
                    description: toastMessage.updateVerificationTaskStatusErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                setMintLoading(false)
                setIsMetadataSaved(false)
                setSubmitTaskStatus(undefined)
                setReloadPage(true)
            })
            .finally(() => {
                setMintLoading(false)
                setIsMetadataSaved(false)
                setSubmitTaskStatus(undefined)
                // setReloadPage(true)
            })
    }


    useEffect(() => {
        allowStatusToBeEdited()
        window.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if ( subscribeEventLogs.id === props.task?.taskId.toString() && subscribeEventLogs.eventLog.length > 0 ) {
            const handleEventsResponse: IhandleEventsResponse = handleEvents(
                layoutEventLog, subscribeEventLogs.eventLog, layoutEventLogMapping)

            if (handleEventsResponse.ok) {
                setEventLog(handleEventsResponse.eventLog)
                toast({
                    title: toastMessage.updateVerificationTaskStatusOkTitle,
                    description: toastMessage.updateVerificationTaskStatusOkDescription,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }

            setSubscribeEventLogs({id: props.task?.taskId.toString(), eventLog: []})

            if (!VALID_TASK_STATUS_FOR_MINTING_NFT.includes(submitTaskStatus?.action || "")) {
                setLoading(false)
                setEventWaiting(false)
                setReloadPage(true)
            }
        }
    }, [subscribeEventLogs])

    // Save Metadata
    useEffect(() => {

        if (eventName === "VerificationTaskUpdated"
            && submitTaskStatus?.action
            && VALID_TASK_STATUS_FOR_MINTING_NFT.includes(submitTaskStatus?.action)
            && subscribeEventLogs.id === props.task?.taskId.toString()) {

            const verificationTaskMetadata: IVerificationTaskMetadata = {
                taskId: props.task.taskId.toString(),
                status: getTaskFinalStatusName(submitTaskStatus?.action || ""),
                sector: getRegisterVerification(Number(props.task.registerId)),
                type: props.task.securityType,
                date: convertTimestampToDate(Number(props.task.timeStamp)),
                timestamp: props.task.timeStamp.toString(),
                company: {
                    account: props.task.company,
                    name: props.task.companyName,
                    address: props.task.companyAddress,
                    siret: props.task.companySiret,
                    site: props.task.siteName,
                    siteAddress: props.task.siteAddress,
                    companyAccount: {
                        account: props.task.companyAccount,
                        firstName: props.task.companyAccountFirstName,
                        name: props.task.companyAccountName
                    },
                },
                verifier: {
                    account: props.task.verifier,
                    name: props.task.verifierCompanyName,
                    address: props.task.verifierAddressName,
                    siret: props.task.verifierSiret,
                    approvalNumber: props.task.verifierApprovalNumber,
                    verifierAccount: {
                        account: props.task.verifierAccount,
                        firstName: props.task.verifierFirstName,
                        name: props.task.verifierName
                    }
                },
            }
            const fileName = `security-register-taskId-${verificationTaskMetadata.taskId}`
            // Save Metadata to IPFS
            console.log('save Metadata to IPFS')
            saveMetadata(fileName, verificationTaskMetadata)
        }
    }, [subscribeEventLogs]);

    // Mint NFT
    useEffect(() => {
        if (isMetadataSaved) {
            // Mint verification task NFT
            console.log('Mint NFT')
            mintVerificationTaskAsNFT()
        }
    }, [isMetadataSaved]);

    // Save Metadata for NFT hash
    useEffect(() => {
        if (mintHash) {
            const fileName = `security-register-taskId-${props.task.taskId}-NFT`
            const metadataNFT = {
                transactionHash: mintHash,
            }
            console.log('Mint NFT')
            saveMetadata(fileName, metadataNFT)

            setLoading(false)
            setEventWaiting(false)
            setReloadPage(true)
        }
    }, [mintHash]);

    return (
        <div>
            {eventWaiting && <SubscribeEvent props={{taskId: props.task.taskId.toString(), eventName: eventName}} />}

            <div id={`verificationTaskGridRow-${props.index}`}
                 className={`flex flex-col lg:grid ${props.gridStyle} text-xs text-center z-10
                    pb-2 lg:p-0 lg:my-0 mt-0 border-gray-900/10 hover:bg-gray-500/30 active:bg-gray-500/30
                    ${props.toggleLog && Number(props.task?.taskId) === Number(props.selectedTask?.taskId) 
                        ? "bg-gray-500/30" 
                        : "bg-gray-400/20 lg:border-none border-t"}`
                    }>

                <div className={`text-right lg:text-center mt-1 lg:mt-0 lg:py-1 ${props.attributes[0].style}`}
                     onClick={() => {props.onClick(props.task, props.selectedTask)}}>

                    <div className="flex lg:items-center lg:justify-center h-full pl-2 cursor-pointer">
                        {props.toggleLog && Number(props.task?.taskId) === Number(props.selectedTask?.taskId) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5 text-fuchsia-600">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5 text-indigo-600">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        )}
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[1].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[1]}</p>
                        <p className="pl-1 lg:pl-0">{Number(props.task?.taskId)}</p>
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[2].style}`}>
                    <div
                        className={`flex lg:items-center lg:justify-center h-full ${isConnected && statusEditAllowed.includes(Number(props.task?.taskStatus)) && 'cursor-pointer'}`}>
                        <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[2]}</p>
                        {isStatusEditable ? (
                            <div className={`flex flex-cols items-center justify-center`}>
                                <div>
                                    <FormSelectLayout props={
                                        {
                                            id: 'taskSelect-' + props.task?.taskId,
                                            defaultSelected: {id: "-1",value: "-1", label: general.selectAction},
                                            selected: {
                                                id: selectStatus,
                                                value: selectStatus,
                                                label: getTaskEditStatusName(Number(selectStatus))
                                            },
                                            data: selectStatusList,
                                            onChange: (e) => {
                                                handleUpdateStatus(e, {taskId: props.task?.taskId})
                                            },
                                            inline: true,
                                        }
                                    }/>
                                </div>

                                {isStatusSelected ? (
                                    <div onClick={handleSubmitTaskStatus}
                                         className={`lg:ml-1 p-1 h-7 w-14 lg:h-8 lg:w-16`}>
                                        <svg id={`submitTaskStatus-${props.task?.taskId}`}
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor"
                                             className="w-full h-full text-indigo-600 hover:text-fuchsia-600">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>
                                    </div>
                                ) : <div className={`lg:ml-1 p-1 h-7 w-14 lg:h-8 lg:w-16`}></div>
                                }
                            </div>
                        ) : (
                            <>
                                {eventWaiting || mintLoading? (
                                    <>
                                        <div id={`taskUpdateInProgress-0`}
                                             className={`bg-gradient-to-br from-indigo-700 to-indigo-500
                                                text-slate-100 text-center
                                                lg:p0 lg:w-full rounded-xl border border-gray-900/10 p-1`}>
                                            <div className="flex justify-center items-center">
                                                <svg className="animate-spin h-5 w-5 text-slate-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.735V24c4.418 0 8-3.582 8-8h-4a4.01 4.01 0 01-4 4.135z"></path>
                                                </svg>
                                                <div className={`ml-3`}>{general.inProgress}</div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p id={`taskClicker-${props.task?.taskId}`}
                                       datatype={props.task?.taskStatus.toString()}
                                       onClick={handleEditTaskStatus}
                                       className={`lg:p0 lg:w-full 
                                            ${Number(props.task?.taskStatus) === 0 && 'bg-cyan-400   rounded-xl border border-gray-900/10 p-1'}
                                            ${Number(props.task?.taskStatus) === 1 && 'bg-purple-400 rounded-xl border border-gray-900/10 p-1'}
                                            ${Number(props.task?.taskStatus) === 2 && 'bg-green-400  rounded-xl border border-gray-900/10 p-1'}                                           
                                            ${Number(props.task?.taskStatus) === 3 && 'bg-rose-400   rounded-xl border border-gray-900/10 p-1'}
                                            ${Number(props.task?.taskStatus) === 4 && 'bg-amber-400  rounded-xl border border-gray-900/10 p-1'}
                                            `}>{getTaskStatusName(Number(props.task?.taskStatus))}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[3].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[3]}</p>
                        <p className="pl-1 lg:p0 basis-3/4">{getRegisterVerification(Number(props.task?.registerId))}</p>
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[4].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div
                            className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[4]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{props.task?.securityType}</div>
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[5].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div
                            className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[5]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{props.task?.companyName}</div>
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[6].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div
                            className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[6]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{props.task?.siteName}</div>
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[7].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div
                            className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[7]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{props.task?.siteAddress}</div>
                    </div>
                </div>

                {/*verifier info*/}
                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[8].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div
                            className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[8]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{props.task?.verifierCompanyName}</div>
                    </div>
                </div>

                <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 ${props.attributes[9].style}`}>
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div
                            className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldGridValues[9]}</div>
                        <div
                            className="pl-1 lg:p0 basis-3/4">{convertTimestampToDate(Number(props.task?.timeStamp))}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}