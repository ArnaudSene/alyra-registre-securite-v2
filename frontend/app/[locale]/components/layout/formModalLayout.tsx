import React, { ReactNode, useEffect, useState } from "react"
import { useHeaderFooterContext } from "@/contexts/HeaderFooter"
import { IBlockQuote, IFormLayout } from "@/interfaces/layout"


const FormModalLayout = ({ children, props }: { children: ReactNode, props: IFormLayout}) => {
    const { setHeaderOn, setFooterOn } = useHeaderFooterContext()
    
    useEffect(() => {
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden'
        setHeaderOn(false)
        setFooterOn(false)
    
        // Cleanup when component is unmount
        return () => {
            document.body.style.overflow = 'visible'
            setHeaderOn(true)
            setFooterOn(true)
        }
    }, [])
    
    return (
        <>       
            <div className="absolute inset-0 h-screen w-full flex justify-center items-start md:items-center 
                backdrop-blur-sm bg-gray-900/20">

                <div id="modal"
                     className="flex flex-col fixed z-50 shadow-lg
                    bg-gradient-to-tr from-fuchsia-50 via-purple-300 to-cyan-300
                    p-6 left-1/2 -translate-x-1/2 w-full h-full
                    lg:w-3/4 xl:w-1/2 lg:rounded lg:h-fit
                    opacity-0 transition opacity transform duration-300">
                    
                    {/* header */}
                    <div className="h-7 py-1 text-justify">
                        <h2 className="absolute top-1 left-3 py-0.5 text-base font-semibold text-gray-900">
                            {props.title}
                        </h2>

                        <button className="absolute top-1 right-1 w-7 h-7 bg-fuchsia-500 text-slate-100 rounded"
                            onClick={props.onModalClose}
                        >X</button>
                    </div>

                    {props.message && props.messageLevel &&
                        <BlockQuote props={{
                            message: props.message || "",
                            level: props.messageLevel || ""
                        }} />
                    }
                    
                    {/* body */}
                    <form onSubmit={props.onSubmit}>
                        {children}
                    </form>

                </div>
            </div>
        </>
    )
}



const BlockQuote = ({props}: {props: IBlockQuote}) => {
    interface IStyle {
        style: string
        icon: React.JSX.Element
        iconStyle: string
    }

    const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-6 h-7"> <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /> </svg>

    const successIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-6 h-7"> <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /> </svg>


    const warningIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-6 h-7"> <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" /> </svg>


    const errorIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
        className="w-6 h-7"> <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" /></svg>

    const _LEVEL_STYLE: {[key: string]: IStyle} = {
        info: {
            style: "bg-blue-500/30 text-blue-950",
            icon: infoIcon,
            iconStyle: "bg-blue-500/70 text-blue-200"
        },
        success: {
            style: "bg-green-500/30 text-green-950",
            icon: successIcon,
            iconStyle: "bg-green-500/70 text-green-200"
        },
        warning: {
            style: "bg-amber-500/30 text-amber-950",
            icon: warningIcon,
            iconStyle: "bg-amber-500/70 text-amber-200"
        },
        error: {
            style: "bg-red-500/30 text-red-950",
            icon: errorIcon,
            iconStyle: "bg-red-500/70 text-red-200"
        },
    }
    const [style, setStyle] = useState(_LEVEL_STYLE[props.level].style)
    const [icon, setIcon] = useState(_LEVEL_STYLE[props.level].icon)
    const [iconStyle, setIconStyle] = useState(_LEVEL_STYLE[props.level].iconStyle)

    useEffect(() => {
        const updateBlockQuote = () => {
            setStyle(_LEVEL_STYLE[props.level].style)
            setIcon(_LEVEL_STYLE[props.level].icon)
            setIconStyle(_LEVEL_STYLE[props.level].iconStyle)
        }
        updateBlockQuote()
    }, [props]);

    return (
        <div className={`flex ${style} rounded-md`}>
            <div className={`${iconStyle} p-3 rounded-l-md w-auto items-center`}>{icon}</div>
            <div className={`p-4 text-sm`}>{props.message}</div>
        </div>
    )
}


const FormLayout = ({ children, props }: { children: ReactNode, props: IFormLayout}) => {
    return (
        <>
            <div className="flex flex-col lg:mx-10 md:mx-20">

                {/* header */}
                <div className="rounded backdrop-blur-sm shadow-2xl
                    bg-gradient-to-b from-neutral-300/30 to-neutral-200/50
                    p-4 lg:max-w-4xl lg:w-3/4 md:w-full md:mx-auto w-full">

                    {props.message && props.messageLevel &&
                        <BlockQuote props={{
                            message: props.message || "",
                            level: props.messageLevel || ""
                        }} />
                    }

                    <div className={`p-1 rounded`}>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            {props.title}
                        </h2>

                        <p className="my-2 text-sm leading-6 text-gray-600">
                            {props.description}
                        </p>
                    </div>

                    {/* body */}
                    <form onSubmit={props.onSubmit}>
                        <div className={`p-1 rounded`}>
                            {children}
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export { FormModalLayout, FormLayout }
