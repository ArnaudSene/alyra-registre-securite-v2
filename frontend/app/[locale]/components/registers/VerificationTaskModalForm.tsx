'use client'

import React, { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"
import {
    ICreateVerificationTaskForm,
    IGeneral,
    ILayoutButton,
    ILayoutEventLog,
    IToasterMessages
} from "@/interfaces/intl"
import { IEventLog, ILayoutEventLogMapping, IhandleEventsResponse } from "@/interfaces/layout"
import { IRegisterCreated } from "@/interfaces/registers"
import { IVerificationTaskModalForm, IVerificationTaskGrid } from "@/interfaces/verificationTasks"
import { SubmitButtonLayout2 } from "../layout/ButtonLink"
import { EventLogLayoutMin2 } from "../layout/EventFieldLayout"
import { FormLayout } from "../layout/formLayout"
import { FormInputLayout2, FormSelectLayout } from "../layout/FormInputLayout"
import { writeContractByFunctionName } from "@/utils"
import {
    createVerificationTaskFormIntl, generalIntl,
    layoutButtonIntl,
    layoutEventLogIntl,
    toasterMessages,
    verificationTaskGridIntl
} from "@/utils/intl"
import { handleEvents } from "@/utils/events"
import { SubscribeEvent } from "@/app/[locale]/components/base/SubscribeEvent"


export const VerificationTaskModalForm = ({ props }: { props: IVerificationTaskModalForm } ) => {
    // contexts
    const { address } = useAccount()
    const { setReloadPage, subscribeEventLogs, setSubscribeEventLogs } = useRegisterSecurityEventContext()

    // states
    const [loading, setLoading] = useState(false)
    const [sitesSelect, setSitesSelect] = useState<IValueLabelId[]>([])
    const [sectorsSelect, setSectorsSelect] = useState<IValueLabelId[]>([])
    const [siteSelected, setSiteSelected] = useState("")
    const [sectorSelected, setSectorSelected] = useState("")
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const [eventName, setEventName] = useState("VerificationTaskCreated")
    const [eventWaiting, setEventWaiting] = useState(false)


    // Utils
    const toast = useToast()
    const createVerificationTaskForm: ICreateVerificationTaskForm = createVerificationTaskFormIntl()
    const general: IGeneral = generalIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()
    const verificationTaskGrid: IVerificationTaskGrid = verificationTaskGridIntl()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const toastMessage: IToasterMessages = toasterMessages()

    // Constants
    const layoutEventLogMapping: ILayoutEventLogMapping = {
        addressAttribute: '_company',
        addressValue: address as `0x${string}`,
    }
    const componentName: string = "VerificationTaskModalForm"


    /**
     *
     */
    const getSites = async () => {
        let formSelectData: IValueLabelId[] = []

        props.verificationTaskModalForm.map((d: IRegisterCreated, index: number) => {
            formSelectData.push({
                id: index.toString(),
                value: d.siteName,
                label: d.siteName
            } as IValueLabelId)
        })
        
        setSitesSelect(formSelectData)
    }

    /**
     *
     */
    const getSectors = async () => {
        let formSelectData: IValueLabelId[] = []

        verificationTaskGrid.sectors.map((sector: string, index: number) => {
            formSelectData.push({
                id: index.toString(),
                value: index.toString(),
                label: sector
            } as IValueLabelId)
        })
        
        setSectorsSelect(formSelectData)
    }

    /**
     *
     */
    interface FormDataLayout {
        site: string
        verificationType: string
        sector: string
    }

    /**
     *
     */
    const [formData, setFormData] = useState<FormDataLayout>({
        site: "",
        verificationType: "",
        sector: "",
    })

    /**
     *
     * @param e
     */
    const handleSubmit = (e: React.FormEvent) => {
        const actionName: string = 'createVerificationTask'
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
                    title: toastMessage.createVerificationTaskErrorTitle,
                    description: toastMessage.createVerificationTaskErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    /**
     *
     * @param e
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === 'site') setSiteSelected(e.target.value) 
        if (e.target.name === 'sector') setSectorSelected(e.target.value) 

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        getSites().then()
        getSectors().then()
    }, [])

    useEffect(() => {
        if ( subscribeEventLogs.id === componentName && subscribeEventLogs.eventLog.length > 0 ) {
            const handleEventsResponse: IhandleEventsResponse = handleEvents(
                layoutEventLog, subscribeEventLogs.eventLog, layoutEventLogMapping)

            if (handleEventsResponse.ok) {
                setEventLog(handleEventsResponse.eventLog)
                toast({
                    title: toastMessage.createVerificationTaskOkTitle,
                    description: toastMessage.createVerificationTaskOkDescription,
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
        <>
            {eventWaiting && <SubscribeEvent props={{taskId: componentName, eventName: eventName}} />}
            {props.isModalOpen && 
                <div className="pt-0 z-10">
                    <FormLayout props={{
                        title: createVerificationTaskForm.title,
                        onModalClose: props.closeModal, 
                        onSubmit: handleSubmit
                    }}>
                        <div className="my-2">
                            <EventLogLayoutMin2 props={{
                                title: layoutEventLog.linkTitle,
                                description: "",
                                events: eventLog
                            }}/>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-6">
                            <FormSelectLayout props={{
                                id: "site",
                                label: createVerificationTaskForm.selectSite,
                                defaultSelected: {id: "-1", value: "-1", label: createVerificationTaskForm.selectSite},
                                selected: {id: siteSelected, value: siteSelected, label: siteSelected},
                                data: sitesSelect,
                                onChange: handleChange
                            }}/>

                            <FormSelectLayout props={{
                                id: "sector",
                                label: createVerificationTaskForm.selectSector,
                                defaultSelected: {id: "-1", value: "-1", label: createVerificationTaskForm.selectSector},
                                selected: {id: sectorSelected, value: sectorSelected, label: sectorSelected},
                                data: sectorsSelect,
                                onChange: handleChange,
                            }}/>

                            <FormInputLayout2 props={{
                                id: "verificationType",
                                label: createVerificationTaskForm.selectVerificationType,
                                placeholder: createVerificationTaskForm.selectVerificationType,
                                autoComplete: "typeVerification",
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