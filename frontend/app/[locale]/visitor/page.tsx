'use client'

import React, {useState} from 'react'
import Loader from "@/app/[locale]/components/Loader"
import IsConnectedAs from "@/app/[locale]/components/IsConnectedAs"

const VisitorPage = () => {
    const [loading, setLoading] = useState(false)

    return (
        <Loader isLoading={loading}>
            <IsConnectedAs asVerifier={true}>
                <div className="flex flex-row justify-between">
                    <div className="border-t border-t-rose-500 text-center w-1/2 mt-10 p-5
                    bg-gradient-to-t from-gray-700 to-gray-800 bg-gray-700 rounded mx-auto
                     ">
                        <p>Ho, cette section n'est pas encore en service on dirait!</p>

                    </div>
                    
                </div>
            </IsConnectedAs>
        </Loader>
  )
}

export default VisitorPage