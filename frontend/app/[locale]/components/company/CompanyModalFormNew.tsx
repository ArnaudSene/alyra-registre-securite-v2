'use client'

// @ts-expect-error experimental
import { experimental_useFormState as useFormState } from 'react-dom'
import React, { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import {
    IEventLog,
    IhandleEventsResponse,
    ILayoutEventLogMapping
} from "@/interfaces/layout"
import {
    IFormSubscriptionCompany,
    IGeneral,
    ILayoutButton,
    ILayoutEventLog,
    IToasterMessages
} from "@/interfaces/intl"
import { writeContractByFunctionName } from "@/utils"
import {
    formSubscriptionCompanyIntl,
    generalIntl,
    layoutButtonIntl,
    layoutEventLogIntl,
    toasterMessages
} from "@/utils/intl"
import { EventLogLayout } from "../layout/EventFieldLayout"
import { SubmitButtonLayout2 } from "../layout/ButtonLink"
import { FormInputLayout } from "../layout/FormInputLayout"
import IsConnectedAs from "../IsConnectedAs"
import { SubscribeEvent } from "@/app/[locale]/components/base/SubscribeEvent"
import { handleEvents } from "@/utils/events"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"
import { useGlobalContext } from "@/contexts/Global"

const initialState = {
    message: null,
}

export const CompanyModalFormNew = () => {
    // Contexts
    const { address } = useAccount()
    const { subscribeEventLogs, setSubscribeEventLogs } = useRegisterSecurityEventContext()
    const { setReloadPage } = useGlobalContext()

    // states
    const [loading, setLoading] = useState(false)
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const [eventWaiting, setEventWaiting] = useState(false)

    // Utils
    const toast = useToast()
    const toastMessage: IToasterMessages = toasterMessages()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const formSubscriptionCompany: IFormSubscriptionCompany = formSubscriptionCompanyIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()
    const general: IGeneral = generalIntl()

    // Constants
    const eventName = 'RegisterCreated'
    const componentName = "CompanyModalFormNew"
    const layoutEventLogMapping: ILayoutEventLogMapping = {
        addressAttribute: '_addr',
        addressValue: address as `0x${string}`,
    }

    /**
     * Handle submit to create a company.
     * @param prevState
     * @param formData
     */
    const submitCreateCompany = async (prevState: any, formData: FormData) => {
        const actionName = 'createRegister'
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
                setEventWaiting(true)
            })
            .catch(err => {
                console.log(`${componentName} (${actionName}) error => ` + err)
                toast({
                    title: toastMessage.subscribeCompanyErrorTitle,
                    description: toastMessage.subscribeCompanyErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }
    const [state, formAction] = useFormState(submitCreateCompany, initialState)

    useEffect(() => {
        if ( subscribeEventLogs.id === componentName && subscribeEventLogs.eventLog.length > 0 ) {
            const handleEventsResponse: IhandleEventsResponse = handleEvents(
                layoutEventLog, subscribeEventLogs.eventLog, layoutEventLogMapping)

            if (handleEventsResponse.ok) {
                setEventLog(handleEventsResponse.eventLog)
                toast({
                    title: toastMessage.subscribeCompanyOkTitle,
                    description: toastMessage.subscribeCompanyOkDescription,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setEventWaiting(false)
            setLoading(false)
            setSubscribeEventLogs({id: componentName, eventLog: []})
            setReloadPage(true)
        }
    }, [subscribeEventLogs])

    return (
        <IsConnectedAs>
            {eventWaiting && <SubscribeEvent props={{taskId: componentName, eventName: eventName}} />}

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

                        <div className="mt-6 pt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
                            <SubmitButtonLayout2 props={{
                                loading: loading,
                                spinnerSize: 'sm',
                                buttonName: layoutButton.save,
                                loadingName: general.inProgress,
                                width: 'px-3 lg:px6',
                                height: 'py-2 lg:py-3'
                            }}/>
                        </div>
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