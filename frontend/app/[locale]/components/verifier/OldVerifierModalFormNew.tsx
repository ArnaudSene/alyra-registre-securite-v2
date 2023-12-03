'use client'

// @ts-expect-error experimental
import { experimental_useFormState as useFormState } from 'react-dom'
import React, { useEffect, useState } from "react"
import { useToast } from "@chakra-ui/react"
import { Log } from "viem"
import { useAccount, useContractEvent } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { IFormSubscriptionVerifier, ILayoutButton, ILayoutEventLog, IToasterMessages } from "@/interfaces/intl"
import { EventLogLayout } from "../layout/EventFieldLayout"
import { IEventLog } from "@/interfaces/layout"
import { SubmitButtonLayout } from "../layout/ButtonLink"
import { FormInputLayout } from "../layout/FormInputLayout"
import IsConnectedAs from "../IsConnectedAs"
import { writeContractByFunctionName } from "@/utils"
import { formSubscriptionVerifierIntl, layoutButtonIntl, layoutEventLogIntl, toasterMessages } from "@/utils/intl"

const initialState = {
    message: null,
}

const OldVerifierModalFormNew = () => {
    const { address } = useAccount()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [eventLogs, setEventLogs] = useState<Log[]>([])
    const [eventLog, setEventLog] = useState<IEventLog | undefined>()
    const tostMessage: IToasterMessages = toasterMessages()
    const layoutEventLog: ILayoutEventLog = layoutEventLogIntl()
    const formSubscriptionVerifier: IFormSubscriptionVerifier = formSubscriptionVerifierIntl()
    const eventName = 'VerifierCreated'
    const actionName = 'createVerifier'

    useEffect(() => {
        if(loading) {
            for (const log of eventLogs as Iterable<Log>) {
                // @ts-expect-error Experimental
                const logArgs: any = log.args

                if (logArgs._verifier === address) {
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
                                value: logArgs._verifier
                            },
                            {
                                title: formSubscriptionVerifier.name,
                                value: logArgs._name
                            },
                            {
                                title: formSubscriptionVerifier.address,
                                value: logArgs._addressName
                            },
                            {
                                title: formSubscriptionVerifier.siret,
                                value: logArgs._siret
                            },
                            {
                                title: formSubscriptionVerifier.approval,
                                value: logArgs._approvalNumber
                            }
                        ]
                    })
                    setLoading(false)
                    toast({
                        title: tostMessage.subscribeVerifierOkTitle,
                        description: tostMessage.subscribeVerifierOkDescription,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    break
                }
            }
        }
    }, [eventLogs])

    // Listener for blockchain events
    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: eventName,
        listener(logs) {
            setEventLogs(logs)
            console.log(logs)
        }
    })

    const submitCreateVerifier = async (prevState: any, formData: FormData) => {
        const indexIntl = (formData: FormData): string[] => {
            const mapping: {
                [key: string]: number
              } = {
                name: 0,
                address: 1,
                siret: 2,
                approval: 3
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
                    title: tostMessage.subscribeVerifierErrorTitle,
                    description: tostMessage.subscribeVerifierErrorDescription,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
    }
    const [formAction] = useFormState(submitCreateVerifier, initialState)
    const layoutButton: ILayoutButton = layoutButtonIntl()

    return (
        <IsConnectedAs>
            <form action={formAction}>
                <div className=" flex flex-col lg:mx-10 md:mx-20">
                    <div className="rounded backdrop-blur-sm shadow-2xl 
                        bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                        p-6 lg:w-1/2 md:w-full md:mx-auto w-full ">

                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            {formSubscriptionVerifier.title}
                        </h2>
                        <p className="my-2  text-sm leading-6 text-gray-600">
                            {formSubscriptionVerifier.description}
                        </p>

                        {/* Form inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-6 ">
                            <FormInputLayout props={{
                                id: "siret",
                                label: formSubscriptionVerifier.siret,
                                placeholder: formSubscriptionVerifier.siret,
                                autoComplete: "siret"
                            }}/>

                            <FormInputLayout props={{
                                id: "approval",
                                label: formSubscriptionVerifier.approval,
                                placeholder: formSubscriptionVerifier.approval,
                                autoComplete: "approval"
                            }}/>
                            
                            <FormInputLayout props={{
                                id: "name",
                                label: formSubscriptionVerifier.name,
                                placeholder: formSubscriptionVerifier.name,
                                autoComplete: "name"
                            }}/>

                            <FormInputLayout props={{
                                id: "address",
                                label: formSubscriptionVerifier.address,
                                placeholder: formSubscriptionVerifier.address,
                                autoComplete: "address"
                            }}/>

                        </div>

                        {/* Submit button */}
                        <SubmitButtonLayout props={{
                            loading: loading,
                            spinnerSize: 'sm',
                            buttonName: layoutButton.save
                        }}/>
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

export default OldVerifierModalFormNew