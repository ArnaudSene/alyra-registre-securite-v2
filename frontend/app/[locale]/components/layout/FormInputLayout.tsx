'use client'

import { useState } from "react"
import { IFormInputLayout, IFormInputLayout2, IFormSelectData, IFormSelectLayout } from "@/interfaces/layout"

const FormInputLayout2 = ({ props }: {props: IFormInputLayout2 }) => {

    return (
        <div className="sm:col-span-3">
            <label htmlFor={props.id}
                className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name={props.id}
                    id={props.id}
                    required
                    placeholder={props.placeholder}
                    autoComplete={`auto-complate-${props.autoComplete}`}
                    onChange={props.onChange}
                    className="block w-full rounded-md border-0 py-2.5
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 
                    text-sm leading-3"
                />
            </div>
        </div>
    )
}


const FormInputLayout = ({ props }: {props: IFormInputLayout }) => {

    return (
        <div className="sm:col-span-3">
            <label htmlFor={props.id}
                className="block text-sm font-medium leading-6 text-gray-900">
                {props.label}
            </label>
            <div className="mt-1">
                <input
                    type="text"
                    name={props.id}
                    id={props.id}
                    required
                    placeholder={props.placeholder}
                    autoComplete={`auto-complate-${props.autoComplete}`}
                    className="block w-full rounded-md border-0 py-2.5
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    placeholder:text-gray-400
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600 
                    text-sm leading-3
                    "
                />
            </div>
        </div>
    )
}

const FormSelectLayout = ({ props }: {props: IFormSelectLayout }) => {
    
    return (
        <div className={`sm:col-span-3 ${props.inline && 'flex flex-row h-auto'}`}>
            {props.label && 
                <label htmlFor={props.id}
                    className={`text-sm font-medium text-gray-900
                        ${props.inline ? 'inline mx-2 text-center px-2 py-1 lg:py-2 h-auto' : 'block leading-6'}`}>
                    {props.label}
                </label>
            }

            <div className={`${props.inline ? '' : 'mt-1'}`}>
                <select
                    name={props.id}
                    id={props.id}
                    required
                    value={props.selected.value}
                    onChange={props.onChange}
                    className="block w-full rounded-md border-0 py-1 lg:py-2 text-sm
                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    focus:ring-1 focus:ring-inset focus:ring-indigo-600">

                    <option value={props.defaultSelected.value}>{props.defaultSelected.label}</option>
                    {props.data.map((data: IFormSelectData, index) => (
                        <option key={index} value={data.value}>{data.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export { FormInputLayout, FormSelectLayout, FormInputLayout2 }


