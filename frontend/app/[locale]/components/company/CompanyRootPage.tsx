'use client'

import React, { useState } from "react"
import CreateSiteModalForm from "@/app/[locale]/components/company/CreateSiteModalForm"
import { SubmitButtonLayout2 } from "@/app/[locale]/components/layout/ButtonLink"
import { useIdentityContext } from "@/contexts/Identity"
import { createSiteFormIntl, ICreateSiteForm } from "@/utils/siteIntl"
import { layoutButtonIntl } from "@/utils/intl"
import { ILayoutButton } from "@/interfaces/intl"

export const CompanyRootPage = () => {
    // context
    const { company, isCompany } = useIdentityContext()

    // state
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Utils
    const createSiteForm: ICreateSiteForm = createSiteFormIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()


    /**
     * Open modal form.
     * @returns {void}
     */
    const openModal = (): void => {
        setIsModalOpen(true)
        setTimeout(() => {
            const modal = document.querySelector('#modal')
            modal?.classList.remove('opacity-0')
        }, 100)
    }

    /**
     * Close modal form.
     * @returns {void}
     */
    const closeModal = (): void => {
        const modal = document.querySelector('#modal')
        modal?.classList.add('opacity-0')
        setTimeout(() => setIsModalOpen(false), 300)
    }

    return (
        <div>
            <div>Company</div>
            <p>Ajouter / supprimer des comptes utilisateurs</p>

            <p>Ajouter des sites</p>
            {/* Create verification task - Only for company */}
            <div>

                <SubmitButtonLayout2 props={{
                    loading: false,
                    buttonName: createSiteForm.addSiteTitle,
                    // width: 'px-3 lg:px-6',
                    // height: 'py-2 lg:py-3',
                    onClick: openModal
                }} />

            </div>
            {isModalOpen &&
                <CreateSiteModalForm props={{
                    isModalOpen: isModalOpen,
                    closeModal: closeModal,
                }} />
            }

            <p>Ajouter des sites</p>
        </div>
    )
}