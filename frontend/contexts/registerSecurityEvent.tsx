"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { Log } from "viem"

interface ISubscribeEventLog {
    id: string
    eventLog: Log[]
}

interface IRegisterSecurityEventProps {
    verificationTaskCreatedEventLogs: Log[]
    setVerificationTaskCreatedEventLogs: (eventLogs: Log[]) => void

    verificationTaskUpdatedEventLogs: Log[]
    setVerificationTaskUpdatedEventLogs: (eventLogs: Log[]) => void

    subscribeEventLogs: ISubscribeEventLog
    setSubscribeEventLogs: (eventLogs: ISubscribeEventLog) => void

    reloadPage: boolean
    setReloadPage: (reloadPage: boolean) => void
}

const RegisterSecurityEventContext = createContext<IRegisterSecurityEventProps>({
    verificationTaskCreatedEventLogs: [],
    setVerificationTaskCreatedEventLogs: () => [],
    verificationTaskUpdatedEventLogs: [],
    setVerificationTaskUpdatedEventLogs: () => [],
    subscribeEventLogs: {id: "", eventLog: []},
    setSubscribeEventLogs: () => {},
    reloadPage: false,
    setReloadPage: () => false,
})

export const RegisterSecurityEventContextProvider = ({ children }: { children: ReactNode }) => {
    const [verificationTaskCreatedEventLogs, setVerificationTaskCreatedEventLogs] = useState<Log[]>([])
    const [verificationTaskUpdatedEventLogs, setVerificationTaskUpdatedEventLogs] = useState<Log[]>([])
    const [subscribeEventLogs, setSubscribeEventLogs] = useState<ISubscribeEventLog>({id: "", eventLog: []})
    const [reloadPage, setReloadPage] = useState(false)

    return (

        <RegisterSecurityEventContext.Provider value={{
            verificationTaskCreatedEventLogs: verificationTaskCreatedEventLogs,
            setVerificationTaskCreatedEventLogs: setVerificationTaskCreatedEventLogs,
            
            verificationTaskUpdatedEventLogs: verificationTaskUpdatedEventLogs,
            setVerificationTaskUpdatedEventLogs: setVerificationTaskUpdatedEventLogs,

            subscribeEventLogs: subscribeEventLogs,
            setSubscribeEventLogs: setSubscribeEventLogs,

            reloadPage: reloadPage,
            setReloadPage: setReloadPage,
        }}>
            {children}
        </RegisterSecurityEventContext.Provider>
    )
}

export const useRegisterSecurityEventContext = () => useContext(RegisterSecurityEventContext)
