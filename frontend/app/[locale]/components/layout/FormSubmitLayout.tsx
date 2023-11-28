import React from 'react'
import { IFormInputLayout } from "@/interfaces/layout"

const FormSubmitLayout = ({ params }: {params: IFormInputLayout }) => {

    return (
        <div className="sm:col-span-3">
            <label htmlFor={params.id}
                className="block text-sm font-medium leading-6 text-gray-900">
                {params.label}
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name={params.id}
                    id={params.id}
                    required
                    placeholder={params.placeholder}
                    autoComplete={params.autoComplete}
                    className="block w-full rounded-md border-0 py-3
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400 
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                    bg-gradient-to-r from-indigo-100 to-indigo-100"
                />
            </div>
        </div>
    )
}
export default FormSubmitLayout


