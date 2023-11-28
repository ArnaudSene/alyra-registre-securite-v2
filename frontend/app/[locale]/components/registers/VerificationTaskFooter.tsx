'use client'

import React, { useEffect, useState } from "react";
import { IVerificationTaskFooter } from "@/interfaces/verificationTasks";
import { FormSelectLayout } from "@/app/[locale]/components/layout/FormInputLayout";
import { IGeneral } from "@/interfaces/intl"
import { generalIntl } from "@/utils/intl"

export const VerificationTaskFooter = ({props}: { props: IVerificationTaskFooter }) => {
    const [disablePrevious, setDisablePrevious] = useState(false)
    const [disableNext, setDisableNext] = useState(false)

    const general: IGeneral = generalIntl()

    useEffect(() => {
        if (props.skip === 0)
            setDisablePrevious(true)

        if (props.eventSum < props.first)
            setDisableNext(true)

    }, [])

    const handleSelectPagination = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.handlePagination(Number(event.target.value), 0)
    }

    return (
        <>
            <div className={`flex flex-col lg:flex-row justify-between
                    bg-gray-900/30 border-b border-gray-200/10 
                    font-medium rounded-b
                    text-xs lg:text-sm text-center lg:text-center`}>

                {/* Left footer element */}
                <div className="w-full px-1 lg:basis-1/6"></div>

                {/* Middle footer element */}
                <div className={`flex lg:gap-4 justify-between lg:justify-center basis-4/6`}>
                    {/* Previous page */}
                    <button
                        onClick={() => props.handlePagination(props.first, props.skip - props.first)}
                        disabled={disablePrevious}
                        className={`${disablePrevious && 'cursor-not-allowed'} flex basis-20 py-3 mx-1 lg:mx-0 lg:h-auto justify-start lg:justify-end ${disablePrevious ? 'text-gray-500' : 'hover:text-indigo-800'} `}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                             className="w-4 h-4 lg:w-4 lg:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                        <span>{general.previous}</span>
                    </button>

                    {/* pages */}
                    <div className="flex w-fit py-2 mx-1 lg:mx-0 lg:h-auto justify-center">
                        <div className={`p-1 h-auto bg-neutral-100/20 rounded-md border border-gray-300`}>{props.skip} - {props.skip + props.eventSum}</div>
                    </div>

                    {/* Next page */}
                    <button
                        onClick={() => props.handlePagination(props.first, props.skip + props.first)}
                        disabled={disableNext}
                        className={`${disableNext && 'cursor-not-allowed'} flex basis-20 py-3 mx-1 lg:mx-0 lg:h-auto justify-end lg:justify-start ${disableNext ? 'text-gray-500' : 'hover:text-indigo-800'}`}>
                        <span>{general.next}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                             className="w-4 h-4 lg:w-4 lg:h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                    </button>
                </div>

                {/* Right footer element */}
                <div className="basis-1/6">
                    <div className="lg:py-1 lg:h-auto flex justify-center lg:justify-end lg:px-2">
                        <FormSelectLayout props={
                            {
                                id: "0",
                                label: "",
                                selected: {
                                    id: props.first.toString(),
                                    value: props.first.toString(),
                                    label: props.first.toString()
                                },
                                data: props.pagination,
                                onChange: handleSelectPagination,
                                inline: true
                            }}/>
                    </div>
                </div>
            </div>
        </>
    )
}