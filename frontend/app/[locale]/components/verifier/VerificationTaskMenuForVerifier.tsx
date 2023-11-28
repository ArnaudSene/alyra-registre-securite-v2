import React, { useEffect, useState } from "react"
import { useIdentityContext } from "@/contexts/Identity"
import { writeContractByFunctionName } from "@/utils"
import { useToast } from "@chakra-ui/react"

export const VerificationTaskMenuForVerifier = () => {

    const {setRefreshScreen, setApproveVerificationTaskRefresh, verificationTaskStatus, selectedScreen, selectedVerificationTask } = useIdentityContext()
    const toast = useToast()
    const [loading, setLoading] = useState(true)
    const [ refresh, setRefresh] = useState(0)

    useEffect(() => {
        setApproveVerificationTaskRefresh(false)
    }, [])


    const submitValidateVerificationTaskTask = () => {
        writeContractByFunctionName("validateVerificationTask", selectedVerificationTask)
            .then(() => {
                setLoading(true)
                toast({
                    title: 'Validation de vérification de sécurité.',
                    description: `Validation de la tâche ${selectedVerificationTask} exeécutée avec succès`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .catch(err => {
                console.log("Validate task error => " + err)
                toast({
                    title: 'Erreur',
                    description: `Impossible de valider la tâche ${selectedVerificationTask}!`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            })
            .finally(() => {

                // setApproveVerificationTaskRefresh(true)
                // setRefresh(selectedVerificationTask)
                setRefreshScreen(selectedVerificationTask)
                setLoading(false)
            })
    }

    return (
        <div>
            {/*{selectedScreen === "verification" && selectedVerificationTask === 0 && verificationTaskStatus &&*/}
                {selectedScreen === "verification" && selectedVerificationTask >= 0 && verificationTaskStatus &&
                <div className="border-gray-800 border md:border-t-rose-500 mb-1 mx1 md:pl-5  md:mb-2 md:mx-2 rounded bg-gradient-to-t from-gray-800 to-gray-900 text-zinc-50 shadow-lg drop-shadow-lg ">

                    <div className="flex flex-col py-0 md:py-4 ">
                        <h1 className="md:text-left text-center font-semibold text-cyan-500 border-b border-b-gray-700 mb-2">Task: {selectedVerificationTask}</h1>

                        <button className="hover:bg-lime-500/25 hover:bg-gray-800 px-2 font-light leading-6 md:leading-8 text-center
                                md:text-left text-lime-500"
                                onClick={() => submitValidateVerificationTaskTask()}
                        >Approuver</button>

                    </div>
                </div>
            }
        </div>
    )
}