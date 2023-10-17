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
import { useEffect, useState } from "react";
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


export const VerificationTaskForVerifierv2 = () => {
    const { address} = useAccount()
    const {refreshScreen, setVerificationTaskStatus, setSelectedVerificationTask, createVerificationTaskRefresh,  verificationTaskRefresh } = useIdentityContext()
    const [loading, setLoading] = useState(true)
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

    useEffect(() => {
        setSelectedVerificationTask(-1)
        setLoading(true)
        LoadData()
    }, [refreshScreen])

    // [refreshScreen, refresh, verificationTaskRefresh, loading, createVerificationTaskRefresh]
    const LoadData = () => {
        getVerificationTaskUpdated()
        getVerificationTaskValidated()
        getSiteDetail()
        getVerifierProfiles()
        getVerificationTasks()
    }


    const getVerificationTasks = async () => {
        let verificationTasks_: IVerificationTaskCreated[] = []

        getVerificationTaskCreatedEventsv2()
            .then(data => {
                // Get Verification tasks
                for (let i = 0; i < data.length; i++) {
                    const verificationTaskCreated: IVerificationTaskCreated = data[i]

                    if(verificationTaskCreated.verifier !== address)
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


    const verificationTask = () => {
        let verificationTasksv2_: IVerificationTaskCreatedv2[] = []

        verificationTasks.map((task) => {
            let verifierProfile: IVerifierProfile | undefined

            verifierProfiles.map((v) => {
                if (v.verifier === task.verifier)
                    verifierProfile = v
            })

            validatedTasks.map((_task) => {
                if (_task.taskId === task.taskId && _task.taskStatus > task.taskStatus)
                    task.taskStatus = _task.taskStatus
            })

            updatedTasks.map((_task) => {
                if (_task.taskId === task.taskId && _task.taskStatus > task.taskStatus)
                    task.taskStatus = _task.taskStatus
            })

            verificationTasksv2_.push({
                company: task.company,
                siteName: task.siteName,
                siteAddress: getSiteInfo(task.siteName)?.siteAddressName || "",
                companySiret: getCompanyInfo(task.company)?.siret || "",
                companyAccount: address as `0x${string}`,
                companyAccountName: accountCompany?.name ?? "",
                companyAccountFirstName: accountCompany?.firstName ?? "",
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
            })
        })

        return verificationTasksv2_
    }


    const getSiteDetail = async () => {
        let sites: IRegisterCreated[] = []
        getRegisterCreatedEvents()
            .then(
                data => {
                    for (let i = 0; i < data.length; i++) {
                        const siteCompany: IRegisterCreated = data[i]
                        if (siteCompany.account !== address)
                            continue

                        sites.push(siteCompany)
                    }
                })
            .finally(() => {
                setSites(sites)
            })
    }

    const getVerifierProfiles = async () => {
        let verifierProfiles: IVerifierProfile[] = []

        getVerifiersProfile()
            .then(data => verifierProfiles = [...data])
            .finally(() => {
                setVerifierProfiles(verifierProfiles)

            })
    }


    const getVerificationTaskValidated = async () => {
        setValidatedTasks(await getVerificationTaskValidatedEventsv2())
    }

    const getVerificationTaskUpdated = async () => {
        setUpdatedTasks(await getVerificationTaskUpdatedEvents())
    }

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


    const getSiteInfo = (siteName: string): IRegisterCreated| undefined => {
        const index = sites?.findIndex((site) => site.siteName === siteName)

        if (index !== -1)
            return sites[index]
    }


    const getTaskStatusName = (taskStatus: number) => {
        return VerificationStatus[taskStatus]
    }

    const searchQuery = (keyword: any|null|undefined) => {
        keyword = keyword.target.value.toLowerCase()

        let result = verificationTasksTemp.filter((item) => {
            return item.siteName.toLowerCase().includes(keyword) ||
                item.securityType.toLowerCase().includes(keyword) ||
                getRegisterVerification(item.registerId).toLowerCase().includes(keyword)
        })

        setVerificationTasks(result)
    }

    const onSelectTask = (taskId: number, taskStatus: number) => {
        setSelectedVerificationTask(taskId)
        if (taskStatus === 0) {
            setVerificationTaskStatus(true)
        } else {
            setVerificationTaskStatus(false)
        }
    }


    const getCompanyInfo = (company: `0x${string}`): IRegisterCreated| undefined => {
        const index = registersCreated?.findIndex((registerCompany) => registerCompany.account === company)

        if (index !== -1)
            return registersCreated[index]
    }




    return (
        <Loader isLoading={loading}>
            <div>

                {/*Show verifier*/}
                <div className="rounded h-auto text-center border-gray-800 border bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg
                 md:basis-1 py-2 md:p-5 md:border-t-rose-500">

                    <div className="flex md:flex-row justify-between p-2 md:p-0  ">
                        <div className="text-sm md:text-base text-left py-2 md:basis-1/4">
                            <h1 className="text-cyan-300">Tâches de vérification</h1>
                        </div>

                        <div className="hidden md:block text-sm md:text-base text-center grow ">
                            <input
                                className="md:bg-gray-700 md:text-cyan-500 md:focus:border-cyan-300 w-full"
                                placeholder="Rechercher"
                                onChange={() => searchQuery(event)}
                            />
                        </div>
                        <div className="md:basis-1/4 text-right">
                            <VerificationTaskButton />
                        </div>


                    </div>

                    <div className="md:hidden text-sm text-center grow ">
                        <input
                            className="bg-gray-700 text-cyan-500 focus:border-rose-300 w-full"
                            placeholder="Rechercher"
                            onChange={() => searchQuery(event)}
                        />
                    </div>



                    <div className=" flex flex-col md:py-2">
                        <div className="hidden md:grid md:grid-cols-11 md:gap-0 border-b border-rose-500 bg-gray-700 font-bold
                        text-xs md:text-sm md:py-3 text-center md:text-center md:mb-2">

                            {/*verification task*/}
                            <div className="md:border-gray-900 md:border-x">Task id</div>
                            <div className="md:border-gray-900 md:border-x">Statut</div>
                            <div className="md:border-gray-900 md:border-x">Sector</div>
                            <div className="md:border-gray-900 md:border-x">Type</div>
                            {/*company*/}
                            <div className="md:border-gray-900 md:border-x">Site</div>
                            <div className="md:border-gray-900 md:border-x">Site Adresse</div>
                            {/*verifier*/}
                            <div className="md:border-gray-900 md:border-x">Vérificateur</div>
                            <div className="md:border-gray-900 md:border-x">Adresse</div>
                            <div className="md:border-gray-900 md:border-x">Siret</div>
                            <div className="md:border-gray-900 md:border-x">Approval</div>
                            <div className="md:border-gray-900 md:border-x">Date de création</div>

                        </div>

                        {!loading && verificationTask().map((data: IVerificationTaskCreatedv2, index) =>
                            <div key={index} className="flex flex-col md:grid md:grid-cols-11 text-xs text-center
                            border-t border-t-gray-600 md:border-0  pb-3 md:p-0 md:my-0
                            bg-gradient-to-b from-gray-800 to-gray-900
                            md:bg-gradient-to-t md:from-gray-900 md:to-gray-900
                            hover:bg-gradient-to-t hover:from-gray-800 hover:to-gray-700 hover:text-cyan-300
                            active:bg-gradient-to-t active:from-cyan-500 active:to-cyan-400 active:text-gray-700
                            "
                                 onClick={() => onSelectTask(Number(data.taskId), Number(data.taskStatus))}>

                                {/*Verification task info*/}
                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Task id</div>
                                        <div className="pl-1 md:p0">{Number(data.taskId)}</div>
                                    </div>
                                </div>

                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Statut</div>
                                        <div className={`
                                        ${Number(data.taskStatus) === 0 && ' text-cyan-500'}
                                        ${Number(data.taskStatus) === 1 && ' text-purple-500'}
                                        ${Number(data.taskStatus) === 2 && ' text-lime-500'}
                                        ${Number(data.taskStatus) === 3 && ' text-rose-500'}
                                        ${Number(data.taskStatus) === 4 && ' text-amber-400'}
                                        pl-1 md:p0`}>
                                            {getTaskStatusName(Number(data.taskStatus))}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Sector</div>
                                        <div className="pl-1 md:p0">{getRegisterVerification(Number(data.registerId))}</div>
                                    </div>
                                </div>
                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Type</div>
                                        <div className="pl-1 md:p0">{data.securityType}</div>
                                    </div>
                                </div>



                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Site</div>
                                        <div className="pl-1 md:p0">{data.siteName}</div>
                                    </div>
                                </div>

                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Adresse</div>
                                        <div className="pl-1 md:p0">{data.siteAddress}</div>
                                    </div>
                                </div>



                                {/*verifier info*/}
                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Vérificateur</div>
                                        <div className="pl-1 md:p0">{data.verifierCompanyName}</div>
                                    </div>
                                </div>
                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Adresse</div>
                                        <div className="pl-1 md:p0">{data.verifierAddressName}</div>
                                    </div>
                                </div>
                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Siret</div>
                                        <div className="pl-1 md:p0">{data.verifierSiret}</div>
                                    </div>
                                </div>
                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Adresse</div>
                                        <div className="pl-1 md:p0">{data.verifierApprovalNumber}</div>
                                    </div>
                                </div>

                                <div className="text-left md:text-center mt-3 md:mt-0  md:border-x md:border-b md:border-gray-700 md:py-3">
                                    <div className="flex md:block">
                                        <div className="font-bold w-2/12 md:hidden pl-1">Date de création</div>
                                        <div className="pl-1 md:p0">{convertTimestampToDate(Number(data.timeStamp))}</div>
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