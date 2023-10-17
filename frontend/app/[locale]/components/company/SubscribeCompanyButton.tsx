'use client'

import {useState} from "react";
import { createPortal } from "react-dom";
import { CompanyModalForm } from "@/app/[locale]/components/company/CompanyModalForm";

export const SubscribeCompanyButton = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                className="rounded mx-auto p-3 w-[150px]
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
                    bg-gradient-to-br from-indigo-700 to-indigo-500
                    text-slate-100 text-center font-bold
                    "
                onClick={() => setShowModal(true)}
            >
                Souscrire
            </button>
            {showModal && createPortal(
                <CompanyModalForm closeModal={() => setShowModal(false)}/>,
                document.body)}
        </>
    );
};