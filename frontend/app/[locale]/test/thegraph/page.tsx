'use client'

import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import {
    getVerificationTasksFromEventsByCompany,
} from "@/utils/verificationTasks"
import { ICompanyAccountUpdated, IRegisterCreated } from "@/interfaces/registers"
import { IVerificationTaskCreated } from "@/interfaces/verificationTasks"
import { convertTimestampToDate } from "@/utils"
import { IVerifierCreated } from "@/interfaces/verifier"

const MyGraphQL = () => {
    const { address, isConnected } = useAccount()

    const [registerCreateds, setRegisterCreateds] = useState<IRegisterCreated[]>([])
    const [companyAccounts, setCompanyAccounts] = useState<ICompanyAccountUpdated[]>([])
    const [verificationTasks, setVerificationTasks] = useState<IVerificationTaskCreated[]>([])
    const [verifiers, setVerifiers] = useState<IVerifierCreated[]>([])

    const DEFAULT_PAGINATION_FIRST: number = 1000
    const DEFAULT_PAGINATION_SKIP: number = 0

    const getRegistersCreated = async () => {
        if ( address !== undefined) {
            getVerificationTasksFromEventsByCompany(
                address, DEFAULT_PAGINATION_FIRST, DEFAULT_PAGINATION_SKIP
            )
                .then((verificationTaskAggregate) => {
                    console.log('verificationTaskAggregate', verificationTaskAggregate)
                    setRegisterCreateds(verificationTaskAggregate.registerCreateds)
                    setCompanyAccounts(verificationTaskAggregate.companyAccounts)
                    setVerificationTasks(verificationTaskAggregate.verificationTasks)
                    setVerifiers(verificationTaskAggregate.verifiers)
                })
        }
    }

    useEffect(() => {
        getRegistersCreated().then(() => console.log("getRegistersCreated loading"))
    }, []);

    return (
        <>
            <div className={`flex p-2 w-auto bg-neutral-50/20 text-xs`}>
                <div className={`flex flex-col bg-gray-900/50 rounded border border-gray-900/10 text-stone-100`}>
                    <div className={`flex justify-start bg-gray-900/60 p-2`}>
                        <h1 className={`font-bold`}>Account : <span className={`font-normal`}>{address ? address?.toString() : "Not" +
                            " connected"}</span></h1>
                    </div>


                    {/*Register */}
                    <div className={`flex justify-start bg-blue-950 text-gray-100 p-2`}>
                        <h2 className={`font-semibold`}>Register created (Companies)</h2>
                    </div>

                    <div className={`grid grid-cols-6 bg-amber-400 text-gray-900 py-2 px-1`}>
                        {Object.keys(registerCreateds[0] || []).map((k, index) => (
                            <div className={`px-1`} key={index}>{k}</div>
                        ))}
                    </div>

                    <div className={`px-1 py-2`}>
                        {registerCreateds.map((registerCreated: IRegisterCreated, index) => (
                            <div key={index} className={`grid grid-cols-6`}>
                                <div className={`px-1`}>{registerCreated.account}</div>
                                <div className={`px-1`}>{registerCreated.name}</div>
                                <div className={`px-1`}>{registerCreated.siret}</div>
                                <div className={`px-1`}>{registerCreated.addressName}</div>
                                <div className={`px-1`}>{registerCreated.siteName}</div>
                                <div className={`px-1`}>{registerCreated.siteAddressName}</div>
                            </div>
                        ))}
                    </div>

                    {/*company account*/}
                    <div className={`flex justify-start bg-blue-950 text-gray-100 p-2`}>
                        <h2 className={`font-semibold`}>Company Accounts</h2>
                    </div>

                    <div className={`grid grid-cols-5 bg-amber-400 text-gray-900 py-2 px-1`}>
                        {Object.keys(companyAccounts[0] || []).map((k, index) => (
                            <div className={`px-1`} key={index}>{k}</div>
                        ))}
                    </div>

                    <div className={`px-1 py-2`}>
                        {companyAccounts.map((companyAccount: ICompanyAccountUpdated, index) => (
                            <div key={index} className={`grid grid-cols-5`}>
                                <div className={`px-1`}>{companyAccount.company}</div>
                                <div className={`px-1`}>{companyAccount.account}</div>
                                <div className={`px-1`}>{companyAccount.name}</div>
                                <div className={`px-1`}>{companyAccount.firstName}</div>
                                <div className={`px-1`}>{companyAccount.action}</div>
                            </div>
                        ))}
                    </div>

                    {/*Verification tasks*/}
                    <div className={`flex justify-start bg-blue-950 text-gray-100 p-2`}>
                        <h2 className={`font-semibold`}>Verification tasks</h2>
                    </div>

                    <div className={`grid grid-cols-8 bg-amber-400 text-gray-900 py-2 px-1`}>
                        {Object.keys(verificationTasks[0] || []).map((k, index) => (
                            <div className={`px-1`} key={index}>{k}</div>
                        ))}
                    </div>

                    <div className={`px-1 py-2`}>
                        {verificationTasks.map((verificationTask: IVerificationTaskCreated, index) => (
                            <div key={index} className={`grid grid-cols-8`}>
                                <div className={`px-1`}>{verificationTask.company}</div>
                                <div className={`px-1`}>{verificationTask.verifier}</div>
                                <div className={`px-1`}>{verificationTask.registerId}</div>
                                <div className={`px-1`}>{verificationTask.securityType}</div>
                                <div className={`px-1`}>{verificationTask.taskId.toString()}</div>
                                <div className={`px-1`}>{verificationTask.taskStatus.toString()}</div>
                                <div className={`px-1`}>{verificationTask.siteName}</div>
                                <div className={`px-1`}>{convertTimestampToDate(Number(verificationTask.timeStamp))}</div>
                            </div>
                        ))}
                    </div>

                    {/*Verifiers*/}
                    <div className={`flex justify-start bg-blue-950 text-gray-100 p-2`}>
                        <h2 className={`font-semibold`}>Verifiers (Company)</h2>
                    </div>

                    <div className={`grid grid-cols-5 bg-amber-400 text-gray-900 py-2 px-1`}>
                        {Object.keys(verifiers[0] || []).map((k, index) => (
                            <div className={`px-1`} key={index}>{k}</div>
                        ))}
                    </div>

                    <div className={`px-1 py-2`}>
                        {verifiers.map((verifier: IVerifierCreated, index) => (
                            <div key={index} className={`grid grid-cols-5`}>
                                <div className={`px-1`}>{verifier.verifier}</div>
                                <div className={`px-1`}>{verifier.name}</div>
                                <div className={`px-1`}>{verifier.addressName}</div>
                                <div className={`px-1`}>{verifier.siret}</div>
                                <div className={`px-1`}>{verifier.approvalNumber}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default MyGraphQL