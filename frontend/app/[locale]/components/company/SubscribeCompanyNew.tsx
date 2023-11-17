
import { SubscribeCompanyButton } from "@/app/[locale]/components/company/SubscribeCompanyButton"


export const SubscribeCompanyNew = () => {

    return (
        <div className="flex flex-col md:w-full mb-2 md:mx-3 lg:mx-6
            text-sm md:text-base text-center 
            bg-gradient-to-b from-indigo-300 via-teal-200/70 to-fuchsia-200
            shadow-2xl drop-shadow-lg"
        >
            <h1 className="py-3 px-1 md:rounded-t bottom-0 w-full 
                    text-base md:text-lg font-bold text-slate-700"
                >
                    Vous êtes une compagnie?
            </h1>

            <div className="p-5 h-32 ">
                <ul className="md:text-left">
                    <li><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg><span>Besoin de registres de sécurités</span>
                    </li>
                    <li ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                        </svg>Registres digitalisés et décentralisés
                    </li>
                    <li ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                              stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                    </svg>Donnez de la valeur à votre entreprise
                    </li>
                </ul>
            </div>

            <div className="flex flex-col md:flex-row p-2">
                <SubscribeCompanyButton />
            </div>
        </div>
    )
}