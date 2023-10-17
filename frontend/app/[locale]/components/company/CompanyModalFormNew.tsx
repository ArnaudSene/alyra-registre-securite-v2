'use client'

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { writeContractByFunctionName } from "@/utils";
import { IFormSubscriptionCompany, ILayoutButton, ILayoutEventLog, IToasterMessages } from "@/interfaces/intl";
import { formSubscriptionCompanyIntl, layoutButtonIntl, layoutEventLogIntl, toasterMessages } from "@/utils/intl";
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { useAccount, useContractEvent } from "wagmi";
import { abi, contractAddress } from "@/constants";
import { Log } from "viem";
import { IEventLog } from "@/interfaces/layout";
import { EventLogLayout } from "../layout/EventFieldLayout";
import { SubmitButtonLayout } from "../layout/ButtonLink";
import FormInputLayout from "../layout/FormInputLayout";

const initialState = {
    message: null,
}

export const CompanyModalFormNew = () => {
    const { address } = useAccount()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [eventLogs, setEventLogs] = useState<Log[]>([])
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const tostMessage: IToasterMessages = toasterMessages()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const formSubscriptionCompany: IFormSubscriptionCompany = formSubscriptionCompanyIntl()
    const eventName = 'RegisterCreated'
    const actionName = 'createRegister'
    
    useEffect(() => {
        if(loading) {
            for (const log of eventLogs as Iterable<Log>) {
                const logArgs: any = log.args

                if (logArgs._addr === address) {
                    setEventLog({
                        blockTitle: layoutEventLog.blockTitle,
                        blockData: [
                            {
                                title: layoutEventLog.smartContractAddress,
                                value: log.address
                            },
                            {
                                title: layoutEventLog.blockHash,
                                value: log.blockHash
                            },
                            {
                                title: layoutEventLog.transactionHash,
                                value: log.transactionHash
                            },
                            {
                                title: layoutEventLog.blockNumber,
                                value: log.blockNumber?.toString()
                            },
                        ],
                        title: layoutEventLog.title,
                        data: [
                            {
                                title: layoutEventLog.publicKeyAddress,
                                value: logArgs._addr
                            },
                            {
                                title: formSubscriptionCompany.name,
                                value: logArgs._name
                            },
                            {
                                title: formSubscriptionCompany.address,
                                value: logArgs._addressName
                            },
                            {
                                title: formSubscriptionCompany.siret,
                                value: logArgs._siret
                            },
                            {
                                title: formSubscriptionCompany.siteName,
                                value: logArgs._siteName
                            },
                            {
                                title: formSubscriptionCompany.siteAddress,
                                value: logArgs._siteAddressName
                            }
                        ]
                    })
                    setLoading(false)
                    toast({
                        title: tostMessage.subscribeCompanyOkTitle,
                        description: tostMessage.subscribeCompanyOkDescription,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    break
                }
            }
        }
    }, [eventLogs])

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: eventName,
        listener(logs) {
            setEventLogs(logs)
            console.log(logs)
        }
    })

    const submitCreateCompany = async (prevState: any, formData: FormData) => {
        const indexIntl = (formData: FormData): string[] => {
            const mapping: {
                [key: string]: number;
              } = {
                name: 0,
                address: 1,
                siret: 2,
                siteName: 3,
                siteAddress: 4,
              };
              
            let result: string[] = []
    
            for (const [key, value] of formData.entries() as Iterable<[string, string]>)
                result[mapping[key]] = value
            
            return result
        }
        indexIntl(formData)
    
        writeContractByFunctionName(actionName, ...indexIntl(formData))
            .then(() => {
                setLoading(true)                
            })
            .catch(err => {
                console.log(`writeContractByFunctionName(${actionName}) error => ` + err)
                toast({
                    title: tostMessage.subscribeCompanyErrorTitle,
                    description: tostMessage.subscribeCompanyErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }
    const [state, formAction] = useFormState(submitCreateCompany, initialState)
    const layoutButton: ILayoutButton = layoutButtonIntl()

    return (
        <form action={formAction}>
            <div className=" flex flex-col md:mx-20">
                <div className="rounded backdrop-blur-sm shadow-2xl 
                    bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                    p-6 md:w-1/2 md:mx-auto w-full">

                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {formSubscriptionCompany.title}
                    </h2>
                    <p className="my-2  text-sm leading-6 text-gray-600">
                        {formSubscriptionCompany.description}
                    </p>

                    {/* Form inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-6 ">
                        <FormInputLayout params={{
                            id: "siret",
                            label: formSubscriptionCompany.siret,
                            placeholder: formSubscriptionCompany.siret,
                            autoComplete: "siret"
                        }}/>
                        
                        <FormInputLayout params={{
                            id: "name",
                            label: formSubscriptionCompany.name,
                            placeholder: formSubscriptionCompany.name,
                            autoComplete: "name"
                        }}/>

                        <FormInputLayout params={{
                            id: "address",
                            label: formSubscriptionCompany.address,
                            placeholder: formSubscriptionCompany.address,
                            autoComplete: "address"
                        }}/>

                        <FormInputLayout params={{
                            id: "siteName",
                            label: formSubscriptionCompany.siteName,
                            placeholder: formSubscriptionCompany.siteName,
                            autoComplete: "siteName"
                        }}/>

                        <FormInputLayout params={{
                            id: "siteAddress",
                            label: formSubscriptionCompany.siteAddress,
                            placeholder: formSubscriptionCompany.siteAddress,
                            autoComplete: "siteAddress"
                        }}/>
                    </div>

                    {/* Submit button */}
                    <SubmitButtonLayout params={{
                        loading: loading,
                        spinnerSize: 'sm',
                        buttonName: layoutButton.save
                    }}/>
                    {/* <SubmitButton /> */}
                </div>

                {/* Event Logs */}
                <EventLogLayout params={{
                    title: layoutEventLog.linkTitle,
                    description: "",
                    events: eventLog
                }}/>
            </div>
        </form>
    );
}