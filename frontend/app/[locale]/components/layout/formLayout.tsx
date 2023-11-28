import React, { ReactNode, useEffect } from "react"
import { useHeaderFooterContext } from "@/contexts/HeaderFooter"
import { IFormLayout } from "@/interfaces/layout"


const FormLayout = ({ children, props }: { children: ReactNode, props: IFormLayout}) => {
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

                <div id="modal" className="flex flex-col fixed z-50 shadow-lg
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
                    
                    {/* body */}
                    <form onSubmit={props.onSubmit}>
                        {children}
                    </form>

                </div>
            </div>
        </>
    )
}

export { FormLayout }