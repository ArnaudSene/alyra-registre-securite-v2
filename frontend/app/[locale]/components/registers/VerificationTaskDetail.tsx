import React from "react";
import {IVerificationTaskDetail} from "@/interfaces/verificationTasks";
import {
    IPFS_URL,
    VALID_TASK_STATUS_ID_FOR_MINTING_NFT
} from "@/constants/enums"



export const VerificationTaskDetail = ({props}: { props: IVerificationTaskDetail }) => {
    return (
        <>
            <div className={`${props.toggleLog && Number(props.selectedTask?.taskId) === Number(props.index) ? '': 'hidden'}
                shadow-lg`}>

                {/* Verifier detail */}
                <div className="bg-gray-900/5 font-bold
                    text-xs text-center py-1 lg:text-left lg:pl-5 lg:py-1 lg:mb-0">{props.fieldsGrid.fieldSubGridFirstTitle}
                </div>

                <div className="hidden bg-gray-900/5 shadow-md lg:grid lg:grid-cols-7 lg:gap-0
                font-semibold text-xs text-center lg:text-center lg:mb-0 lg:py-1">
                    {props.fieldsGrid.fieldSubGridFirstValues.map((field, index) => <div key={index}>{field}</div>)}
                </div>

                <div className={`flex flex-col lg:grid lg:grid-cols-7 text-xs text-center pb-3 lg:p-0 lg:my-0`}>

                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start lg:justify-center">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[0]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5 break-all">{props.selectedTask?.verifierAccount}</p>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start justify-center h-ful">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[1]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5">{props.selectedTask?.verifierAddressName}</p>
                        </div>
                    </div>


                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start lg:justify-center">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[2]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5">{props.selectedTask?.verifierCompanyName}</p>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start lg:justify-center">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[3]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5">{props.selectedTask?.verifierFirstName}</p>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start lg:justify-center">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[4]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5">{props.selectedTask?.verifierName}</p>
                        </div>
                    </div>
                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start lg:justify-center">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[5]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5">{props.selectedTask?.verifierSiret}</p>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-0.5 lg:mt-0 lg:py-1">
                        <div className="flex items-start lg:justify-center">
                            <p className="lg:hidden basis-1/4 px-0.5 font-bold">{props.fieldsGrid.fieldSubGridFirstValues[6]}</p>
                            <p className="lg:p0     basis-3/4 px-0.5">{props.selectedTask?.verifierApprovalNumber}</p>
                        </div>
                    </div>
                </div>


                {/* Company */}
                <div className="bg-gray-900/5 font-bold
                    text-xs text-center lg:text-left lg:pl-5 lg:py-1 lg:mb-0">
                    {props.fieldsGrid.fieldSubGridSecondTitle} ({props.selectedTask?.taskId.toString()})
                </div>

                {/* Header */}
                <div className="hidden bg-gray-900/5 shadow-md lg:grid lg:grid-cols-7 lg:gap-0
                    font-semibold text-xs text-center lg:text-center lg:mb-0 lg:py-1">
                    {props.fieldsGrid.fieldSubGridSecondValues.map((field, index) => <div
                        key={index}>{field}</div>)}
                </div>

                <div className={`flex flex-col lg:grid lg:grid-cols-7 text-xs text-center pb-3 lg:p-0 lg:my-0`}>

                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                            <div
                                className="lg:hidden basis-1/4 pr-1 font-bold">{props.fieldsGrid.fieldSubGridSecondValues[0]}</div>
                            <div className="pl-1 lg:p0 basis-3/4 break-all">{props.selectedTask?.company}</div>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                            <div
                                className="lg:hidden basis-1/4 pr-1 font-bold">{props.fieldsGrid.fieldSubGridSecondValues[1]}</div>
                            <div
                                className="pl-1 lg:p0 basis-3/4 break-all">{props.selectedTask?.companyAccount}</div>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                            <div
                                className="lg:hidden basis-1/4 pr-1 font-bold">{props.fieldsGrid.fieldSubGridSecondValues[2]}</div>
                            <div
                                className="pl-1 lg:p0 basis-3/4">{props.selectedTask?.companyAccountFirstName}</div>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                            <div
                                className="lg:hidden basis-1/4 pr-1 font-bold">{props.fieldsGrid.fieldSubGridSecondValues[3]}</div>
                            <div className="pl-1 lg:p0 basis-3/4">{props.selectedTask?.companyAccountName}</div>
                        </div>
                    </div>

                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                            <div
                                className="lg:hidden basis-1/4 pr-1 font-bold">{props.fieldsGrid.fieldSubGridSecondValues[4]}</div>
                            <div className="pl-1 lg:p0 basis-3/4">{props.selectedTask?.companyAddress}</div>
                        </div>
                    </div>
                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                            <div
                                className="lg:hidden basis-1/4 pr-1 font-bold">{props.fieldsGrid.fieldSubGridSecondValues[5]}</div>
                            <div className="pl-1 lg:p0 basis-3/4">{props.selectedTask?.companySiret}</div>
                        </div>
                    </div>
                </div>


                {/* NFT & Metadata */}
                {VALID_TASK_STATUS_ID_FOR_MINTING_NFT.includes(Number(props.selectedTask?.taskStatus) || -1)
                    && Number(props.selectedTask?.taskId) === Number(props.index) &&
                    <div>
                        <div className="bg-gray-900/5 font-bold
                        text-xs text-center lg:text-left lg:pl-5 lg:py-1 lg:mb-0">
                            {props.fieldsGrid.fieldSubGridThirdTitle}
                        </div>

                        <div className={`flex flex-col lg:grid lg:grid-cols-2 text-xs text-center pb-3 lg:p-0 lg:my-0`}>
                            {props.metadata?.rows.map((row, index) =>
                                <div key={index}>

                                    <div className="text-left lg:text-center mt-3 lg:mt-0 lg:py-1">
                                        <div className="flex lg:items-center lg:justify-center h-full px-1">
                                            {["-NFT"].includes(row.metadata.name?.toString().slice(-4) || "") ? (
                                                <div>
                                                    <div className={`font-bold`}>
                                                        {props.fieldsGrid.fieldSubGridThirdValues[1]}
                                                    </div>
                                                    <div className="pl-1 lg:p0 basis-3/4 break-all cursor-pointer text-indigo-500">
                                                        <a href={`${IPFS_URL}${row.ipfs_pin_hash}` || ""} target={`_blank`}>
                                                            {`${IPFS_URL}${row.ipfs_pin_hash}`}
                                                        </a>
                                                    </div>
                                                </div>
                                            ): (
                                                <div>
                                                    <div className={`font-bold`}>
                                                        {props.fieldsGrid.fieldSubGridThirdValues[0]}
                                                    </div>
                                                    <div className="pl-1 lg:p0 basis-3/4 break-all cursor-pointer text-indigo-500">
                                                        <a href={`${IPFS_URL}${row.ipfs_pin_hash}` || ""} target={`_blank`}>
                                                            {`${IPFS_URL}${row.ipfs_pin_hash}`}
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>

        </>
    )
}