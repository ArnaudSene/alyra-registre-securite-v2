'use client'

import React, { useState } from "react"
import { createPortal } from "react-dom"
import { VerifierToCompanyModalForm } from "@/app/[locale]/components/company/VerifierToCompanyModalForm"

export const VerifierToCompanyButton = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button
                className="mx-auto box-border rounded bg-zinc-50 text-rose-500 font-bold
                text-xs md:text-base px-1.5 md:px-3.5 h-8 md:h-10"
                onClick={() => setShowModal(true)}>
                Ajoutez un vérificateur
            </button>
            {showModal && createPortal(
                <VerifierToCompanyModalForm closeModal={() => setShowModal(false)}/>,
                document.body)}
        </div>
    )
}