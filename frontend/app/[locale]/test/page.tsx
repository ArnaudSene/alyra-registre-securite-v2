'use client'

import { useState } from "react"
import { FormInputLayout2 } from "../components/layout/FormInputLayout"
import { FormLayout } from "../components/layout/formLayout"
import { SubmitButtonLayout2 } from "../components/layout/ButtonLink"

type Props = {}

const main = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
        setTimeout(() => {
            const modal = document.querySelector('#modal')
            modal?.classList.remove('opacity-0')
        }, 100)
    }

    const closeModal = () => {
        const modal = document.querySelector('#modal')
        modal?.classList.add('opacity-0')
        setTimeout(() => setIsModalOpen(false), 300)
    }

    return (
        <>
            <div className="mt-36">
                {/* <button onClick={openModal}>Open Modal</button> */}

                <SubmitButtonLayout2 props={{
                    loading: false,
                    spinnerSize: 'sm',
                    buttonName: 'Open Modal',
                    onClick: openModal
                }} />

                <p>isModalOpen: {isModalOpen.toString()}</p>
                {isModalOpen && 
                    <Form 
                        isModalOpen={isModalOpen} 
                        closeModal={closeModal} 
                        props={{}}
                    />
                }
            </div>
        </>
    )
}


interface FormData {
    companyAddress: string
}

// Application form
const Form = (
    {isModalOpen, closeModal, props}: 
    {isModalOpen: boolean, closeModal: () => void, props: Props}
) => {

    const [formData, setFormData] = useState<FormData>({
        companyAddress: '',
    })
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(`submit: ${JSON.stringify(formData)}`)
        // Ajoutez ici le code pour gérer la soumission du formulaire
        // par exemple : onSubmit(formData)
        
        closeModal()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            {isModalOpen && 
                <div className="">
                    <FormLayout props={{
                        title: "This is a title test",
                        onModalClose: closeModal, 
                        onSubmit: handleSubmit 
                    }}>
                        <FormInputLayout2 props={{
                            id: "companyAddress",
                            label: "Saisissez une addresse",
                            placeholder: "0x",
                            autoComplete: "companyAddress",
                            onChange: handleChange
                        }}/>

                        <div className="mt-6 pt-6 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
                            <SubmitButtonLayout2 props={{
                                loading: false,
                                spinnerSize: 'sm',
                                buttonName: "Save"
                            }}/>
                        </div>
                    </FormLayout>   
                </div>
            }
        </>
    )
}

export default main