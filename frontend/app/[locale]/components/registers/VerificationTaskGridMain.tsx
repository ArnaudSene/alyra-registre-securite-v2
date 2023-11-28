'use client'

import React, { useState } from "react";
import { headerGrid, IVerificationTaskConsolidated, IVerificationTaskGridMain } from "@/interfaces/verificationTasks";
import Loader from "@/app/[locale]/components/Loader";
import { VerificationTaskGridRow } from "@/app/[locale]/components/registers/VerificationTaskGridRow";
import { VerificationTaskDetail } from "@/app/[locale]/components/registers/VerificationTaskDetail";
import { VerificationTaskFooter } from "@/app/[locale]/components/registers/VerificationTaskFooter";
import { PinataPinListResponse } from "@pinata/sdk"
import { getMetadataFromIPFS } from "@/utils/metadata"
import {
    IPFS_METADATA_PREFIX,
    VALID_TASK_STATUS_ID_FOR_MINTING_NFT
} from "@/constants/enums"

export const VerificationTaskGridMain = ({ props }: { props: IVerificationTaskGridMain }) => {
    const [toggleLog, setToggleLog] = useState(false)
    const [selectedTask, setSelectedTask] = useState<IVerificationTaskConsolidated | undefined>()
    const [metadata, setMetadata] = useState<PinataPinListResponse | undefined>()
    const getMetadata = (data: IVerificationTaskConsolidated) => {
        console.log("getMetadata", data.taskStatus)
        const fileName = `${IPFS_METADATA_PREFIX}${data.taskId}`
        getMetadataFromIPFS(fileName).then((result: PinataPinListResponse) => {
            setMetadata(result)
        })
    }

    const handleToggleRow = (data: IVerificationTaskConsolidated, selectedTask: IVerificationTaskConsolidated | undefined) => {
        if (data.taskId !== selectedTask?.taskId)
            setToggleLog(false)

        if(VALID_TASK_STATUS_ID_FOR_MINTING_NFT.includes(Number(data.taskStatus) || -1))
            getMetadata(data)

        setSelectedTask(data)
        setToggleLog((prevToggle) => !prevToggle)
    }

    // Custom header & column style
    let headersGrid: headerGrid[] = []
    props.fieldsGrid.fieldGridValues.map((field, index) => {
        let header: headerGrid = {
            id: index,
            title: field,
            style: ""
        }

        if (Object.keys(props.headerAttributes.rows).includes(index.toString()))
            header.style = props.headerAttributes.rows[index.toString()].style

        headersGrid.push(header)
    })

    return (
        <div>
            <div className={`hidden lg:grid ${props.headerAttributes.grid.style} lg:gap-0 
                bg-gray-900/30 border-b border-gray-200/10 
                font-medium rounded-t 
                text-xs lg:text-sm text-center lg:text-center lg:py-3 lg:mb-0`}>

                {/* Column fields */}
                {headersGrid.map((field: headerGrid, index) => (
                    <div className={field.style} key={field.id}>{field.title}</div>
                ))}
            </div>

            {/* Data Grid */}
            <Loader isLoading={props.loading}>
                {!props.loading && props.tasks.map((data: IVerificationTaskConsolidated, index: number) =>
                    <div key={Number(data.taskId)}>

                        {/* Verification task row */}
                        <VerificationTaskGridRow
                            props={{
                                index: index.toString(),
                                toggleLog: toggleLog,
                                task: data,
                                selectedTask: selectedTask,
                                fieldsGrid: props.fieldsGrid,
                                onClick: handleToggleRow,
                                attributes: headersGrid,
                                gridStyle: props.headerAttributes.grid.style,
                                accountProfile: props.accountProfile,
                                metadata: metadata
                            }}/>

                        <div className="lg:border-t lg:border-gray-400/10"></div>

                        {/* Verification task detail (onClick) */}
                        {toggleLog &&
                            <VerificationTaskDetail
                                props={{
                                    toggleLog: toggleLog,
                                    index: Number(data.taskId),
                                    selectedTask: selectedTask,
                                    fieldsGrid: props.fieldsGrid,
                                    metadata: metadata
                                }}/>
                        }

                    </div>
                )}

                <VerificationTaskFooter
                    props={{
                        eventSum: props.tasks.length,
                        pagination: props.pagination,
                        first: props.first,
                        skip: props.skip,
                        handlePagination: props.handlePagination
                    }}/>

            </Loader>
        </div>
    )
}