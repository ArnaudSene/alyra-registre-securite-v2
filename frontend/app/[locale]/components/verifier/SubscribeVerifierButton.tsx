'use client'

import {useState} from "react";
import { createPortal } from "react-dom";
import {VerifierModalForm} from "@/app/[locale]/components/verifier/VerifierModalForm";

export const SubscribeVerifierButton = () => {

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
                <VerifierModalForm closeModal={() => setShowModal(false)}/>,
                document.body)}
        </>
    );
};