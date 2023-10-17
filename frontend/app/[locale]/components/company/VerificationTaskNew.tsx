'use client'

import {
    convertTimestampToDate,
    getCompanyAccountUpdatedEventsv2,
    getRegisterCreatedEvents,
    getRegisterVerification,
    getVerificationTaskCreatedEventsv2,
    getVerificationTaskUpdatedEvents,
    getVerificationTaskValidatedEventsv2,
    getVerifiersProfile,
} from "@/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {useIdentityContext} from "@/contexts/Identity";
import {
    ICompanyAccountUpdated,
    IRegisterCreated,
    IVerificationTaskCreated,
    IVerificationTaskCreatedv2,
    IVerificationTaskMetadata,
    IVerificationTaskUpdated,
    IVerificationTaskValidated,
    IVerifierCreated,
    IVerifierProfile
} from "@/interfaces/company";
import { VerificationStatus} from "@/constants/enums";
import {VerificationTaskButton} from "@/app/[locale]/components/company/VerificationTaskButton";
import Loader from "@/app/[locale]/components/Loader";
import { recoverMessageAddress } from "viem";
import { VerificationTaskButtonNew } from "./VerificationTaskButtonNew";


interface ITaskStatus {
    status: boolean
    id: string
}

const getTaskStatusName = (taskStatus: number) => {
    return VerificationStatus[taskStatus]
}

const FilterByCheckbox = (
    { checkboxes, handleCheckboxChange }: 
    { 
        checkboxes: { [key: string]: ITaskStatus }, 
        handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
    }) => {
        const [toggleLog, setToggleLog] = useState(false)
        const [isSmallScreen, setIsSmallScreen] = useState(false);

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
                Filter
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
                                {getTaskStatusName(2)}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus0.status} type="checkbox" id="taskStatus0" name="taskStatus0" value="taskStatus0"/>
                        <label htmlFor="taskStatus0">
                            <span className="ml-2 align-middle bg-cyan-400 rounded-xl border border-gray-900/10 p-1">
                                {getTaskStatusName(0)}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus3.status} type="checkbox" id="taskStatus3" name="taskStatus3" value="taskStatus3"/>
                        <label htmlFor="taskStatus3">
                            <span className="ml-2 align-middle bg-rose-400 rounded-xl border border-gray-900/10 p-1">
                                {getTaskStatusName(3)}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus1.status} type="checkbox" id="taskStatus1" name="taskStatus1" value="taskStatus1"/>
                        <label htmlFor="taskStatus1">
                            <span className="ml-2 align-middle bg-purple-400 rounded-xl border border-gray-900/10 p-1">
                                {getTaskStatusName(1)}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={handleCheckboxChange} checked={checkboxes.taskStatus4.status} type="checkbox" id="taskStatus4" name="taskStatus4" value="taskStatus4"/>
                        <label htmlFor="taskStatus4">
                            <span className="ml-2 align-middle bg-amber-400 rounded-xl border border-gray-900/10 p-1">
                                {getTaskStatusName(4)}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


export const VerificationTaskNew = () => {
    const { address} = useAccount()
    const {refreshScreen, setVerificationTaskStatus, setSelectedVerificationTask, createVerificationTaskRefresh,  verificationTaskRefresh } = useIdentityContext()
    const [loading, setLoading] = useState(false)
    const [ refresh] = useState(0)

    const [verificationTasks, setVerificationTasks] = useState<IVerificationTaskCreated[]>([])
    const [verificationTasks2, ] = useState<IVerificationTaskCreatedv2[]>([])
    const [verificationTasksTemp, setVerificationTasksTemp] = useState<IVerificationTaskCreated[]>([])

    const [verifier, setVerifier] = useState<IVerifierCreated>()
    const [verifierAddress, setVerifierAddress] = useState<`0x${string}`>()
    const [verifierProfiles, setVerifierProfiles] = useState<IVerifierProfile[]>([])

    const [sites, setSites] = useState<IRegisterCreated[]>([])
    const [validatedTasks, setValidatedTasks] = useState<IVerificationTaskValidated[]>([])
    const [updatedTasks, setUpdatedTasks] = useState<IVerificationTaskUpdated[]>([])

    const [registersCreated, setRegistersCreated] = useState<IRegisterCreated[]>([])
    const [accountCompany, setAccountCompany] = useState<ICompanyAccountUpdated>()

    const [query, setQuery] = useState("")
    const [orderDesc, setOrderDesc] = useState(true)
    const [searchStatus, setSearchStatus] = useState<number[]>([])
    
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: ITaskStatus }>({
        taskStatus0: {status: false, id: "0"},
        taskStatus1: {status: false, id: "1"},
        taskStatus2: {status: false, id: "2"},
        taskStatus3: {status: false, id: "3"},
        taskStatus4: {status: false, id: "4"},
    })
    

    // useEffect(() => {
    //     setSelectedVerificationTask(-1)
    //     setLoading(true)
    //     LoadData()
    // }, [refreshScreen])

        // [refreshScreen, refresh, verificationTaskRefresh, loading, createVerificationTaskRefresh]
    // const LoadData = () => {
    //     getVerificationTaskUpdated()
    //     getVerificationTaskValidated()
    //     getSiteDetail()
    //     getRegisterCompany()
    //     getCompanyAccountUpdated()
    //     getVerifierProfiles()
    //     getVerificationTasks()
    // }

    const getTaskStatus = (_taskId: BigInt) => {
        let lastTaskStatus: BigInt = BigInt("-1")

        for (let i = 0; i < validatedTasks.length; i++) {
            if (_taskId === validatedTasks[i].taskId)
                lastTaskStatus = validatedTasks[i].taskStatus
        }

        for (let i = 0; i < updatedTasks.length; i++) {
            if (_taskId === updatedTasks[i].taskId)
                lastTaskStatus = updatedTasks[i].taskStatus
        }

        return lastTaskStatus
    }

    const getVerificationTasks = async () => {
        let verificationTasks_: IVerificationTaskCreated[] = []

        getVerificationTaskCreatedEventsv2()
            .then(data => {
                // Get Verification tasks
                for (let i = 0; i < data.length; i++) {
                    const verificationTaskCreated: IVerificationTaskCreated = data[i]

                    if(verificationTaskCreated.company !== address)
                        continue

                    // Check the status task
                    let lastTaskStatus: BigInt = getTaskStatus(verificationTaskCreated.taskId)
                    if (lastTaskStatus !== BigInt("-1"))
                        verificationTaskCreated.taskStatus = lastTaskStatus

                    verificationTasks_.push(verificationTaskCreated)
                    setVerifierAddress(verificationTaskCreated.verifier)
                }

            })
            .finally(()  => {
                setVerificationTasks(verificationTasks_)
                setVerificationTasksTemp(verificationTasks)
                setLoading(false)
            })
    }


    // const verificationTask = () => {
    //     let verificationTasksv2_: IVerificationTaskCreatedv2[] = []

    //     verificationTasks.map((task) => {
    //         let verifierProfile: IVerifierProfile | undefined

    //         verifierProfiles.map((v) => {
    //             if (v.verifier === task.verifier)
    //                 verifierProfile = v
    //         })

    //         validatedTasks.map((_task) => {
    //             if (_task.taskId === task.taskId && _task.taskStatus > task.taskStatus)
    //                 task.taskStatus = _task.taskStatus
    //         })

    //         updatedTasks.map((_task) => {
    //             if (_task.taskId === task.taskId && _task.taskStatus > task.taskStatus)
    //                 task.taskStatus = _task.taskStatus
    //         })

    //         verificationTasksv2_.push({
    //             company: task.company,
    //             siteName: task.siteName,
    //             siteAddress: getSiteInfo(task.siteName)?.siteAddressName || "",
    //             companySiret: getCompanyInfo(task.company)?.siret || "",
    //             companyAccount: address as `0x${string}`,
    //             companyAccountName: accountCompany?.name ?? "",
    //             companyAccountFirstName: accountCompany?.firstName ?? "",
    //             registerId: task.registerId,
    //             securityType: task.securityType,
    //             taskId: task.taskId,
    //             taskStatus: task.taskStatus,
    //             timeStamp: task.timeStamp,
    //             verifier: task.verifier,
    //             verifierCompanyName: verifierProfile?.nameCompany ?? "",
    //             verifierAddressName: verifierProfile?.addressName ?? "",
    //             verifierSiret: verifierProfile?.siret ?? "",
    //             verifierApprovalNumber: verifierProfile?.approvalNumber ?? "",
    //             verifierAccount: verifierProfile?.account ?? "0x",
    //             verifierName: verifierProfile?.name ?? "",
    //             verifierFirstName: verifierProfile?.firstName ?? ""
    //         })
    //     })

        // return verificationTasksv2_
    // }


    // const getSiteDetail = async () => {
    //     let sites: IRegisterCreated[] = []
    //     getRegisterCreatedEvents()
    //         .then(
    //             data => {
    //                 for (let i = 0; i < data.length; i++) {
    //                     const siteCompany: IRegisterCreated = data[i]
    //                     if (siteCompany.account !== address)
    //                         continue

    //                     sites.push(siteCompany)
    //                 }
    //             })
    //         .finally(() => {
    //             setSites(sites)
    //         })
    // }

    // const getVerifierProfiles = async () => {
    //     let verifierProfiles: IVerifierProfile[] = []

    //     getVerifiersProfile()
    //         .then(data => verifierProfiles = [...data])
    //         .finally(() => {
    //             setVerifierProfiles(verifierProfiles)

    //         })
    // }

    // const getCompanyAccountUpdated = async () => {
    //     let _account: ICompanyAccountUpdated

    //     getCompanyAccountUpdatedEventsv2()
    //         .then(
    //             data => {
    //                 for (let i = 0; i < data.length; i++) {
    //                     const companyAccount: ICompanyAccountUpdated = data[i]
    //                     if (companyAccount.account !== address)
    //                         continue

    //                     _account = companyAccount
    //                 }
    //             })
    //         .finally(() => {
    //             setAccountCompany(_account)

    //         })
    // }

    // const getVerificationTaskValidated = async () => {
    //     setValidatedTasks(await getVerificationTaskValidatedEventsv2())
    // }

    // const getVerificationTaskUpdated = async () => {
    //     setUpdatedTasks(await getVerificationTaskUpdatedEvents())
    // }



    // const getSiteInfo = (siteName: string): IRegisterCreated| undefined => {
    //     const index = sites?.findIndex((site) => site.siteName === siteName)

    //     if (index !== -1)
    //         return sites[index]
    // }


    

    

    // const onSelectTask = (taskId: number, taskStatus: number) => {
    //     setSelectedVerificationTask(taskId)
    //     if (taskStatus === 1) {
    //         setVerificationTaskStatus(true)
    //     } else {
    //         setVerificationTaskStatus(false)
    //     }
    // }

    // const getRegisterCompany = async () => {
    //     let _registerCompany: IRegisterCreated[] = []

    //     getRegisterCreatedEvents().then(data => {

    //         for (const[i, companySite] of data.entries()) {
    //             if (companySite.account !== address)
    //                 continue

    //             _registerCompany.push(companySite)
    //         }

    //     }).finally(() => {
    //         setRegistersCreated(_registerCompany)

    //     })
    // }


    // const getCompanyInfo = (company: `0x${string}`): IRegisterCreated| undefined => {
    //     const index = registersCreated?.findIndex((registerCompany) => registerCompany.account === company)

    //     if (index !== -1)
    //         return registersCreated[index]
    // }


    // const createMetadata = () => {
    //     let metadatas: IVerificationTaskMetadata[] = []

    //     verificationTasks2.map((data: IVerificationTaskCreatedv2) => {
    //         let metadata: IVerificationTaskMetadata = {
    //             task_id: Number(data.taskId),
    //             status: getTaskStatusName(Number(data.taskStatus)),
    //             sector: getRegisterVerification(Number(data.registerId)),
    //             type: data.securityType,
    //             date: convertTimestampToDate(Number(data.timeStamp)),
    //             timestamp: Number(data.timeStamp),
    //             accountCompany: {
    //                 account: data.companyAccount,
    //                 name: data.companyAccountName,
    //                 firstName: data.companyAccountFirstName,
    //             },
    //             company: {
    //                 account: data.company,
    //                 name: getSiteInfo(data.siteName)?.name,
    //                 address: getSiteInfo(data.siteName)?.addressName,
    //                 site: data.siteName,
    //                 siteAddress: getSiteInfo(data.siteName)?.siteAddressName,
    //                 siret: getSiteInfo(data.siteName)?.siret
    //             },
    //             verifier: {
    //                 account: data.verifier,
    //                 name: verifier?.name,
    //                 address: verifier?.addressName,
    //                 siret: verifier?.siret,
    //                 approvalNumber: verifier?.approvalNumber,
    //             }
    //         }

    //         metadatas.push(metadata)
    //     })

    //     metadatas.map((metadata) => {
    //         const metadataTojsonString = JSON.stringify(metadata);
    //     })
    // }

    // 1. get data from blockchain [filtered by public key]
    // 2. apply filters [searchQuery, filter, orderBy]
    // 3. set state with data

    

    const getVerificationFromBlockchain = (): IVerificationTaskCreatedv2[] => {
        const fakeData: IVerificationTaskCreatedv2[] = [{
            company: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyName: 'Compagnie 1',
            companyAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            siteName: 'Ohio 1',
            siteAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            companySiret: '123456',
            companyAccount: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyAccountName: 'McQueen',
            companyAccountFirstName: 'Steve',
        
            registerId: 6,
            securityType: 'extincteur',
            taskId: BigInt(0),
            taskStatus: BigInt(2),
            timeStamp: BigInt('1696861079'),
        
            verifier: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierCompanyName: 'Verifier 1',
            verifierAddressName: '97 Newcastle Street Fuquay Varina, NC 27526',
            verifierSiret: '121212',
            verifierApprovalNumber: '456987',
        
            verifierAccount: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierName: 'Smith',
            verifierFirstName: 'John',
        },
        {
            company: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyName: 'Compagnie 1',
            companyAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            siteName: 'Ohio 1',
            siteAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            companySiret: '123456',
            companyAccount: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyAccountName: 'McQueen',
            companyAccountFirstName: 'Steve',
        
            registerId: 5,
            securityType: 'tableau electrique',
            taskId: BigInt(1),
            taskStatus: BigInt(3),
            timeStamp: BigInt('1696861080'),
        
            verifier: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierCompanyName: 'Verifier 1',
            verifierAddressName: '97 Newcastle Street Fuquay Varina, NC 27526',
            verifierSiret: '121212',
            verifierApprovalNumber: '456987',
        
            verifierAccount: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierName: 'Smith',
            verifierFirstName: 'John',
        },
        {
            company: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyName: 'Compagnie 1',
            companyAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            siteName: 'Ohio 1',
            siteAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            companySiret: '123456',
            companyAccount: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyAccountName: 'McQueen',
            companyAccountFirstName: 'Steve',
        
            registerId: 2,
            securityType: 'ascenseur',
            taskId: BigInt(2),
            taskStatus: BigInt(0),
            timeStamp: BigInt('1696861081'),
        
            verifier: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierCompanyName: 'Verifier 1',
            verifierAddressName: '97 Newcastle Street Fuquay Varina, NC 27526',
            verifierSiret: '121212',
            verifierApprovalNumber: '456987',
        
            verifierAccount: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierName: 'Smith',
            verifierFirstName: 'John',
        },
        {
            company: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyName: 'Compagnie 1',
            companyAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            siteName: 'Ohio 2',
            siteAddress: '802 Ohio Rd.Woodhaven, NY 11421',
            companySiret: '123456',
            companyAccount: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyAccountName: 'McQueen',
            companyAccountFirstName: 'Steve',
        
            registerId: 6,
            securityType: 'extincteur',
            taskId: BigInt(3),
            taskStatus: BigInt(4),
            timeStamp: BigInt('1696861082'),
        
            verifier: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierCompanyName: 'Verifier 1',
            verifierAddressName: '97 Newcastle Street Fuquay Varina, NC 27526',
            verifierSiret: '121212',
            verifierApprovalNumber: '456987',
        
            verifierAccount: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierName: 'Smith',
            verifierFirstName: 'John',
        },{
            company: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyName: 'Compagnie 1',
            companyAddress: '800 Ohio Rd.Woodhaven, NY 11421',
            siteName: 'Ohio 2',
            siteAddress: '802 Ohio Rd.Woodhaven, NY 11421',
            companySiret: '123456',
            companyAccount: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
            companyAccountName: 'McQueen',
            companyAccountFirstName: 'Steve',
        
            registerId: 5,
            securityType: 'tableau electrique',
            taskId: BigInt(4),
            taskStatus: BigInt(0),
            timeStamp: BigInt('1696861083'),
        
            verifier: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierCompanyName: 'Verifier 1',
            verifierAddressName: '97 Newcastle Street Fuquay Varina, NC 27526',
            verifierSiret: '121212',
            verifierApprovalNumber: '456987',
        
            verifierAccount: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
            verifierName: 'Smith',
            verifierFirstName: 'John',
        },]

        return fakeData
    }

    const searchInObject = (obj: IVerificationTaskCreatedv2, term: string): boolean => {
        if (!term)
            return true
        
        for (const key in obj) {
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
        const data = getVerificationFromBlockchain()
        const filteredData = data.filter(setFilters)
        const checkedData = filteredData.filter(searchChecked)
        let dataOutput: IVerificationTaskCreatedv2[] = []

        if (checkedData.length === 0) {
            dataOutput = filteredData
        } else {
            dataOutput = checkedData
        }

        if (orderDesc)
            return dataOutput.filter(setFilters).toReversed()

        return dataOutput.filter(setFilters)
    }

    const searchQuery = (keyword: any|null|undefined) => {
        setQuery(keyword.target.value.toLowerCase())
    }

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        setCheckboxes({ ...checkboxes, [name]: {status: checked, id: name.charAt(name.length-1)} })
    }

    return (
        <Loader isLoading={loading}>
        <div className=" flex flex-col lg:mx-20">

            {/* Security register Table list */}
            <div className="rounded backdrop-blur-sm shadow-2xl
                bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                p-6 lg:mx-auto w-full">

                {/* Header 1 with title, searchBar and button */}
                <div className="flex lg:flex-row justify-between p-2 lg:p-0">
                    {/* title */}
                    <div className="text-sm lg:text-base text-left lg:w-1/6">
                        <h1 className="text-gray-900">Tâches de vérification</h1>
                    </div>

                    {/* Search bar LG */}
                    <div className="hidden lg:block text-sm lg:text-base text-center sm:mb-0.5 lg:w-4/6 lg:mx-2">
                        <input
                            className="rounded-lg bg-gray-900/20 border-hidden w-full"
                            placeholder="Rechercher"
                            onChange={searchQuery}
                        />
                    </div>

                    {/* Button */}
                    <div className="text-right">
                        <VerificationTaskButtonNew />
                    </div>
                </div>


                {/* Search bar SM */}
                <div className="lg:hidden text-sm text-center grow mb-0.5">
                    <input
                        className="rounded-lg bg-gray-900/20 border-hidden w-full"
                        placeholder="Rechercher"
                        onChange={searchQuery}
                    />
                </div>
                {/* Sub header with filters */}
                <FilterByCheckbox checkboxes={checkboxes} handleCheckboxChange={handleCheckboxChange} />

                {/* Table */}
                <div className="flex flex-col lg:py-2">
                    <div className="hidden lg:grid lg:grid-cols-9 lg:gap-0 rounded-t 
                        bg-gradient-to-b from-neutral-600/30 to-neutral-400/50
                        font-medium
                        text-xs lg:text-sm text-center lg:text-center lg:py-0 lg:mb-0.5">

                        {/*verification task*/}
                        <div className="py-3">Task id</div>
                        <div className="py-3">Statut</div>
                        <div className="py-3">Sector</div>
                        <div className="py-3">Type</div>
                        {/*company*/}
                        <div className="py-3">Company</div>
                        <div className="py-3">Site</div>
                        <div className="py-3">Site Adresse</div>
                        {/*verifier*/}
                        <div className="py-3">Vérificateur</div>
                        {/* <div className="py-3">Adresse</div>
                        <div className="py-3">Siret</div>
                        <div className="py-3">Approval</div> */}
                        <div className="py-3">Date de création</div>

                    </div>

                    {/* Data */}
                    {!loading && verificationTask().map((data: IVerificationTaskCreatedv2, index) =>
                        <div key={index} 
                            className="flex flex-col lg:grid lg:grid-cols-9 text-xs text-center
                                pb-3 lg:p-0 lg:my-0
                                bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                                hover:bg-indigo-400/30 active:bg-gray-900/30"
                            //  onClick={() => onSelectTask(Number(data.taskId), Number(data.taskStatus))}
                             >

                            {/*Verification task info*/}
                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <p className="lg:hidden basis-1/4 pr-1 font-bold">Task id</p>
                                    <p className="pl-1 lg:pl-0">{Number(data.taskId)}</p>
                                </div>
                            </div>

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Statut</div>
                                    <div className={`
                                        ${Number(data.taskStatus) === 0 && ' bg-cyan-400 rounded-xl border border-gray-900/10 p-1'}
                                        ${Number(data.taskStatus) === 1 && ' bg-purple-400 rounded-xl border border-gray-900/10 p-1'}
                                        ${Number(data.taskStatus) === 2 && ' bg-green-400 rounded-xl border border-gray-900/10 p-1'}
                                        ${Number(data.taskStatus) === 3 && ' bg-rose-400 rounded-xl border border-gray-900/10 p-1'}
                                        ${Number(data.taskStatus) === 4 && ' bg-amber-400 rounded-xl border border-gray-900/10 p-1'}
                                        lg:p0 lg:w-full`}>
                                        {getTaskStatusName(Number(data.taskStatus))}
                                    </div>
                                </div>
                            </div>

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Sector</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{getRegisterVerification(Number(data.registerId))}</div>
                                </div>
                            </div>

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Type</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.securityType}</div>
                                </div>
                            </div>

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Company</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.companyName}</div>
                                </div>
                            </div>

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Site</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.siteName}</div>
                                </div>
                            </div>

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Adresse</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.siteAddress}</div>
                                </div>
                            </div>



                            {/*verifier info*/}
                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Vérificateur</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.verifierCompanyName}</div>
                                </div>
                            </div>
                            {/* <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Adresse</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.verifierAddressName}</div>
                                </div>
                            </div>
                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Siret</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.verifierSiret}</div>
                                </div>
                            </div>
                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Adresse</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{data.verifierApprovalNumber}</div>
                                </div>
                            </div>  */}

                            <div className="text-left lg:text-center mt-3 lg:mt-0 lg:border-b lg:border-gray-900/10 lg:py-3">
                                <div className="flex lg:items-center lg:justify-center h-full px-1">
                                    <div className="lg:hidden basis-1/4 pr-1 font-bold">Date de création</div>
                                    <div className="pl-1 lg:p0 basis-3/4">{convertTimestampToDate(Number(data.timeStamp))}</div>
                                </div>
                            </div>

                        </div>
                    )
                    }
                </div>


            </div>
        </div>
        </Loader>
    );
};

function useMedia(arg0: { maxWidth: string; }) {
    throw new Error("Function not implemented.");
}
