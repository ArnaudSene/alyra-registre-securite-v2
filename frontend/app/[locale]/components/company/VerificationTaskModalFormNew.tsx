'use client'

import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Log } from "viem"
import { useAccount } from "wagmi"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"
import { ICreateVerificationTaskForm, ILayoutButton, ILayoutEventLog, IToasterMessages } from "@/interfaces/intl"
import { IEventLog, IFormSelectData, ILayoutEventLogMapping, IhandleEventsResponse } from "@/interfaces/layout"
import { IRegisterCreated } from "@/interfaces/registers"
import { IVerificationTaskModalFormNew, IVerificationTaskGrid } from "@/interfaces/verificationTasks"
import { SubmitButtonLayout } from "../layout/ButtonLink"
import { EventLogLayoutMin2 } from "../layout/EventFieldLayout"
import { FormLayout } from "../layout/formLayout"
import { FormInputLayout2, FormSelectLayout } from "../layout/FormInputLayout"
import { writeContractByFunctionName } from "@/utils"
import { 
    createVerificationTaskFormIntl, 
    layoutButtonIntl, 
    layoutEventLogIntl, 
    toasterMessages, 
    verificationTaskGridIntl 
} from "@/utils/intl"


const handleEvents = (
    layoutEventLog: ILayoutEventLog,
    eventLogs: Iterable<Log>, 
    mapping: ILayoutEventLogMapping
): IhandleEventsResponse => {
    
    let handleEventsResponse: IhandleEventsResponse = {
        eventLog: undefined,
        ok: false
    }

    for (const log of eventLogs as Iterable<Log>) {
        // @ts-expect-error
        const logArgs: any = log.args

        if (logArgs[mapping.addressAttribute] === mapping.addressValue) {
            const eventLog: IEventLog  = {
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
                data: []
            }
            
            handleEventsResponse = {eventLog: eventLog, ok: true}
            return handleEventsResponse
        }
    }
    return handleEventsResponse
}

export const VerificationTaskModalFormNew = ({ props }: { props: IVerificationTaskModalFormNew } ) => {
    const toast = useToast()
    const { address } = useAccount()
    const { verificationTaskCreatedEventLogs } = useRegisterSecurityEventContext()
    const [loading, setLoading] = useState(false)
    const [sitesSelect, setSitesSelect] = useState<IFormSelectData[]>([])
    const [sectorsSelect, setSectorsSelect] = useState<IFormSelectData[]>([])
    const [siteSelected, setSiteSelected] = useState("")
    const [sectorSelected, setSectorSelected] = useState("")
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    // Internallization
    const createVerificationTaskForm: ICreateVerificationTaskForm = createVerificationTaskFormIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()
    const verificationTaskGrid: IVerificationTaskGrid = verificationTaskGridIntl()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const tostMessage: IToasterMessages = toasterMessages()
    const actionName = 'createVerificationTask'
    const mapping: ILayoutEventLogMapping = {
        addressAttribute: '_company',
        addressValue: address as `0x${string}`,
    }

    useEffect(() => {
        getSites()
        getSectors()
    }, [])

    // handle events
    useEffect(() => {
        if(loading) {
            const handleEventsResponse: IhandleEventsResponse = handleEvents(layoutEventLog, verificationTaskCreatedEventLogs, mapping)

            if (handleEventsResponse.ok) {
                setEventLog(handleEventsResponse.eventLog)
                toast({
                    title: tostMessage.createVerificationTaskOkTitle,
                    description: tostMessage.createVerificationTaskOkDescription,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            }
            setLoading(false)
        }
    }, [verificationTaskCreatedEventLogs])

    const getSites = async () => {
        let formSelectData: IFormSelectData[] = []

        props.verificationTaskModalForm.registersCreated.map((d: IRegisterCreated, index: number) => {
            formSelectData.push({
                id: index.toString(),
                value: d.siteName,
                label: d.siteName
            } as IFormSelectData)
        })
        
        setSitesSelect(formSelectData)
    }

    const getSectors = async () => {
        let formSelectData: IFormSelectData[] = []

        verificationTaskGrid.sectors.map((sector: string, index: number) => {
            formSelectData.push({
                id: index.toString(),
                value: index.toString(),
                label: sector
            } as IFormSelectData)
        })
        
        setSectorsSelect(formSelectData)
    }
    
    // Handle form
    interface FormDataLayout {
        site: string
        verificationType: string
        sector: string
    }

    const [formData, setFormData] = useState<FormDataLayout>({
        site: "",
        verificationType: "",
        sector: "",
    })
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        let result: string[] = []
        Object.entries(formData).map(([key, value]) => result.push(value))
        
        writeContractByFunctionName(actionName, ...result)
            .then(() => {setLoading(true)})
            .catch(err => {
                console.log(`writeContractByFunctionName(${actionName}) error => ` + err)
                toast({
                    title: tostMessage.createVerificationTaskErrorTitle,
                    description: tostMessage.createVerificationTaskErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === 'site') setSiteSelected(e.target.value) 
        if (e.target.name === 'sector') setSectorSelected(e.target.value) 

        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
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
                                defaultSelected: {value: "-1", label: createVerificationTaskForm.selectSite},
                                selected: {value: siteSelected, label: siteSelected},
                                data: sitesSelect,
                                onChange: handleChange
                            }}/>

                            <FormSelectLayout props={{
                                id: "sector",
                                label: createVerificationTaskForm.selectSector,
                                defaultSelected: {value: "-1", label: createVerificationTaskForm.selectSector},
                                selected: {value: sectorSelected, label: sectorSelected},
                                data: sectorsSelect,
                                onChange: handleChange
                            }}/>

                            <FormInputLayout2 props={{
                                id: "verificationType",
                                label: createVerificationTaskForm.selectVerificationType,
                                placeholder: createVerificationTaskForm.selectVerificationType,
                                autoComplete: "typeVerification",
                                onChange: handleChange
                            }}/>

                        </div>

                        <SubmitButtonLayout props={{
                            loading: loading,
                            spinnerSize: 'sm',
                            buttonName: layoutButton.save
                        }}/>
                    </FormLayout>   
                </div>
            }            
        </>
    )
}