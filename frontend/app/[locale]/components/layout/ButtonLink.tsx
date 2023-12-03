"use client"

import React from "react"
import { Spinner } from "@chakra-ui/react"
import Link from "next/link"
import { IButtonLink, ISubmitButtonLayout } from "@/interfaces/layout"

const SubmitButtonLayout2 = ({ props }: { props: ISubmitButtonLayout }) => {
    
    return (
        <button
            type="submit" 
            onClick={props.onClick}
            aria-disabled={props.loading} 
            disabled={props.disabled || props.loading}
            className={`
                ${props.rounded? `${props.rounded}`: 'rounded'}
                ${props.height? `${props.height} h-auto`: 'py-1.5 h-auto'}
                ${props.width? `${props.width} lg:w-auto w-full`: 'px-1.5 lg:w-auto w-full'}
                transition ease-in-out delay-100 duration-100 hover:scale-105
                bg-gradient-to-br from-indigo-700 to-indigo-500
                text-slate-100 text-center font-bold ${props.disabled ? 'cursor-not-allowed': 'cursor-pointer'}`}>
            {props.loading ? (
                <div className={`flex`}>
                    <div><Spinner size={props.spinnerSize} /></div>
                    <p className={`ml-3`}>{props.loadingName}</p>
                </div>
            ): (
                <p>{props.buttonName}</p>
            )}
        </button>
    )
}


const SubmitButtonLayout = ({ props }: {props: ISubmitButtonLayout }) => {
    
    return (
        <div className="mt-6 pt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
            <button
                type="submit" aria-disabled={props.loading} disabled={props.loading}
                className="rounded p-2.5 md:w-[150px] w-full
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
                    bg-gradient-to-br from-indigo-700 to-indigo-500
                    text-slate-100 text-center font-bold">
                    {props.loading ? (<Spinner size={props.spinnerSize} />) : (props.buttonName)}
            </button>
        </div>
    )
}

const ButtonLink = ({ props }: {props: IButtonLink }) => {
    
    return (
        <Link href={props.href}
            className="rounded p-2.5 lg:w-auto w-full mx-2
                cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
                bg-gradient-to-br from-indigo-700 to-indigo-500
                text-slate-100 text-center font-bold">
            {props.title}
        </Link>
    )
}

export { SubmitButtonLayout, ButtonLink, SubmitButtonLayout2 }


