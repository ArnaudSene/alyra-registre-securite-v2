"use client"

import { IButtonLink, ISubmitButtonLayout } from "@/interfaces/layout"
import Link from "next/link"
import { Spinner } from "@chakra-ui/react"

const SubmitButtonLayout = ({ params }: {params: ISubmitButtonLayout }) => {
    
    return (
        <div className="mt-6 pt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
            <button
                type="submit" aria-disabled={params.loading} disabled={params.loading}
                className="rounded p-2.5 md:w-[150px] w-full
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
                    bg-gradient-to-br from-indigo-700 to-indigo-500
                    text-slate-100 text-center font-bold">
                    {params.loading ? (<Spinner size={params.spinnerSize} />) : (params.buttonName)}
            </button>
        </div>
    )
}

const ButtonLink = ({ params }: {params: IButtonLink }) => {
    
    return (
        <Link href={params.href}
            className="rounded p-2.5 lg:w-auto w-full mx-2
                cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
                bg-gradient-to-br from-indigo-700 to-indigo-500
                text-slate-100 text-center font-bold">
            {params.title}
        </Link>
    )
}

export { SubmitButtonLayout, ButtonLink }


