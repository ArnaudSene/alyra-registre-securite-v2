// 'use client'

// import { createPortal } from "react-dom"
// import { useState } from "react"
// import { VerificationTaskModalFormNew } from "./VerificationTaskModalFormNew"
// import { IVerificationTaskGrid } from "@/interfaces/verificationTasks"
// import { IVerificationTaskModalForm } from "@/interfaces/verificationTasks"


// export const VerificationTaskButtonNew = (
//     { fields, params }: 
//     { fields: IVerificationTaskGrid, params: IVerificationTaskModalForm }
// ) => {
//     const [showModal, setShowModal] = useState(false)

//     return (
//         <div>
//             <button
//                 className={`rounded p-2.5
//                     cursor-pointer transition ease-in-out delay-100 duration-100 hover:scale-105
//                     bg-gradient-to-br from-indigo-700 to-indigo-500
//                     text-slate-100 text-center font-bold`}
//                 onClick={() => setShowModal(true)}>
//                 {fields.createVerificationButton}
//             </button>

//             {showModal && createPortal(
//                 <VerificationTaskModalFormNew 
//                 props={
//                     isModalOpen: boolean,
//                     closeModal: {() => setShowModal(false)},
//                     verificationTaskModalForm: params
//                 }
//                     closeModal={() => setShowModal(false)} 
//                     params={params} />,
//                 document.body
//             )}
//         </div>
//     )
// }