'use server'
import { writeContractByFunctionName } from "@/utils"

export async function submitCreateCompany(prevState: any, formData: FormData) {

    const indexIntl = (formData: FormData): string[] => {
        const mapping: {
            [key: string]: number
          } = {
            name: 0,
            address: 1,
            siret: 2,
            siteName: 3,
            siteAddress: 4,
          }
          
        let result: string[] = []

        for (const [key, value] of formData.entries() as Iterable<[string, string]>)
            result[mapping[key]] = value
        
        return result
    }
    indexIntl(formData)

    writeContractByFunctionName("createRegister", ...indexIntl(formData))
        .then(() => {
            console.log("success!")
        })
        .catch(err => {
            console.log("x full error => " + err)
 
        })
}