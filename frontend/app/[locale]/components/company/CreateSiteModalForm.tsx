"use client"

import React, { useEffect, useState } from "react"
import { SubscribeEvent } from "@/app/[locale]/components/base/SubscribeEvent"
import { FormLayout } from "@/app/[locale]/components/layout/formLayout"
import { EventLogLayoutMin2 } from "@/app/[locale]/components/layout/EventFieldLayout"
import {
    FormInputLayout2,
} from "@/app/[locale]/components/layout/FormInputLayout"
import { SubmitButtonLayout2 } from "@/app/[locale]/components/layout/ButtonLink"
import { useAccount } from "wagmi"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"
import {
    IEventLog,
    IhandleEventsResponse,
    ILayoutEventLogMapping
} from "@/interfaces/layout"
import { useToast } from "@chakra-ui/react"
import {
    IGeneral,
    ILayoutButton,
    ILayoutEventLog, IToasterMessages
} from "@/interfaces/intl"
import {
    generalIntl,
    layoutButtonIntl, layoutEventLogIntl, toasterMessages
} from "@/utils/intl"
import { createSiteFormIntl, ICreateSiteForm } from "@/utils/siteIntl"
import { writeContractByFunctionName } from "@/utils"
import { ICreateSiteModalForm } from "@/interfaces/registers"
import { handleEvents } from "@/utils/events"
import { useGlobalContext } from "@/contexts/Global"
import { useIdentityContext } from "@/contexts/Identity"

const CreateSiteModalForm = ({ props }: { props: ICreateSiteModalForm }) => {
    const componentName: string = "CreateSiteModalForm"

    // contexts
    const { address } = useAccount()
    const { subscribeEventLogs, setSubscribeEventLogs } = useRegisterSecurityEventContext()
    const { setReloadPage } = useGlobalContext()
    const { company } = useIdentityContext()
    // states
    const [loading, setLoading] = useState(false)
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const [eventName, setEventName] = useState("RegisterCreated")
    const [eventWaiting, setEventWaiting] = useState(false)

    // Utils
    const toast = useToast()
    const createSiteForm: ICreateSiteForm = createSiteFormIntl()
    const general: IGeneral = generalIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const toastMessage: IToasterMessages = toasterMessages()

    // Constants
    const layoutEventLogMapping: ILayoutEventLogMapping = {
        addressAttribute: '_addr',
        addressValue: address as `0x${string}`,
    }


    /**
     *
     */
    interface FormDataLayout {
        name: string
        addressName: string
        siret: string
        siteName: string
        siteAddressName: string
    }

    /**
     *
     */
    const [formData, setFormData] = useState<FormDataLayout>({
        name: company.name,
        addressName: company.name,
        siret: company.siret,
        siteName: "",
        siteAddressName: "",
    })

    /**
     *
     * @param e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    /**
     *
     * @param e
     */
    const handleSubmit = (e: React.FormEvent) => {
        const actionName: string = 'createRegister'

        e.preventDefault()
        let result: string[] = []
        Object.entries(formData).map(([key, value]) => result.push(value))

        writeContractByFunctionName(actionName, ...result)
            .then(() => {
                setLoading(true)
                setEventWaiting(true)
            })
            .catch(err => {
                console.log(`writeContractByFunctionName(${actionName}) error => ` + err)
                toast({
                    title: toastMessage.addNewSiteToCompanyErrorTitle,
                    description: toastMessage.addNewSiteToCompanyErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    useEffect(() => {
        if ( subscribeEventLogs.id === componentName && subscribeEventLogs.eventLog.length > 0 ) {
            const handleEventsResponse: IhandleEventsResponse = handleEvents(
                layoutEventLog, subscribeEventLogs.eventLog, layoutEventLogMapping)

            if (handleEventsResponse.ok) {
                setEventLog(handleEventsResponse.eventLog)
                toast({
                    title: toastMessage.addNewSiteToCompanyOkTitle,
                    description: toastMessage.addNewSiteToCompanyOkDescription,
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

    console.log('company', JSON.stringify(company))

    return (
        <>
            {eventWaiting && <SubscribeEvent props={{taskId: componentName, eventName: eventName}} />}

            {props.isModalOpen &&
                <div className="pt-0 z-10">
                    <FormLayout props={{
                        title: createSiteForm.title,
                        onModalClose: props.closeModal,
                        onSubmit: handleSubmit
                    }}>
                        {/*Event log*/}
                        <div className="my-2">
                            <EventLogLayoutMin2 props={{
                                title: layoutEventLog.linkTitle,
                                description: "",
                                events: eventLog
                            }}/>
                        </div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-6">
                            {/*Site name*/}
                            <FormInputLayout2 props={{
                                id: "siteName",
                                label: createSiteForm.siteName,
                                placeholder: createSiteForm.siteName,
                                autoComplete: "siteName",
                                onChange: handleChange,
                            }}/>
                            {/*Site address*/}
                            <FormInputLayout2 props={{
                                id: "siteAddressName",
                                label: createSiteForm.siteAddressName,
                                placeholder: createSiteForm.siteAddressName,
                                autoComplete: "siteAddressName",
                                onChange: handleChange,
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
                    </FormLayout>
                </div>
            }
        </>
    )
}

export default CreateSiteModalForm