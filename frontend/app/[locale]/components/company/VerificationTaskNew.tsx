'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useAccount, useContractEvent } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"

import {
    ICompanyAccountUpdated,
    IRegisterCreated,
    IRegisters} from "@/interfaces/registers"
import { IVerifierProfile } from "@/interfaces/verifier"
import {
    IVerificationTaskCreated,
    IVerificationTaskUpdated,
    IVerificationTaskValidated
} from "@/interfaces/verificationTasks"
import { IVerificationTaskCreatedv2 } from "@/interfaces/verificationTasks"
import { IVerificationTaskFilters } from "@/interfaces/intl"
import { IVerificationTaskGrid } from "@/interfaces/verificationTasks"
import { verificationTaskFiltersIntl, verificationTaskGridIntl } from "@/utils/intl"
import { SubmitButtonLayout2 } from "../layout/ButtonLink"
import Loader from "@/app/[locale]/components/Loader"
import {
    convertTimestampToDate,
    getCompanyAccountUpdateds,
    getRegisterCreateds,
    getRegisterVerification,
    getVerificationTaskCreateds,
    getVerificationTaskUpdateds,
    getVerificationTaskValidateds,
    getVerificationTasksFromEvents,
    getVerifierAccountUpdateds,
    getVerifierCreateds,
} from "@/utils"
import { VerificationTaskModalFormNew } from "./VerificationTaskModalFormNew"

interface ITaskStatus {
    status: boolean
    id: string
}


const VerificationTaskGridMain = ({ loading, tasks, fields2 }: {loading: boolean, tasks: IVerificationTaskCreatedv2[], fields2: IVerificationTaskGrid }) => {

    const [toggleLog, setToggleLog] = useState(false)
    const [selectedTask, setSelectedTask] = useState<IVerificationTaskCreatedv2 | undefined>()
    
    return (
        <div>
            <div className={`hidden lg:grid lg:grid-cols-10 lg:gap-0 
                bg-gray-900/30 border-b border-gray-200/10 
                font-medium rounded-t 
                text-xs lg:text-sm text-center lg:text-center lg:py-3 lg:mb-0`}>
                
                {/* Column fields */}
                {fields2.fieldGridValues.map((field, index) => <div key={index}>{field}</div>)}
            </div>

            {/* Data Grid */}
            <Loader isLoading={loading}>
                {!loading && tasks.map((data: IVerificationTaskCreatedv2) =>
                    <div key={Number(data.taskId)}
                        onClick={() => {
                            if (data.taskId !== selectedTask?.taskId)
                                setToggleLog(false)

                            setSelectedTask(data)
                            setToggleLog((prevToggle) => !prevToggle)
                        }}
                        >

                        {/* Verification task row */}
                        <VerificationTaskGridRows toggleLog={toggleLog} task={data} selectedTask={selectedTask} fields2={fields2}/>
                        <div className="lg:border-t lg:border-gray-400/10"></div>
                        {/* Verification task detail (onClick) */}
                        <VerificationTaskDetail toggleLog={toggleLog} index={Number(data.taskId)} selectedTask={selectedTask} fields2={fields2}/>
                    </div>
                )}
            </Loader>
        </div>
    )
}


const VerificationTaskGridRows = ({ toggleLog, task, selectedTask, fields2 }: {toggleLog: boolean, task: IVerificationTaskCreatedv2, selectedTask: IVerificationTaskCreatedv2 | undefined, fields2: IVerificationTaskGrid }) => {
    const verificationTaskFilters: IVerificationTaskFilters = verificationTaskFiltersIntl()
    const getTaskStatusName = (taskStatus: number) => {
        return verificationTaskFilters.status[taskStatus]
    }

    return (
        <div>
            <div className={`flex flex-col lg:grid lg:grid-cols-10 text-xs text-center
                pb-2 lg:p-0 lg:my-0 mt-0 border-gray-900/10 hover:bg-gray-500/30 active:bg-gray-500/30
                ${toggleLog && Number(task?.taskId) === Number(selectedTask?.taskId) ? "bg-gray-500/30" : "bg-gray-400/20 lg:border-none border-t"}`}
                >

                <div className="text-right mt-1 lg:w-20 lg:text-center lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full pl-2">
                        {toggleLog && Number(task?.taskId) === Number(selectedTask?.taskId) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-5 h-5 text-gray-900/60">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                                className="w-5 h-5 text-gray-900/60">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[1]}</p>
                        <p className="pl-1 lg:pl-0">{Number(task?.taskId)}</p>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[2]}</p>
                        <p className={`
                            ${Number(task?.taskStatus) === 0 && ' bg-cyan-400   rounded-xl border border-gray-900/10 p-1'}
                            ${Number(task?.taskStatus) === 1 && ' bg-purple-400 rounded-xl border border-gray-900/10 p-1'}
                            ${Number(task?.taskStatus) === 2 && ' bg-green-400  rounded-xl border border-gray-900/10 p-1'}
                            ${Number(task?.taskStatus) === 3 && ' bg-rose-400   rounded-xl border border-gray-900/10 p-1'}
                            ${Number(task?.taskStatus) === 4 && ' bg-amber-400  rounded-xl border border-gray-900/10 p-1'}
                            lg:p0 lg:w-full`}>
                            {getTaskStatusName(Number(task?.taskStatus))}
                        </p>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[3]}</p>
                        <p className="pl-1 lg:p0 basis-3/4">{getRegisterVerification(Number(task?.registerId))}</p>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[4]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{task?.securityType}</div>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[5]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{task?.companyName}</div>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[6]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{task?.siteName}</div>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[7]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{task?.siteAddress}</div>
                    </div>
                </div>

                {/*verifier info*/}
                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[8]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{task?.verifierCompanyName}</div>
                    </div>
                </div>

                <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                    <div className="flex lg:items-center lg:justify-center h-full">
                        <div className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldGridValues[9]}</div>
                        <div className="pl-1 lg:p0 basis-3/4">{convertTimestampToDate(Number(task?.timeStamp))}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const VerificationTaskDetail = ({ toggleLog, index, selectedTask, fields2 }: { toggleLog: boolean, index: number, selectedTask: IVerificationTaskCreatedv2 | undefined, fields2: IVerificationTaskGrid  }) => {

    return (
        <>
            {toggleLog && Number(selectedTask?.taskId) === Number(index) && 
                <div className="shadow-lg">
                    {/* Verifier detail */}
                    <div className="bg-gray-900/5 font-bold
                        text-xs text-center py-1 lg:text-sm lg:text-left lg:pl-5 lg:py-1 lg:mb-0">{fields2.fieldsubGridFirstTitle}
                    </div>
                    
                    <div className="hidden bg-gray-900/5 shadow-md lg:grid lg:grid-cols-7 lg:gap-0
                        font-semibold text-xs text-center lg:text-sm lg:text-center lg:mb-0 lg:py-1">
                        {fields2.fieldsubGridFirstValues.map((field, index) => <div key={index}>{field}</div> )}
                    </div>
                    
                    <div className={`flex flex-col lg:grid lg:grid-cols-7 text-xs text-center pb-3 lg:p-0 lg:my-0`}>
                            
                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start lg:justify-center">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[0]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5 break-all">{selectedTask?.verifierAccount}</p>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start justify-center h-ful">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[1]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5">{selectedTask?.verifierAddressName}</p>
                            </div>
                        </div>


                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start lg:justify-center">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[2]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5">{selectedTask?.verifierCompanyName}</p>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start lg:justify-center">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[3]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5">{selectedTask?.verifierFirstName}</p>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start lg:justify-center">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[4]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5">{selectedTask?.verifierName}</p>
                            </div>
                        </div>
                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start lg:justify-center">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[5]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5">{selectedTask?.verifierSiret}</p>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                            <div className="flex items-start lg:justify-center">
                                <p className="lg:hidden basis-1/4 px-0.5 font-bold">{fields2.fieldsubGridFirstValues[6]}</p>
                                <p className="lg:p0     basis-3/4 px-0.5">{selectedTask?.verifierApprovalNumber}</p>
                            </div>
                        </div>
                    </div>


                    {/* Company */}
                    <div className="bg-gray-900/5 font-bold
                        text-xs text-center lg:text-sm lg:text-left lg:pl-5 lg:py-1 lg:mb-0">
                            {fields2.fieldsubGridSecondTitle}
                    </div>

                    {/* Header */}
                    <div className="hidden bg-gray-900/5 shadow-md lg:grid lg:grid-cols-7 lg:gap-0
                        font-semibold text-xs text-center lg:text-sm lg:text-center lg:mb-0 lg:py-1">
                            {fields2.fieldsubGridSecondValues.map((field, index) => <div key={index}>{field}</div> )}
                    </div>

                    <div className={`flex flex-col lg:grid lg:grid-cols-7 text-xs text-center pb-3 lg:p-0 lg:my-0`}>

                        <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                            <div className="flex lg:items-center lg:justify-center h-full px-1">
                                <div className="lg:hidden basis-1/4 pr-1 font-bold">{fields2.fieldsubGridSecondValues[0]}</div>
                                <div className="pl-1 lg:p0 basis-3/4 break-all">{selectedTask?.company}</div>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                            <div className="flex lg:items-center lg:justify-center h-full px-1">
                                <div className="lg:hidden basis-1/4 pr-1 font-bold">{fields2.fieldsubGridSecondValues[1]}</div>
                                <div className="pl-1 lg:p0 basis-3/4 break-all">{selectedTask?.companyAccount}</div>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                            <div className="flex lg:items-center lg:justify-center h-full px-1">
                                <div className="lg:hidden basis-1/4 pr-1 font-bold">{fields2.fieldsubGridSecondValues[2]}</div>
                                <div className="pl-1 lg:p0 basis-3/4">{selectedTask?.companyAccountFirstName}</div>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                            <div className="flex lg:items-center lg:justify-center h-full px-1">
                                <div className="lg:hidden basis-1/4 pr-1 font-bold">{fields2.fieldsubGridSecondValues[3]}</div>
                                <div className="pl-1 lg:p0 basis-3/4">{selectedTask?.companyAccountName}</div>
                            </div>
                        </div>

                        <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                            <div className="flex lg:items-center lg:justify-center h-full px-1">
                                <div className="lg:hidden basis-1/4 pr-1 font-bold">{fields2.fieldsubGridSecondValues[4]}</div>
                                <div className="pl-1 lg:p0 basis-3/4">{selectedTask?.companyAddress}</div>
                            </div>
                        </div>
                        <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                            <div className="flex lg:items-center lg:justify-center h-full px-1">
                                <div className="lg:hidden basis-1/4 pr-1 font-bold">{fields2.fieldsubGridSecondValues[5]}</div>
                                <div className="pl-1 lg:p0 basis-3/4">{selectedTask?.companySiret}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

const FilterByCheckbox = (
    { checkboxes, handleCheckboxChange }: 
    { 
        checkboxes: { [key: string]: ITaskStatus }, 
        handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
    }
) => {
    const [toggleLog, setToggleLog] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const verificationTaskFilters: IVerificationTaskFilters = verificationTaskFiltersIntl()

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1024)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    
    return (
        <div className="flex flex-col">
            <div className={`${isSmallScreen ? 'flex justify-end' : 'hidden'}`} 
                onClick={() => setToggleLog((prevToggle) => !prevToggle)}>
                
                {verificationTaskFilters.title}

                {toggleLog ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                )}
            </div>

            <div className={`${!toggleLog && isSmallScreen ? 'hidden' : ''} pt-0`}>
                <div className="flex flex-col lg:flex-row text-xs lg:text-center lg:justify-center">
                    
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus2.status} type="checkbox" id="taskStatus2" name="taskStatus2" value="taskStatus2"/>
                        <label htmlFor="taskStatus2">
                            <span className="ml-2 align-middle bg-green-400 rounded-xl border border-gray-900/10 p-1">
                                {verificationTaskFilters.approved}
                            </span>
                        </label>
                    </div>
                    
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus0.status} type="checkbox" id="taskStatus0" name="taskStatus0" value="taskStatus0"/>
                        <label htmlFor="taskStatus0">
                            <span className="ml-2 align-middle bg-cyan-400 rounded-xl border border-gray-900/10 p-1">
                                {verificationTaskFilters.pendingApproval}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus3.status} type="checkbox" id="taskStatus3" name="taskStatus3" value="taskStatus3"/>
                        <label htmlFor="taskStatus3">
                            <span className="ml-2 align-middle bg-rose-400 rounded-xl border border-gray-900/10 p-1">
                                {verificationTaskFilters.rejected}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus1.status} type="checkbox" id="taskStatus1" name="taskStatus1" value="taskStatus1"/>
                        <label htmlFor="taskStatus1">
                            <span className="ml-2 align-middle bg-purple-400 rounded-xl border border-gray-900/10 p-1">
                                {verificationTaskFilters.validated}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus4.status} type="checkbox" id="taskStatus4" name="taskStatus4" value="taskStatus4"/>
                        <label htmlFor="taskStatus4">
                            <span className="ml-2 align-middle bg-amber-400 rounded-xl border border-gray-900/10 p-1">
                                {verificationTaskFilters.conditionallyApproved}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const VerificationTaskNew = () => {
    const { address, isConnected } = useAccount()
    const { verificationTaskCreatedEventLogs, setVerificationTaskCreatedEventLogs } = useRegisterSecurityEventContext()
    const eventName = 'VerificationTaskCreated'
    
    const [loading, setLoading] = useState(true)
    const [registers, setRegisters] = useState<IRegisters | undefined>()
    const [first, setFirst] = useState(10)
    const [skip, setSkip] = useState(0)
    const [query, setQuery] = useState("")
    
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: ITaskStatus }>({
        taskStatus0: {status: false, id: "0"},
        taskStatus1: {status: false, id: "1"},
        taskStatus2: {status: false, id: "2"},
        taskStatus3: {status: false, id: "3"},
        taskStatus4: {status: false, id: "4"},
    })

    // Internalization
    const gridIntl: IVerificationTaskGrid = verificationTaskGridIntl()
    const verificationTaskFilters: IVerificationTaskFilters = verificationTaskFiltersIntl()

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: eventName,
        listener(logs) {
            setVerificationTaskCreatedEventLogs(logs)
            console.log(`New events for : ${eventName}`)
            console.log(logs)
        }
    })
    
    useEffect(() => {
        console.log(`Reload...`)
        getRegisters()
    }, [isConnected, address, verificationTaskCreatedEventLogs])
    
    
    // #1
    // One request until all data retrived
    // ------------------------------------
    // get verification tasks 
    // loop if result = 10 then get verification tasks 
    // 
    // +: known of total tasks
    // -: extensive
    
    // #2 get verification tasks 
    // Two requests per load
    // --------------------------------
    // show only 10 task per grid + next button.
    // if total = 20 tasks ; then request 20 more once click on next button
    // 
    // +: faster
    // -: do not know the total of tasks
    
    // #3 get verifications per company  (address required)
    // 1. get verification tasks per address company
    // 2. get 
    
    const getVerificationTask = async () => {
            const id = address || undefined
        
            const verificationTaskCreateds = await getVerificationTaskCreateds(first, skip, id)
            console.log(`verificationTaskCreateds:`)
            console.log(verificationTaskCreateds)
        
            const registerCreated = await getRegisterCreateds()
            const verificationTaskValidated = await getVerificationTaskValidateds()
            const verificationTaskUpdated = await getVerificationTaskUpdateds()
            const companyAccount = await getCompanyAccountUpdateds()
            const verifiersAsCompany = await getVerifierCreateds()
            const verifiersAsAccount = await getVerifierAccountUpdateds()
        }
        
    const getTaskStatusName = (taskStatus: number) => {
        return verificationTaskFilters.status[taskStatus]
    }
        
    const getRegisters = async () => {
        const id = address || undefined
        const first = 5
        const skip = 0
        getVerificationTasksFromEvents(id, first, skip).then(register => {setRegisters(register)}).finally(() => {setLoading(false)})

        // if (isConnected) {
        //     getVerificationTasksFromEvents(address).then(register => {setRegisters(register)}).finally(() => {setLoading(false)})
        // } else {
        //     getVerificationTasksFromEvents().then(register => {setRegisters(register)}).finally(() => {setLoading(false)})
        // }
    }

    // 
    // Internal
    // 
    const verificationTaskOrigin = (): IVerificationTaskCreatedv2[] => {
        let verificationTasksCreated: IVerificationTaskCreatedv2[] = []       

        // Read state
        registers?.verificationTasks.map((task: IVerificationTaskCreated) => {
            let verifierProfile: IVerifierProfile | undefined
            let registerCreated: IRegisterCreated | undefined
            let companyAccount: ICompanyAccountUpdated | undefined

            // Read state for site detail
            registers?.registerCreated.map((_registerCreated: IRegisterCreated) => {
                if (_registerCreated.siteName === task.siteName) {}
                    registerCreated = _registerCreated
            })

            
            // Read company profile
            registers?.companyAccount.map((_companyAccount: ICompanyAccountUpdated) => {
                if (_companyAccount.company === task.company)
                    companyAccount = companyAccount
            })

            // Read Verifier profile
            registers?.verifiersProfile.map((_verifierProfile: IVerifierProfile) => {
                if (_verifierProfile.verifier === task.verifier)
                    verifierProfile = _verifierProfile
            })

            // Read validated state for task status
            registers?.verificationTaskValidated.map((verificationTaskValidated: IVerificationTaskValidated) => {
                if (verificationTaskValidated.taskId === task.taskId && verificationTaskValidated.taskStatus > task.taskStatus)
                    task.taskStatus = verificationTaskValidated.taskStatus
            })

            // Read updated state for task status
            registers?.verificationTaskUpdated.map((verificationTaskUpdated: IVerificationTaskUpdated) => {
                if (verificationTaskUpdated.taskId === task.taskId && verificationTaskUpdated.taskStatus > task.taskStatus)
                    task.taskStatus = verificationTaskUpdated.taskStatus
            })

            const verificationTaskCreated: IVerificationTaskCreatedv2 = {
                company: task.company,
                companyName: registerCreated?.name ?? "",
                companyAddress: registerCreated?.addressName ?? "",
                siteName: task.siteName,
                siteAddress: registerCreated?.siteAddressName ?? "",
                companySiret: registerCreated?.siret || "",
                companyAccount: address as `0x${string}`,
                companyAccountName: companyAccount?.name || "",
                companyAccountFirstName: companyAccount?.firstName || "",

                registerId: task.registerId,
                securityType: task.securityType,
                taskId: task.taskId,
                taskStatus: task.taskStatus,
                timeStamp: task.timeStamp,

                verifier: task.verifier,
                verifierCompanyName: verifierProfile?.nameCompany ?? "",
                verifierAddressName: verifierProfile?.addressName ?? "",
                verifierSiret: verifierProfile?.siret ?? "",
                verifierApprovalNumber: verifierProfile?.approvalNumber ?? "",
                
                verifierAccount: verifierProfile?.account ?? "0x",
                verifierName: verifierProfile?.name ?? "",
                verifierFirstName: verifierProfile?.firstName ?? ""
            }
            verificationTasksCreated.push(verificationTaskCreated)
        })

        return verificationTasksCreated
    }

    const searchInObject = (obj: IVerificationTaskCreatedv2, term: string): boolean => {
        if (!term)
            return true
        
        for (const key in obj) {
            if (!obj[key as keyof IVerificationTaskCreatedv2])
                continue

            let chain = ""
            let taskStatus = ""
            let registerId = ""
            let timeStamp = ""

            if (key === 'timeStamp') {
                timeStamp = convertTimestampToDate(Number(obj[key as keyof IVerificationTaskCreatedv2])).toLocaleLowerCase()
            } else if (key === 'taskStatus') {
                taskStatus = getTaskStatusName(Number(obj[key as keyof IVerificationTaskCreatedv2])).toLocaleLowerCase()
            } else if (key === 'registerId') {
                registerId = getRegisterVerification(Number(obj[key as keyof IVerificationTaskCreatedv2])).toLocaleLowerCase()
            } else {
                chain = obj[key as keyof IVerificationTaskCreatedv2].toString().toLowerCase()
            }

            if (chain.includes(term.toLowerCase()) || 
                taskStatus.includes(term.toLowerCase()) || 
                registerId.includes(term.toLowerCase()) ||
                timeStamp.includes(term.toLowerCase())) {
                return true
            }
        }
        return false
    }

    const searchChecked = (obj: IVerificationTaskCreatedv2): boolean => {
        const key = "taskStatus".concat(obj.taskStatus.toString())
        return checkboxes[key].status
    }

    const setFilters = (
        element: IVerificationTaskCreatedv2, 
        index: number, 
        array: IVerificationTaskCreatedv2[]
    ): IVerificationTaskCreatedv2 | void => {
        if (searchInObject(element, query)) {
            return element
        }
    }

    const verificationTask = (): IVerificationTaskCreatedv2[] => {
        const data: IVerificationTaskCreatedv2[] = verificationTaskOrigin()
        const filteredData: IVerificationTaskCreatedv2[] = data.filter(setFilters)
        const checkedData: IVerificationTaskCreatedv2[] = filteredData.filter(searchChecked)
        let dataOutput: IVerificationTaskCreatedv2[] = []

        if (checkedData.length === 0) {
            dataOutput = filteredData
        } else {
            dataOutput = checkedData
        }

        return dataOutput.filter(setFilters)
    }

    const searchQuery = (keyword: any|null|undefined) => {
        setQuery(keyword.target.value.toLowerCase())
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        setCheckboxes({ ...checkboxes, [name]: {status: checked, id: name.charAt(name.length-1)} })
    }

    // Handle modal form [open & close]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = () => {
        setIsModalOpen(true)
        setTimeout(() => {
            const modal = document.querySelector('#modal')
            modal?.classList.remove('opacity-0')
        }, 100)
    }

    const closeModal = () => {
        const modal = document.querySelector('#modal')
        modal?.classList.add('opacity-0')
        setTimeout(() => setIsModalOpen(false), 300)
    }

    return (
        <div className="flex flex-col lg:mx-20 pt-16">
            {/* Modal form - create verification task */}
            {isModalOpen && (
                <VerificationTaskModalFormNew 
                    props={{
                        isModalOpen: isModalOpen,
                        closeModal: closeModal,
                        verificationTaskModalForm: {registersCreated: registers?.registerCreated || []},
                    }}
                />
            )}

            {/* Security register Table list */}
            <div className="rounded backdrop-blur-sm shadow-2xl
                bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                p-6 lg:mx-auto w-full">

                {/* Header 1 with title, searchBar and button */}
                <div className="flex lg:flex-row justify-between p-2 lg:p-0">
                    {/* title */}
                    <div className="text-sm lg:text-base text-left lg:w-1/6">
                        <h1 className="text-gray-900">{gridIntl.pageTitle}</h1>
                    </div>

                    {/* Search bar LG */}
                    <div className="hidden lg:block text-sm lg:text-base text-center sm:mb-0.5 lg:w-4/6 lg:mx-2">
                        <input
                            className="rounded-lg bg-gray-900/20 border-hidden w-full"
                            placeholder={gridIntl.searchBar}
                            onChange={searchQuery}
                        />
                    </div>

                    {/* Create task Button - only if connected */}
                    
                    {isConnected && !loading && (
                        <SubmitButtonLayout2 props={{
                            loading: false,
                            spinnerSize: 'sm',
                            buttonName: gridIntl.createVerificationButton,
                            onClick: openModal
                        }} />
                    )}
                </div>


                {/* Search bar SM */}
                <div className="lg:hidden text-sm text-center grow mb-0.5">
                    <input
                        className="rounded-lg bg-gray-900/20 border-hidden w-full"
                        placeholder={gridIntl.searchBar}
                        onChange={searchQuery}
                    />
                </div>
                {/* Sub header with filters */}
                <FilterByCheckbox checkboxes={checkboxes} handleCheckboxChange={handleCheckboxChange} />

                {/* Grid */}
                <div className="flex flex-col lg:py-2">
                    <VerificationTaskGridMain loading={loading} tasks={verificationTask()} fields2={gridIntl}/>
                </div>
            </div>
        </div>
    )
}