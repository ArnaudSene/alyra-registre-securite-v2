'use client'

import React, { useEffect, useState } from "react"
import { useDisclosure } from "@chakra-ui/hooks"
import { Button } from "@chakra-ui/button"
import { Collapse } from "@chakra-ui/react"
import { Log } from "viem"
import { useContractEvent } from "wagmi"
import { abi, contractAddress } from "@/constants"


const Event = ({ name }: { name: string }) => {
    const [logs, setLogs] = useState<Log[]>([])
    const { isOpen, onToggle } = useDisclosure()
    const [loading, setLoading] = useState(true)

    useContractEvent({
        address: contractAddress,
        abi: abi,
        eventName: name,
        listener(log) {
            setLogs(log)
        },
    })

    useEffect(() => {
        setLoading(true)
        if (logs) setLoading(false)
    }, [logs])

    return (logs && logs.length > 0 &&
        <div className="flex flex-col mx-auto w-3/4 p-4 text-sm rounded h-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-gray-900 shadow-lg drop-shadow-lg border-indigo-600 border">
            <Button className='mx-auto' isLoading={loading} onClick={onToggle} >Show {name} Log</Button>
            <Collapse in={isOpen} animateOpacity>
                <div className="p-4 font-bold text-center text-lg">Last {name} log</div>

                <ul>
                    <li className="pb-1">
                        <span className="font-semibold">Address:</span> {logs[0].address}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">BlockHash:</span> {logs[0].blockHash}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">BlockNumber:</span> {logs[0].blockNumber?.toString()}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">Data:</span> {logs[0].data}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">Log Index</span>: {logs[0].logIndex}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">Removed:</span> {logs[0].removed ? 'Yes' : 'No'}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">Topics:</span> {logs[0].topics}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">Transaction Hash:</span> {logs[0].transactionHash}
                    </li>
                    <li className="pb-1">
                        <span className="font-semibold">Transaction Index:</span> {logs[0].transactionIndex}
                    </li>
                </ul>
            </Collapse>
        </div>
    )
}
export default Event