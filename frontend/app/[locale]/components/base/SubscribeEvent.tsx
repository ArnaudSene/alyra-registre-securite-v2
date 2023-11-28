'use client'

import React, { useEffect } from 'react'
import { useContractEvent } from "wagmi"
import { abi, contractAddress } from "@/constants"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"

export const SubscribeEvent = ( {props}: { props: ISubscribeEvent }  ) => {
    const {subscribeEventLogs, setSubscribeEventLogs} = useRegisterSecurityEventContext()

    /**
     * Hook for subscribing to Contract events.
     * Wagmi url: https://wagmi.sh/react/hooks/useContractEvent
     */
    const unwatch = useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: props.eventName,
        listener(log) {
            setSubscribeEventLogs({id: props.taskId, eventLog: log})
        }
    })

    useEffect(() => {
        console.log('subscribeEventLogs', subscribeEventLogs)
        return () => {
            unwatch?.()
        }
    }, [subscribeEventLogs]);

    return (
        <>
            {/*<p>This is the event subscription</p>*/}
        </>
    )
}