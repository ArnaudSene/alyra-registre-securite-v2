'use client'

import { SubmitButtonLayout2 } from "@/app/[locale]/components/layout/ButtonLink"
import React, { useState } from "react"

const Text3 = () => {
    const [loading, setLoading] = useState(false)
    const [exemple, setExemple] = useState("company")
    const [choice, setChoice] = useState("company")
    interface Mapping {
        [key: string]: string;
    }
    const _mapping: Mapping = {
        company: "_company",
        verifier: "_verifier"
    }

    const handleOnClick = () => {
        setLoading(!loading)
        if (choice === "company") setChoice("verifier")
        else setChoice("company")

        if ( choice && choice in _mapping ) {
            setExemple(_mapping[choice])
        }
        console.log('loading', loading)
    }

    return (
        <>
            <div className={`flex justify-evenly w-[550px] bg-neutral-50/20`}>
                <SubmitButtonLayout2 props={{
                    onClick: handleOnClick,
                    loading: false,
                    // spinnerSize: 'xs',
                    buttonName: 'click',
                    width: 'px-6'
                }}/>

                <SubmitButtonLayout2 props={{
                    loading: loading,
                    spinnerSize: 'xs',
                    buttonName: 'my button',
                    loadingName: 'processing',
                    height: 'py-3',
                    width: 'px-6'
                }}/>
                <br />

                <div className="">Exemple: {choice} - {exemple}</div>

            </div>
            <br />
            <div className={`text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1 w-[150px]`}>
                <div className={`flex lg:items-center lg:justify-center h-full`}>
                    <div id={`taskUpdateInProgress-0`}
                        className={`bg-gradient-to-br from-indigo-700 to-indigo-500
                            text-slate-100 text-center
                            lg:p0 lg:w-full rounded-xl border border-gray-900/10 p-1`}>
                        <div className="flex justify-center items-center">
                            <svg className="animate-spin h-5 w-5 text-slate-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.735V24c4.418 0 8-3.582 8-8h-4a4.01 4.01 0 01-4 4.135z"></path>
                            </svg>
                            <div className={`ml-3`}>in progress</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Text3