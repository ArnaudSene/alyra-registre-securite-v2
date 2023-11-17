"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { Log } from "viem"

interface IRegisterSecurityEventProps {
    verificationTaskCreatedEventLogs: Log[]
    setVerificationTaskCreatedEventLogs: (eventLogs: Log[]) => void
}

const RegisterSecurityEventContext = createContext<IRegisterSecurityEventProps>({
    verificationTaskCreatedEventLogs: [],
    setVerificationTaskCreatedEventLogs: () => [],
})

export const RegisterSecurityEventContextProvider = ({ children }: { children: ReactNode }) => {
    const [verificationTaskCreatedEventLogs, setVerificationTaskCreatedEventLogs] = useState<Log[]>([])

    return (

        <RegisterSecurityEventContext.Provider value={{
            verificationTaskCreatedEventLogs: verificationTaskCreatedEventLogs,
            setVerificationTaskCreatedEventLogs: setVerificationTaskCreatedEventLogs
        }}>
            {children}
        </RegisterSecurityEventContext.Provider>
    )
}

export const useRegisterSecurityEventContext = () => useContext(RegisterSecurityEventContext)
