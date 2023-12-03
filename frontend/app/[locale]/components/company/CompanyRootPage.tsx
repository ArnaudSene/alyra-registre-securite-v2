'use client'

import React, { useState } from "react"
import { SubmitButtonLayout2 } from "@/app/[locale]/components/layout/ButtonLink"
import { addSiteToCompanyFormIntl, IAddSiteToCompanyForm } from "@/utils/siteIntl"
import { companyRootPageIntl, layoutButtonIntl } from "@/utils/intl"
import { ICompanyRootPageIntl, ILayoutButton } from "@/interfaces/intl"
import RestrictArea from "@/app/[locale]/components/RestrictArea"
import {
    AddSiteToCompanyForm
} from "@/app/[locale]/components/company/AddSiteToCompanyForm"

export const CompanyRootPage = () => {
    // state
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Utils
    const addSiteToCompany: IAddSiteToCompanyForm = addSiteToCompanyFormIntl()
    const layoutButton: ILayoutButton = layoutButtonIntl()
    const companyRootPage: ICompanyRootPageIntl = companyRootPageIntl()

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
        <RestrictArea asCompany={true}>
            <div>
                <div>{companyRootPage.title}</div>

                <p>Ajouter / supprimer des comptes utilisateurs</p>

                <p>{addSiteToCompany.title}</p>
                {/* Create verification task - Only for company */}
                <div>

                    <SubmitButtonLayout2 props={{
                        loading: false,
                        buttonName: addSiteToCompany.titleForButton,
                        width: 'px-3 lg:px-6',
                        height: 'py-2 lg:py-2',
                        onClick: openModal
                    }} />

                </div>
                {isModalOpen &&
                    <AddSiteToCompanyForm props={{
                        isModalOpen: isModalOpen,
                        closeModal: closeModal,
                    }} />
                }

                <p>Ajouter des sites</p>
            </div>
        </RestrictArea>
    )
}