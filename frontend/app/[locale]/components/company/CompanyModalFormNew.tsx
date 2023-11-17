'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Log } from "viem"
import { useAccount, useContractEvent } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { IEventLog } from "@/interfaces/layout"
import { IFormSubscriptionCompany, ILayoutButton, ILayoutEventLog, IToasterMessages } from "@/interfaces/intl"
import { writeContractByFunctionName } from "@/utils"
import { formSubscriptionCompanyIntl, layoutButtonIntl, layoutEventLogIntl, toasterMessages } from "@/utils/intl"
import { EventLogLayout } from "../layout/EventFieldLayout"
import { SubmitButtonLayout } from "../layout/ButtonLink"
import { FormInputLayout } from "../layout/FormInputLayout"
import IsConnectedAs from "../IsConnectedAs"

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
                // @ts-expect-error
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
            const mapping: {[key: string]: number} = {
                name: 0,
                address: 1,
                siret: 2,
                siteName: 3,
                siteAddress: 4,
              }
              
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
        <IsConnectedAs>
            <form action={formAction}>
                <div className="flex flex-col lg:mx-10 md:mx-20">
                    <div className="rounded backdrop-blur-sm shadow-2xl 
                        bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                        p-6 lg:w-1/2 md:w-full md:mx-auto w-full">

                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            {formSubscriptionCompany.title}
                        </h2>
                        <p className="my-2  text-sm leading-6 text-gray-600">
                            {formSubscriptionCompany.description}
                        </p>

                        {/* Form inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-6 ">
                            <FormInputLayout props={{
                                id: "siret",
                                label: formSubscriptionCompany.siret,
                                placeholder: formSubscriptionCompany.siret,
                                autoComplete: "siret"
                            }}/>
                            
                            <FormInputLayout props={{
                                id: "name",
                                label: formSubscriptionCompany.name,
                                placeholder: formSubscriptionCompany.name,
                                autoComplete: "name"
                            }}/>

                            <FormInputLayout props={{
                                id: "address",
                                label: formSubscriptionCompany.address,
                                placeholder: formSubscriptionCompany.address,
                                autoComplete: "address"
                            }}/>

                            <FormInputLayout props={{
                                id: "siteName",
                                label: formSubscriptionCompany.siteName,
                                placeholder: formSubscriptionCompany.siteName,
                                autoComplete: "siteName"
                            }}/>

                            <FormInputLayout props={{
                                id: "siteAddress",
                                label: formSubscriptionCompany.siteAddress,
                                placeholder: formSubscriptionCompany.siteAddress,
                                autoComplete: "siteAddress"
                            }}/>
                        </div>

                        {/* Submit button */}
                        <SubmitButtonLayout props={{
                            loading: loading,
                            spinnerSize: 'sm',
                            buttonName: layoutButton.save
                        }}/>
                        {/* <SubmitButton /> */}
                    </div>

                    {/* Event Logs */}
                    <EventLogLayout props={{
                        title: layoutEventLog.linkTitle,
                        description: "",
                        events: eventLog
                    }}/>
                </div>
            </form>
        </IsConnectedAs>
    )
}