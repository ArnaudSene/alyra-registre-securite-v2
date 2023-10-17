'use client'

import { createPortal } from "react-dom";
import {SiteCompanyModalForm} from "@/app/[locale]/components/company/SiteCompanyModalForm";
import {useState} from "react";

export const SiteCompanyButton = () => {

    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            <button
                className="mx-auto box-border rounded bg-zinc-50 text-rose-500 font-bold
                text-xs md:text-base px-1.5 md:px-3.5 h-8 md:h-10"
                onClick={() => setShowModal(true)}>
                Ajoutez un site
            </button>
            {showModal && createPortal(
                <SiteCompanyModalForm closeModal={() => setShowModal(false)}/>,
                document.body)}
        </div>
    );
};