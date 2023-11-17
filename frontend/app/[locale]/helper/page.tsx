'use client'

import { useState } from "react"
import {
    ICompanyAccountUpdated,
    IRegisterCreated
} from "@/interfaces/registers"
import { IVerifierAddedToCompany } from "@/interfaces/verifier"
import { IVerifierAccountUpdated, IVerifierCreated } from "@/interfaces/verifier"
import { IVerificationTaskCreated, IVerificationTaskUpdated, IVerificationTaskValidated } from "@/interfaces/verificationTasks"
import {
    getCompanyAccountUpdateds, 
    getRegisterCreateds,
    getVerificationTaskCreateds,
    getVerificationTaskUpdateds, 
    getVerificationTaskValidateds,
    getVerifierAccountUpdateds,
    getVerifierAddedToCompanies,
    getVerifierCreateds,
} from "@/utils"


const Helper = () => {

    const [eventsRegistersCreated, setEventsRegistersCreated ] = useState<IRegisterCreated[]>([])
    const [eventsCompanyAccountUpdated, setEventsCompanyAccountUpdated ] = useState<ICompanyAccountUpdated[]>([])
    const [eventsVerifierCreated, setEventsVerifierCreated ] = useState<IVerifierCreated[]>([])
    const [eventsVerifierAccountUpdated, setEventsVerifierAccountUpdated ] = useState<IVerifierAccountUpdated[]>([])
    const [eventsVerifierAddedToCompany, setEventsVerifierAddedToCompany ] = useState<IVerifierAddedToCompany[]>([])
    const [eventsVerificationTaskCreated, setEventsVerificationTaskCreated ] = useState<IVerificationTaskCreated[]>([])
    const [eventsVerificationTaskValidated, setEventsVerificationTaskValidated ] = useState<IVerificationTaskValidated[]>([])
    const [eventsVerificationTaskUpdated, setEventsVerificationTaskUpdated ] = useState<IVerificationTaskUpdated[]>([])

    return (
        <div className="pb-10">
            <div className="pt-28 p-5">
                <button
                    onClick={() => getRegisterCreateds().then(data => setEventsRegistersCreated(data))}
                    className="bg-indigo-600 text-slate-100 rounded mx-auto mb-2 p-4 
                        text-center cursor-pointer 
                        transition ease-in-out delay-100 duration-100 hover:scale-105"
                >
                    getRegisterCreatedEvents
                </button>

                <div className="flex flex-col">
                    <div className="flex lg:flex-row  text-slate-50">
                        <div className="bg-slate-600 w-6    px-1 border-l border-slate-400/50">#</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Account</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Name</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-l border-slate-400/50">Adresse</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Siret</div>
                        <div className="bg-slate-600 w-1/12 px-1 border-l border-slate-400/50">Site</div>
                        <div className="bg-slate-600 w-3/12 px-1 border-x border-slate-400/50">Adresse site</div>
                    </div>
                    {eventsRegistersCreated?.map((e, index ) =>
                        <div className="flex flex-row" key={index}>
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
                    onClick={() => getCompanyAccountUpdateds().then(data => setEventsCompanyAccountUpdated(data))}
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
                        <div className="flex flex-row" key={index}>
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
                    onClick={() => getVerifierCreateds().then(data => setEventsVerifierCreated(data))}
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
                        <div className="flex flex-row" key={index}>
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
                    onClick={() => getVerifierAccountUpdateds().then(data => setEventsVerifierAccountUpdated(data))}
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
                    {eventsVerifierAccountUpdated?.map((e: IVerifierAccountUpdated, index ) =>
                        <div className="flex flex-row" key={index}>
                            <div className="text-slate-600 w-6   px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-3/12 px-1 border-l border-b border-slate-500">{e.verifier}</div>
                            <div className="text-slate-600 w-1/5 px-1 border-l border-b border-slate-500">{e.account}</div>
                            <div className="text-slate-600 w-1/5 px-1 border-l border-b border-slate-500">{e.name}</div>
                            <div className="text-slate-600 w-1/5 px-1 border-l border-b border-slate-500">{e.firstName}</div>
                            <div className={`text-slate-600 w-1/5 px-1 border-x border-b border-slate-500`}>{e.action}</div>
                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getVerifierAddedToCompanies().then(data => setEventsVerifierAddedToCompany(data))}
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
                    {eventsVerifierAddedToCompany?.map((e: IVerifierAddedToCompany, index ) =>
                        <div className="flex flex-row" key={index}>
                            <div className="text-slate-600 w-6   px-1 border-l border-b border-slate-500">{index}</div>
                            <div className="text-slate-600 w-1/2 px-1 border-l border-b border-slate-500">{e.company} </div>
                            <div className={`text-slate-600 w-1/2 px-1 border-x border-b border-slate-500`}>{e.verifier}</div>
                        </div>
                    )}
                </div>
            </div>


            <div className="p-5">
                <button
                    onClick={() => getVerificationTaskCreateds(1000, 0).then(data => setEventsVerificationTaskCreated(data))}
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
                        <div className="flex flex-row" key={index}>
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
                    onClick={() => getVerificationTaskValidateds().then(data => setEventsVerificationTaskValidated(data))}
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
                        <div className="flex flex-row" key={index}>
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
                    onClick={() => getVerificationTaskUpdateds().then(data => setEventsVerificationTaskUpdated(data))}
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
                        <div className="flex flex-row" key={index}>
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

export default Helper