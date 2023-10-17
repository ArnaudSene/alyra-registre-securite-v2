'use client'

import { createPortal } from "react-dom";
import { useState } from "react";
import { VerificationTaskModalFormNew } from "./VerificationTaskModalFormNew";

export const VerificationTaskButtonNew = ({width}: {width?: string}) => {

    const [showModal, setShowModal] = useState(false)
    const defaultWidth = width ? width : "w-[30px]"

    return (
        <div>
            <button
                className={`rounded p-2.5
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
                    bg-gradient-to-br from-indigo-700 to-indigo-500
                    text-slate-100 text-center font-bold`}
                onClick={() => setShowModal(true)}>
                Créer vérification
            </button>

            {showModal && createPortal(
                <VerificationTaskModalFormNew closeModal={() => setShowModal(false)}/>,
                document.body
            )}
        </div>
    );
};