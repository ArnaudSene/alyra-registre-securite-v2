'use client'

import { useState } from "react"
import {
    getCompanyAccountUpdatedEventsv2,
    getRegisterCreatedEvents, getVerificationTaskCreatedEventsv2,
    getVerificationTaskUpdatedEvents, getVerificationTaskValidatedEventsv2,
    getVerifierAccountUpdatedEvents,
    getVerifierAddedToCompanyEvents,
    getVerifierCreatedEvents,
} from "@/utils";
import {
    ICompanyAccountUpdated,
    IRegisterCreated,
    IVerificationTaskCreated, IVerificationTaskUpdated, IVerificationTaskValidated,
    IVerifierCreated
} from "@/interfaces/company";


const Helper = () => {

    const [eventsRegistersCreated, setEventsRegistersCreated ] = useState<IRegisterCreated[]>([])
    const [eventsCompanyAccountUpdated, setEventsCompanyAccountUpdated ] = useState<any[]>([])
    const [eventsVerifierCreated, setEventsVerifierCreated ] = useState<any[]>([])
    const [eventsVerifierAccountUpdated, setEventsVerifierAccountUpdated ] = useState<any[]>([])
    const [eventsVerifierAddedToCompany, setEventsVerifierAddedToCompany ] = useState<any[]>([])
    const [eventsVerificationTaskCreated, setEventsVerificationTaskCreated ] = useState<any[]>([])
    const [eventsVerificationTaskValidated, setEventsVerificationTaskValidated ] = useState<any[]>([])
    const [eventsVerificationTaskUpdated, setEventsVerificationTaskUpdated ] = useState<any[]>([])

    return (
        <div className="pb-10">

            <div className="pt-28 p-5">
                <button
                    onClick={() => getRegisterCreatedEvents().then(data => setEventsRegistersCreated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 
                        text-center cursor-pointer 
                        transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getRegisterCreatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Account</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Name</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Adresse</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Siret</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Site</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-x border-slate-400/50">Adresse site</div>
                    </div>
                    {eventsRegistersCreated?.map((e, index ) =>
                        <div className="flex flex-row ">
                            <div className="text-slate-600 w-6    px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.account} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{e.name} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.addressName} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{e.siret} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{e.siteName} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-x border-b border-slate-500">{e.siteAddressName} </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getCompanyAccountUpdatedEventsv2().then(data => setEventsCompanyAccountUpdated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 
                        text-center cursor-pointer 
                        transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getCompanyAccountUpdatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Account Company</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Account</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Name</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Firstname</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-x border-slate-400/50">Action</div>
                    </div>
                    {eventsCompanyAccountUpdated?.map((e: ICompanyAccountUpdated, index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6    px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.company} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.account} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.name} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.firstName} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-x border-b border-slate-500">{e.action} </div>

                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getVerifierCreatedEvents().then(data => setEventsVerifierCreated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 text-center
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getVerifierCreatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Verifier</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Name</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Adresse</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Siret</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-x border-slate-400/50">Approval</div>
                    </div>
                    {eventsVerifierCreated?.map((e: IVerifierCreated, index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6    px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{e.verifier} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.name} </div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.addressName} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{e.siret} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-x border-b border-slate-500">{e.approvalNumber} </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getVerifierAccountUpdatedEvents().then(data => setEventsVerifierAccountUpdated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 text-center
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getVerifierAccountUpdatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6   px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Verifier</div>
                        <div className="bg-slate-600 w-1/5 px-1 border-l border-slate-400/50">Account</div>
                        <div className="bg-slate-600 w-1/5 px-1 border-l border-slate-400/50">Name</div>
                        <div className="bg-slate-600 w-1/5 px-1 border-l border-slate-400/50">Firstname</div>
                        <div className="bg-slate-600 w-1/5 px-1 border-x border-slate-400/50">Action</div>
                    </div>
                    {eventsVerifierAccountUpdated?.map((e: string[], index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6   px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e[1]}</div>
                            <div className="text-slate-600 w-1/5 px-1 border-l border-b border-slate-500">{e[2]}</div>
                            <div className="text-slate-600 w-1/5 px-1 border-l border-b border-slate-500">{e[3]}</div>
                            <div className="text-slate-600 w-1/5 px-1 border-l border-b border-slate-500">{e[4]}</div>
                            <div className={`text-slate-600 w-1/5 px-1 ${index === eventsVerifierAccountUpdated.length -1 ?' border-x ': ' border-l '} border-b border-slate-500`}>{e[5]}</div>
                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getVerifierAddedToCompanyEvents().then(data => setEventsVerifierAddedToCompany(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 text-center
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getVerifierAddedToCompanyEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6   px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-1/2 px-1 border-l border-slate-400/50">Company</div>
                        <div className="bg-slate-600 w-1/2 px-1 border-l border-slate-400/50">Verifier</div>
                    </div>
                    {eventsVerifierAddedToCompany?.map((e: string[], index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6   px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-1/2 px-1 border-l border-b border-slate-500">{e[0]} </div>
                            <div className={`text-slate-600 w-1/2 px-1 ${index === eventsVerifierAddedToCompany.length -1 ?' border-x ': ' border-l '} border-b border-slate-500`}>{e[1]}</div>
                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getVerificationTaskCreatedEventsv2().then(data => setEventsVerificationTaskCreated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 text-center
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getVerificationTaskCreatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Company</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Verifier</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Registre ID</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Type</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Task ID</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Status</div>
                        <div className="bg-slate-600 w-2/12 px-1 border-l border-slate-400/50">Site</div>
                        <div className="bg-slate-600 w-2/12 px-1 border-x border-slate-400/50">Timestamp</div>
                    </div>
                    {eventsVerificationTaskCreated?.map((e: IVerificationTaskCreated, index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6    px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{e.company} </div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{e.verifier} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{Number(e.registerId)} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{e.securityType} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{Number(e.taskId)} </div>
                            <div className="text-slate-600 w-1/12 px-1 border-l border-b border-slate-500">{Number(e.taskStatus)} </div>
                            <div className="text-slate-600 w-2/12 px-1 border-l border-b border-slate-500">{e.siteName} </div>
                            <div className="text-slate-600 w-2/12 px-1 border-x border-b border-slate-500">{Number(e.timeStamp)} </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-5">
                <button
                    onClick={() => getVerificationTaskValidatedEventsv2().then(data => setEventsVerificationTaskValidated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 text-center
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getVerificationTaskValidatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Verifier</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Task ID</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-x border-slate-400/50">Status</div>
                    </div>
                    {eventsVerificationTaskValidated?.map((e: IVerificationTaskValidated, index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6    px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{e.verifier} </div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{Number(e.taskId)} </div>
                            <div className="text-slate-600 w-4/12 px-1 border-x border-b border-slate-500">{Number(e.taskStatus)} </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-5">
                <button
                    onClick={() => getVerificationTaskUpdatedEvents().then(data => setEventsVerificationTaskUpdated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 text-center
                    cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getVerificationTaskUpdatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex flex-row text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Company</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-l border-slate-400/50">Task ID</div>
                        <div className="bg-slate-600 w-4/12 px-1 border-x border-slate-400/50">Status</div>
                    </div>
                    {eventsVerificationTaskUpdated?.map((e: IVerificationTaskUpdated, index ) =>
                        <div className="flex flex-row">
                            <div className="text-slate-600 w-6    px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{e.company}</div>
                            <div className="text-slate-600 w-4/12 px-1 border-l border-b border-slate-500">{Number(e.taskId)}</div>
                            <div className="text-slate-600 w-4/12 px-1 border-x border-b border-slate-500">{Number(e.taskStatus)}</div>
                        </div>
                    )}
                </div>
            </div>
            
        </div>
  )
}

export default Helper;