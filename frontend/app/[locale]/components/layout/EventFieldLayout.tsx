'use client'

import React, { useEffect, useState } from "react"
import { IEventFieldLayout, IEventLogLayout } from "@/interfaces/layout"

const EventFieldLayout = ({ props }: {props: IEventFieldLayout }) => {

    return (
        <div className="flex flex-col md:flex-row mb-2 md:mb-0.5 text-left">
            <dt className="flex-none w-full md:w-40 text-xs font-semibold text-gray-900">
                {props.title}
            </dt>
            <dd className="break-all w-full text-xs text-gray-700">
                {props?.value}
            </dd>
        </div>
    )
}

const EventLogLayoutMin2 = ({ props }: { props: IEventLogLayout }) => {
    const [toggleLog, setToggleLog] = useState(false)
    const [isFlashing, setIsFlashing] = useState(false)

    useEffect(() => {
        setIsFlashing(true)
    
        const timeoutId = setTimeout(() => {
          setIsFlashing(false)
        }, 5000)
    
        return () => clearTimeout(timeoutId)
      }, [props.events])

    return (
        <div className={`${!props.events ? 'hidden' : ''}`}>
            <div className={`flex flex-row items-center cursor-pointer `}
                onClick={() => setToggleLog((prevToggle) => !prevToggle)}>
                
                <h3 className={`text-base font-semibold text-gray-900 ${isFlashing ? 'text-rose-500 animate-pulse': '' }`}>
                    {props.events?.blockTitle}
                </h3>

                {toggleLog ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-5 h-5 ml-1 pt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className="w-5 h-5 ml-1 pt-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                )}
                
            </div>

            <div className={`${!toggleLog ? 'hidden' : ''}`}>
                <div className={`flex flex-col border-b border-gray-900/10 py-1`}>
                    {props.events?.blockData?.map((e: IEventFieldLayout, index) =>
                        <div key={index}>
                            <EventFieldLayout props={{
                                title: e.title,
                                value: e.value
                            }}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const EventLogLayoutMin = ({ params }: { params: IEventLogLayout }) => {
    const [toggleLog, setToggleLog] = useState(false)

    return (
        <div className={`${!params.events ? 'hidden' : ''} `}>

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
                <h1 className="py-4 font-bold">
                    {params.events?.blockTitle}
                </h1>
                {params.events?.blockData?.map((e: IEventFieldLayout, index) =>
                    <div key={index}>
                        <dl className="">
                            <EventFieldLayout props={{
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

const EventLogLayout = ({ props }: { props: IEventLogLayout }) => {
    const [toggleLog, setToggleLog] = useState(false)

    return (
        <div className={`${!props.events ? 'hidden' : ''} rounded backdrop-blur-sm shadow-2xl 
            bg-gradient-to-b from-gray-200/20 
            px-6 py-2 md:w-1/2 md:mx-auto w-full mt-2`}>

            <div className="flex flex-row items-center cursor-pointer"
                onClick={() => setToggleLog((prevToggle) => !prevToggle)}>
                <h3 className=" text-base font-semibold leading-7 text-gray-900">
                    {props.title}
                
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
                    {props.events?.blockTitle}
                </h1>
                {props.events?.blockData?.map((e: IEventFieldLayout, index) =>
                    <div key={index}>
                        <dl className="divide-y divide-gray-900/20">
                            <EventFieldLayout props={{
                                title: e.title,
                                value: e.value
                            }}/>
                        </dl>
                    </div>
                )}

                <h1 className="py-4 -border-t border-gray-900/20 font-bold">
                    {props.events?.title}
                </h1>
                {props.events?.data?.map((e: IEventFieldLayout, index) =>
                    <div key={index}>                    
                        <dl className="divide-y divide-gray-900/20">
                            <EventFieldLayout props={{
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


export { EventLogLayout, EventLogLayoutMin, EventLogLayoutMin2 }


