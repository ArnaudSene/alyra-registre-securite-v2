'use client'

import { IFilterByCheckbox } from "@/interfaces/verificationTasks";
import React, { useEffect, useState } from "react";
import { IVerificationTaskFilters } from "@/interfaces/intl";
import { verificationTaskFiltersIntl } from "@/utils/intl";

export const FilterByCheckbox = ({props}: { props: IFilterByCheckbox }) => {
    const [toggleLog, setToggleLog] = useState(false)
    const [isSmallScreen, setIsSmallScreen] = useState(false)
    const verificationTaskFilters: IVerificationTaskFilters = verificationTaskFiltersIntl()
    /**
     * Handle screen size.
     */
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 1024)
    }

    useEffect(() => {

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    return (
        <div className="flex flex-col text-sm">
            <div className={`${isSmallScreen ? 'flex justify-end' : 'hidden'}`}
                 onClick={() => setToggleLog((prevToggle) => !prevToggle)}>

                {verificationTaskFilters.title}

                {toggleLog ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor"
                         className="w-4 h-5 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>
                    </svg>

                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor"
                         className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                    </svg>
                )}
            </div>

            <div className={`${!toggleLog && isSmallScreen ? 'hidden' : ''} pt-0`}>
                <div className="flex flex-col lg:flex-row text-xs lg:text-center lg:justify-center">

                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={props.handleCheckboxChange} checked={props.checkboxes.taskStatus2.status}
                               type="checkbox" id="taskStatus2" name="taskStatus2" value="taskStatus2"/>
                        <label htmlFor="taskStatus2">
                            <span className="ml-2 align-middle bg-green-400 rounded-xl border border-gray-900/10 p-1 cursor-pointer">
                                {verificationTaskFilters.approved}
                            </span>
                        </label>
                    </div>

                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={props.handleCheckboxChange} checked={props.checkboxes.taskStatus0.status}
                               type="checkbox" id="taskStatus0" name="taskStatus0" value="taskStatus0"/>
                        <label htmlFor="taskStatus0">
                            <span className="ml-2 align-middle bg-cyan-400 rounded-xl border border-gray-900/10 p-1 cursor-pointer">
                                {verificationTaskFilters.pendingApproval}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={props.handleCheckboxChange} checked={props.checkboxes.taskStatus3.status}
                               type="checkbox" id="taskStatus3" name="taskStatus3" value="taskStatus3"/>
                        <label htmlFor="taskStatus3">
                            <span className="ml-2 align-middle bg-rose-400 rounded-xl border border-gray-900/10 p-1 cursor-pointer">
                                {verificationTaskFilters.rejected}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={props.handleCheckboxChange} checked={props.checkboxes.taskStatus1.status}
                               type="checkbox" id="taskStatus1" name="taskStatus1" value="taskStatus1"/>
                        <label htmlFor="taskStatus1">
                            <span className="ml-2 align-middle bg-purple-400 rounded-xl border border-gray-900/10 p-1 cursor-pointer">
                                {verificationTaskFilters.validated}
                            </span>
                        </label>
                    </div>
                    <div className="lg:mr-2 my-1 lg:basis-auto">
                        <input onChange={props.handleCheckboxChange} checked={props.checkboxes.taskStatus4.status}
                               type="checkbox" id="taskStatus4" name="taskStatus4" value="taskStatus4"/>
                        <label htmlFor="taskStatus4">
                            <span className="ml-2 align-middle bg-amber-400 rounded-xl border border-gray-900/10 p-1 cursor-pointer">
                                {verificationTaskFilters.conditionallyApproved}
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}