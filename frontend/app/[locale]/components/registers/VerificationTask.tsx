'use client'

import React, { ChangeEvent, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { useRegisterSecurityEventContext } from "@/contexts/registerSecurityEvent"
import { IRegisters } from "@/interfaces/registers"
import {
    IHeaderAttributes,
    ITaskStatus,
    IVerificationTaskConsolidated,
    IVerificationTaskGrid,
 } from "@/interfaces/verificationTasks"
import {
    IGeneral,
    IVerificationTaskFilters
} from "@/interfaces/intl"
import {
    generalIntl,
    verificationTaskFiltersIntl,
    verificationTaskGridIntl
} from "@/utils/intl"
import { VerificationTaskModalForm } from "./VerificationTaskModalForm"
import { SubmitButtonLayout2 } from "../layout/ButtonLink"
import { convertTimestampToDate, getRegisterVerification, getVerificationTasksFromEvents } from "@/utils"
import { VerificationTaskGridMain } from "@/app/[locale]/components/registers/VerificationTaskGridMain"
import { FilterByCheckbox } from "@/app/[locale]/components/registers/FilterByCheckbox"
import { verificationTaskOrigin } from "@/utils/application"
import { PinataPinListResponse } from "@pinata/sdk"
import { getMetadataFromIPFS } from "@/utils/metadata"


const VerificationTask = () => {
    const DefaultPagination: number = 10
    const PaginationValues: IValueLabelId[] = [
        { id: "10", value: "10", label: "10" },
        { id: "50", value: "50", label: "50" },
        { id: "500", value: "500", label: "500" },
        { id: "1000", value: "1000", label: "1000" }
    ]
    const HeaderAttributes: IHeaderAttributes = {
        grid: { style: "lg:grid-cols-11" },
        rows: {
            "0": { style: "lg:w-10" },
            "1": { style: "lg:w-10" },
            "2": { style: "lg:-col-span-2" },
        }
    }

    // contexts
    const { address, isConnected } = useAccount()
    const { reloadPage, setReloadPage } = useRegisterSecurityEventContext()

    // states
    const [loading, setLoading] = useState(true)
    const [registers, setRegisters] = useState<IRegisters | undefined>()
    const [first, setFirst] = useState<number>(DefaultPagination)
    const [headerAttributes] = useState<IHeaderAttributes>(HeaderAttributes)
    const [skip, setSkip] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [checkboxes, setCheckboxes] = useState<{ [key: string]: ITaskStatus }>({
        taskStatus0: { status: false, id: "0" },
        taskStatus1: { status: false, id: "1" },
        taskStatus2: { status: false, id: "2" },
        taskStatus3: { status: false, id: "3" },
        taskStatus4: { status: false, id: "4" },
    })

    // utils
    // Internalization
    const gridIntl: IVerificationTaskGrid = verificationTaskGridIntl()
    const verificationTaskFilters: IVerificationTaskFilters = verificationTaskFiltersIntl()
    const general: IGeneral = generalIntl()

    /**
     * Get verification tasks from events (TheGraph
     */
    const getRegisters = () => {
        const id: `0x${string}` | undefined = address || undefined
        setLoading(true)

        getVerificationTasksFromEvents(first, skip, id)
            .then(register => { setRegisters(register) })
            .finally(() => { setLoading(false) })
    }

    const [metadata, setMetadata] = useState<PinataPinListResponse | undefined>()
    const getMetadata = (taskId: string = "") => {
        const fileName = `security-register-taskId-${taskId}`
        getMetadataFromIPFS(fileName)
            .then((response) => {
                console.log('data', response)
                setMetadata(response)
            })
    }

    /**
     * Get the task status name filter based on his index.
     * 
     * See @IVerificationTaskFilters interface for more detail.
     * @param {number} taskStatus The index of the task status filter.
     * @returns {string} The task status name filter.
     */
    const getTaskStatusName = (taskStatus: number): string => {
        return verificationTaskFilters.status[taskStatus]
    }

    /**
     * 
     * @param obj 
     * @param term 
     * @returns 
     */
    const searchInObject = (obj: IVerificationTaskConsolidated, term: string): boolean => {
        if (!term)
            return true

        for (const key in obj) {
            if (!obj[key as keyof IVerificationTaskConsolidated])
                continue

            let chain = ""
            let taskStatus = ""
            let registerId = ""
            let timeStamp = ""

            if (key === 'timeStamp') {
                timeStamp = convertTimestampToDate(Number(obj[key as keyof IVerificationTaskConsolidated])).toLocaleLowerCase()
            } else if (key === 'taskStatus') {
                taskStatus = getTaskStatusName(Number(obj[key as keyof IVerificationTaskConsolidated])).toLocaleLowerCase()
            } else if (key === 'registerId') {
                registerId = getRegisterVerification(Number(obj[key as keyof IVerificationTaskConsolidated])).toLocaleLowerCase()
            } else {
                chain = obj[key as keyof IVerificationTaskConsolidated].toString().toLowerCase()
            }

            if (chain.includes(term.toLowerCase()) ||
                taskStatus.includes(term.toLowerCase()) ||
                registerId.includes(term.toLowerCase()) ||
                timeStamp.includes(term.toLowerCase())) {
                return true
            }
        }
        return false
    }

    /**
     * 
     * @param {IVerificationTaskConsolidated} element 
     * @param {number} index 
     * @param {IVerificationTaskConsolidated[]} array 
     * @returns {IVerificationTaskConsolidated | void} 
     */
    const setFilters = (
        element: IVerificationTaskConsolidated,
        index: number,
        array: IVerificationTaskConsolidated[]
    ): IVerificationTaskConsolidated | void => {
        if (searchInObject(element, query)) return element
    }

    /**
     * Get 
     * @param obj 
     * @returns {boolean}
     */
    const searchChecked = (obj: IVerificationTaskConsolidated): boolean => {
        const key = "taskStatus".concat(obj.taskStatus.toString())
        return checkboxes[key].status
    }

    /**
     * Retrieve verification task from events and apply filters.
     * filters can be:
     *  - setFilters
     *  - searchChecked
     * 
     * @returns {IVerificationTaskConsolidated[]} The verification tasks.
     */
    const verificationTask = (): IVerificationTaskConsolidated[] => {
        const data: IVerificationTaskConsolidated[] = verificationTaskOrigin(registers, address)
        const filteredData: IVerificationTaskConsolidated[] = data.filter(setFilters)
        const checkedData: IVerificationTaskConsolidated[] = filteredData.filter(searchChecked)
        let dataOutput: IVerificationTaskConsolidated[]

        if ( checkedData.length === 0 ) { dataOutput = filteredData }
        else { dataOutput = checkedData }

        return dataOutput.filter(setFilters)
    }

    /**
     * Handle checkbox change and setCheckboxes state.
     * @param {ChangeEvent<HTMLInputElement>} event 
     * @returns {void}
     */
    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = event.target
        setCheckboxes({ ...checkboxes, [name]: { status: checked, id: name.charAt(name.length - 1) } })
    }

    /**
     * Open modal form.
     * @returns {void}
     */
    const openModal = (): void => {
        setIsModalOpen(true)
        setTimeout(() => {
            const modal = document.querySelector('#modal')
            modal?.classList.remove('opacity-0')
        }, 100)
    }

    /**
     * Close modal form.
     * @returns {void}
     */
    const closeModal = (): void => {
        const modal = document.querySelector('#modal')
        modal?.classList.add('opacity-0')
        setTimeout(() => setIsModalOpen(false), 300)
    }

    /**
     * Set pagination to retrieve events.
     * @param {number} first 
     * @param {number} skip 
     * @returns {void}
     * 
     * @example
     * const handlePagination = (10, 0)
     * console.log(first, ' : ', skip)
     */
    const handlePagination = (first: number, skip: number): void => {
        setFirst(first)
        setSkip(skip)
    }

    useEffect(() => {
        if ( reloadPage ) setReloadPage(false)
        else getRegisters()
    }, [isConnected, address, reloadPage, skip, first])

    return (
        <div className="flex flex-col lg:mx-20 pt-16 text-sm">
            {/* Modal form - create verification task */}
            {isModalOpen && (
                <VerificationTaskModalForm
                    props={{
                        isModalOpen: isModalOpen,
                        closeModal: closeModal,
                        verificationTaskModalForm: registers?.registerCreateds || []
                    }}
                />
            )}

            {/* Security register Table list */}
            <div className="rounded backdrop-blur-sm shadow-2xl
                bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                p-6 lg:mx-auto w-full">

                {/* Header 1 with title, searchBar and button */}
                <div className="flex lg:flex-row justify-between p-2 lg:p-0">
                    {/* title */}
                    <div className="text-sm lg:text-base text-left lg:w-1/6 p-1 bg-neutral-900/10 border border-gray-300/80 rounded-md">
                        <h1 className="text-gray-900">{gridIntl.pageTitle}</h1>
                        <div className={`mt-1`}>
                            <h2 className={`italic text-xs`}>
                                {general.profile}: {
                                registers?.accountProfile ? general.profilesObj[registers?.accountProfile] :general.profilesObj["guest"]}
                            </h2>
                        </div>
                    </div>

                    {/* Search bar LG */}
                    <div className="hidden lg:block text-sm lg:text-base text-center sm:mb-0.5 lg:w-4/6 lg:mx-2">
                        <input
                            className="rounded-lg bg-gray-900/20 border-hidden w-full"
                            placeholder={gridIntl.searchBar}
                            onChange={(event) => { setQuery(event.target.value.toLowerCase()) }}
                        />
                    </div>

                    {/* Create verification task - Only for company */}
                    <div>
                        {isConnected && registers?.accountProfile == "company" && !loading ? (
                            <SubmitButtonLayout2 props={{
                                loading: false,
                                buttonName: gridIntl.createVerificationButton,
                                width: 'px-3 lg:px-6',
                                height: 'py-2 lg:py-3',
                                onClick: openModal
                            }} />
                        ) : <div className="lg:px-20 lg:w-1/6"></div>}
                    </div>
                </div>


                {/* Search bar SM */}
                <div className="lg:hidden text-sm text-center grow mb-0.5">
                    <input
                        className="rounded-lg bg-gray-900/20 border-hidden w-full"
                        placeholder={gridIntl.searchBar}
                        onChange={(event) => { setQuery(event.target.value.toLowerCase()) }}
                    />
                </div>
                {/* Sub header with filters */}
                <FilterByCheckbox
                    props={{
                        checkboxes: checkboxes,
                        handleCheckboxChange: handleCheckboxChange
                    }} />

                {/* Grid */}
                <div className="flex flex-col lg:py-2">
                    <VerificationTaskGridMain
                        props={{
                            loading: loading,
                            tasks: verificationTask(),
                            fieldsGrid: gridIntl,
                            pagination: PaginationValues,
                            first: first,
                            skip: skip,
                            handlePagination: handlePagination,
                            headerAttributes: headerAttributes,
                            accountProfile: registers?.accountProfile,
                        }} />
                </div>
            </div>
        </div>
    )
}

export { VerificationTask }