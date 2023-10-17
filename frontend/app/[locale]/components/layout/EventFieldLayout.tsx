'use client'

import { IEventFieldLayout, IEventLogLayout } from "@/interfaces/layout"
import { useState } from "react"

const EventFieldLayout = ({ params }: {params: IEventFieldLayout }) => {

    return (
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-t border-gray-900/20">
            <dt className="text-sm font-medium leading-6 text-gray-900">
                {params.title}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {params?.value}
            </dd>
        </div>
    )
}

const EventLogLayout = ({ params }: { params: IEventLogLayout }) => {
    const [toggleLog, setToggleLog] = useState(false)

    return (
        <div className={`${!params.events ? 'hidden' : ''} rounded backdrop-blur-sm shadow-2xl 
            bg-gradient-to-b from-gray-200/20 
            px-6 py-2 md:w-1/2 md:mx-auto w-full mt-2`}>

            <div className="flex flex-row items-center cursor-pointer"
                onClick={() => setToggleLog((prevToggle) => !prevToggle)}>
                <h3 className=" text-base font-semibold leading-7 text-gray-900">
                    {params.title}
                
                </h3>
                {toggleLog ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-6 h-6 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                )}
                
            </div>

            <div className={`${!toggleLog ? 'hidden' : ''} pt-4`}>
                <h1 className="py-4 -border-t border-gray-900/20 font-bold">
                    {params.events?.blockTitle}
                </h1>
                {params.events?.blockData?.map((e: IEventFieldLayout, index) =>
                    <div key={index}>
                        <dl className="divide-y divide-gray-900/20">
                            <EventFieldLayout params={{
                                title: e.title,
                                value: e.value
                            }}/>
                        </dl>
                    </div>
                )}

                <h1 className="py-4 -border-t border-gray-900/20 font-bold">
                    {params.events?.title}
                </h1>
                {params.events?.data?.map((e: IEventFieldLayout, index) =>
                    <div key={index}>                    
                        <dl className="divide-y divide-gray-900/20">
                            <EventFieldLayout params={{
                                title: e.title,
                                value: e.value
                            }}/>
                        </dl>
                    </div>
                )}
            </div>
        </div>
    )
}


export { EventLogLayout }


