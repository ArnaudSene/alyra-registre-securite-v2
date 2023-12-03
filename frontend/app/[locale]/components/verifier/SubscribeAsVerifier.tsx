"use client"
import React, { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"
import { useGlobalContext } from "@/contexts/Global"
import {
    IEventLog,
    IhandleEventsResponse,
    ILayoutEventLogMapping
} from "@/interfaces/layout"
import {
    IFormSubscriptionVerifier,
    IGeneral,
    ILayoutButton,
    ILayoutEventLog, IProfileAccount,
    IToasterMessages
} from "@/interfaces/intl"
import {
    formSubscriptionVerifierIntl,
    generalIntl, getProfileAccount, layoutButtonIntl,
    layoutEventLogIntl,
    toasterMessages
} from "@/utils/intl"
import { writeContractByFunctionName } from "@/utils"
import { handleEvents } from "@/utils/events"
import { SubscribeEvent } from "@/app/[locale]/components/base/SubscribeEvent"
import { FormLayout } from "@/app/[locale]/components/layout/formModalLayout"
import { EventLogLayoutMin2 } from "@/app/[locale]/components/layout/EventFieldLayout"
import { FormInputLayout2 } from "@/app/[locale]/components/layout/FormInputLayout"
import { SubmitButtonLayout2 } from "@/app/[locale]/components/layout/ButtonLink"

export const SubscribeAsVerifier = () => {
    // Contexts
    const { isConnected, address } = useAccount()
    const { subscribeEventLogs, setSubscribeEventLogs } = useRegisterSecurityEventContext()
    const { setReloadPage } = useGlobalContext()

    // states
    const [loading, setLoading] = useState(false)
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const [eventWaiting, setEventWaiting] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [blockQuoteLevel, setBlockQuoteLevel] = useState("")
    const [blockQuoteMessage, setBlockQuoteMessage] = useState("")

    // Utils
    const toastMessage: IToasterMessages = toasterMessages()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const formSubscriptionVerifier: IFormSubscriptionVerifier = formSubscriptionVerifierIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()
    const general: IGeneral = generalIntl()

    // Constants
    const EVENT_NAME = 'VerifierCreated'
    const COMPONENT_NAME = "SubscribeAsVerifier"

    /**
     *
     */
    interface FormDataLayout {
        name: string
        addressName: string
        siret: string
        approvalNumber: string
    }

    /**
     *
     */
    const [formData, setFormData] = useState<FormDataLayout>({
        name: "",
        addressName: "",
        siret: "",
        approvalNumber: ""
    })

    /**
     *
     * @param e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    /**
     *
     * @param e
     */
    const handleSubmit = (e: React.FormEvent) => {
        const actionName: string = 'createVerifier'
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
                setBlockQuoteMessage(`${toastMessage.subscribeVerifierErrorDescription}`)
                setBlockQuoteLevel("error")
            })
    }

    useEffect(() => {
        const layoutEventLogMapping: ILayoutEventLogMapping = {
            addressAttribute: '_verifier',
            addressValue: address as `0x${string}`,
        }

        if ( subscribeEventLogs.id === COMPONENT_NAME && subscribeEventLogs.eventLog.length > 0 ) {
            const handleEventsResponse: IhandleEventsResponse = handleEvents(
                layoutEventLog, subscribeEventLogs.eventLog, layoutEventLogMapping)

            if (handleEventsResponse.ok) {
                setEventLog(handleEventsResponse.eventLog)
                setBlockQuoteMessage(`${toastMessage.subscribeVerifierOkDescription}`)
                setBlockQuoteLevel("success")
            }
            setEventWaiting(false)
            setLoading(false)
            setSubscribeEventLogs({id: COMPONENT_NAME, eventLog: []})
            setReloadPage(true)
        }
    }, [subscribeEventLogs])


    useEffect(() => {
        const handleSubscriptionAuthorisation = (profileAccount: IProfileAccount) => {
            setDisableButton(false)
            setBlockQuoteMessage("")
            setBlockQuoteLevel("")

            if (profileAccount.isCompany || profileAccount.isVerifier) {
                setDisableButton(true)
                setBlockQuoteMessage("Vous avez deja souscris")
                setBlockQuoteLevel("warning")
            }
        }

        if (isConnected && address) {
            const handleRestrictions = () => {
                getProfileAccount(address)
                    .then((profileAccount) => {
                        handleSubscriptionAuthorisation(profileAccount)
                    })
            }

            handleRestrictions()
        }
    }, [isConnected, address]);

    return (
        <>
            {eventWaiting && <SubscribeEvent props={{taskId: COMPONENT_NAME, eventName: EVENT_NAME}} />}

            <div className="pt-0 z-10">
                <FormLayout props={{
                    title: formSubscriptionVerifier.title,
                    description: formSubscriptionVerifier.description,
                    onSubmit: handleSubmit,
                    message: blockQuoteMessage,
                    messageLevel: blockQuoteLevel
                }}>
                    <div className="my-2">
                        <EventLogLayoutMin2 props={{
                            title: layoutEventLog.linkTitle,
                            description: "",
                            events: eventLog
                        }}/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-6 ">
                        <FormInputLayout2 props={{
                            id: "siret",
                            label: formSubscriptionVerifier.siret,
                            placeholder: formSubscriptionVerifier.siret,
                            autoComplete: "siret",
                            onChange: handleChange,
                        }}/>

                        <FormInputLayout2 props={{
                            id: "name",
                            label: formSubscriptionVerifier.name,
                            placeholder: formSubscriptionVerifier.name,
                            autoComplete: "name",
                            onChange: handleChange,
                        }}/>

                        <FormInputLayout2 props={{
                            id: "addressName",
                            label: formSubscriptionVerifier.address,
                            placeholder: formSubscriptionVerifier.address,
                            autoComplete: "addressName",
                            onChange: handleChange,
                        }}/>

                        <FormInputLayout2 props={{
                            id: "approvalNumber",
                            label: formSubscriptionVerifier.approval,
                            placeholder: formSubscriptionVerifier.approval,
                            autoComplete: "approvalNumber",
                            onChange: handleChange,
                        }}/>

                    </div>

                    <div className="mt-6 pt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
                        <SubmitButtonLayout2 props={{
                            loading: loading,
                            spinnerSize: 'sm',
                            buttonName: layoutButton.save,
                            loadingName: general.inProgress,
                            width: 'px-3 lg:px6 lg:w-[150px]',
                            height: 'py-2 lg:py-3',
                            disabled: disableButton
                        }}/>
                    </div>
                </FormLayout>
            </div>
            </>
    )
}