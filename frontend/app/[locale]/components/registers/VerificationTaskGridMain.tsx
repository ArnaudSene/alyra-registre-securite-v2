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
    const [selectedTask, setSelectedTask] = useState<IVerificationTaskConsolidated | undefined>()
    const [metadata, setMetadata] = useState<PinataPinListResponse | undefined>()

    interface ISaveRowToggleStatus {
        [key: number]: boolean
    }
    const [saveRowToggleStatus, setSaveRowToggleStatus] = useState<ISaveRowToggleStatus>({})


    const updateSaveRowToggleStatus = (updatedData: ISaveRowToggleStatus) => {
        setSaveRowToggleStatus(prevState => ({
            ...prevState,
            ...updatedData,
        }))
    }

    const handleSaveRowToggleStatus = (taskId: BigInt, previousTaskId: BigInt | undefined): void => {
        const mySaveRowToggleStatus: ISaveRowToggleStatus = {}

        if (taskId === previousTaskId)
            mySaveRowToggleStatus[Number(taskId)] = !saveRowToggleStatus[Number(taskId)]
        else {
            mySaveRowToggleStatus[Number(taskId)] = true
            if (previousTaskId) mySaveRowToggleStatus[Number(previousTaskId)] = false
        }

        updateSaveRowToggleStatus(mySaveRowToggleStatus)
    }

    const getMetadata = (data: IVerificationTaskConsolidated) => {
        const fileName = `${IPFS_METADATA_PREFIX}${data.taskId}`
        if(VALID_TASK_STATUS_ID_FOR_MINTING_NFT.includes(Number(data.taskStatus) || -1) && !saveRowToggleStatus[Number(data.taskId)])
            getMetadataFromIPFS(fileName).then((result: PinataPinListResponse) => setMetadata(result))
    }

    const handleToggleRow = (data: IVerificationTaskConsolidated, selectedTask: IVerificationTaskConsolidated | undefined) => {
        handleSaveRowToggleStatus(data.taskId, selectedTask?.taskId)
        getMetadata(data)
        setSelectedTask(data)
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
                {headersGrid.map((field: headerGrid) => (
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
                                toggleLog: saveRowToggleStatus[Number(data.taskId)],
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
                        <div>
                            <VerificationTaskDetail
                                props={{
                                    toggleLog: saveRowToggleStatus[Number(data.taskId)],
                                    index: Number(data.taskId),
                                    selectedTask: selectedTask,
                                    fieldsGrid: props.fieldsGrid,
                                    metadata: metadata
                                }}/>
                        </div>
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