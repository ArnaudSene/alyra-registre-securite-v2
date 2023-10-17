import Image from 'next/image'
import { CubeFinalOpt, MetadataNFT3 } from "@/assets"
import { indexIntl, homePagerIntl, headerFooterIntl } from '@/utils/intl'
import { IHeaderFooter, IHomePager, IIndex } from '@/interfaces/intl'
import { ButtonLink } from '../components/layout/ButtonLink'

const HomePager = () => {
    const indexIntlData: IIndex = indexIntl()
    const homePagerIntlData: IHomePager = homePagerIntl()
    const headerFooterIntlData: IHeaderFooter = headerFooterIntl()
    
    return (
        <div className="pb-10">

            {/* Introduction */}
            <div className="flex flex-col md:flex-row justify-between md:mb-5 pt-16 px-2 z-10">
                <div className='p-2 md:w-1/2 z-10'>
                    <div className='text-slate-700'>
                        <h1 className='md:pt-20 pb-2 md:pb-3 md:pl-10 font-extrabold text-3xl md:text-6xl text-slate-800'>{indexIntlData.title}</h1>
                        <h2 className='md:pl-10 pb-2 md:pb-5 text-xl md:text-2xl'>{indexIntlData.title}</h2>
                        <p className='md:pl-10 pt-4'>{homePagerIntlData.homePagerSubtitle1}</p>
                        <p className='md:pl-10 pt-4'>{homePagerIntlData.homePagerSubtitle2}<span className='font-bold'>NFT</span>{homePagerIntlData.homePagerSubtitle3}</p>
                    </div>
                </div>

                <div className="mt-[-30px] md:mt-0 md:p-2">
                    <Image src={CubeFinalOpt} alt='CubeSvg'/>
                </div>
            </div>

            {/* Explication */}
            <div className="flex flex-col-reverse md:flex-row justify-between md:mb-5 pt-2 px-2 z-10">
                <div className="mt-[-0px] md:mt-40 md:p-2">
                    <Image src={MetadataNFT3} alt='CubeSvg'/>
                </div>

                <div className='p-2 md:w-1/2 z-10'>
                    <div className='text-slate-700'>
                        <h1 className='md:pt-0 pb-2 md:pb-3 md:pl-10 font-extrabold text-3xl md:text-6xl text-slate-800'>{homePagerIntlData.descTitle}</h1>
                        <h2 className='md:pl-10 pb-2 md:pb-5 text-xl md:text-2xl'>{homePagerIntlData.descSubTitle}</h2>
                        <p className='md:pl-10 pt-4'>{homePagerIntlData.descText1}</p>
                        <p className='md:pl-10 pt-4'>{homePagerIntlData.descText2}<span className='font-bold'>IPFS</span> <span className='italic'>(InterPlanetary File System)</span>.</p>
                        <p className='md:pl-10 pt-4'>{homePagerIntlData.descText3}<span className='font-bold'>NFT</span> <span className='italic'>(Non-fungible token)</span>.</p>
                        <p className='md:pl-10 pt-4'>{homePagerIntlData.descText4}</p>
                        <ul className='pt-4 pl-4 list-disc'>
                            <li className='ml-4 md:ml-16'>{homePagerIntlData.descText5}</li>
                            <li className='ml-4 md:ml-16'>{homePagerIntlData.descText6}</li>
                            <li className='ml-4 md:ml-16'>{homePagerIntlData.descText7}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* More info */}
            <div className='flex flex-col md:mb-5 pt-2 px-2 md:px-40'>
                <h2 className='mx-auto p-6 text-center font-bold text-xl md:text-2xl'>{homePagerIntlData.moreInfo}</h2>
                <div className='flex flex-row justify-center'>

                    <ButtonLink params={{
                        title: headerFooterIntlData.contact,
                        href: "/contact"
                    }}/>

                    <ButtonLink params={{
                        title: headerFooterIntlData.documentation,
                        href: "/documentation"
                    }}/>
                </div>
            </div>


            {/* Usage */}
            <div className="flex flex-col md:flex-col justify-between  pt-16 px-2 z-10">
                <div className='p-2 z-10'>
                    <div className='text-slate-700'>
                        <h1 className='md:pt-0 pb-2 md:pb-3 md:pl-10 font-extrabold text-3xl md:text-6xl text-slate-800'>
                        {headerFooterIntlData.products}
                        </h1>
                    </div>
                </div>

                <div className='flex flex-col md:flex-row justify-between'>
                    
                    <div className='p-2 md:m-2 mb-4 basis-1/3 rounded 
                        bg-gradient-to-b from-indigo-300 via-teal-200/70 to-fuchsia-200
                        shadow-2xl hover:drop-shadow-2xl ease-in-out delay-100'>

                        <div className='flex flex-col'>
                            <div className='flex flex-col border-b border-slate-400 w-full mb-4 lg:h-72 md:h-96'>
                                <p className='p-2 mx-auto text-center font-bold text-xl'>{homePagerIntlData.cpyTitle}</p>
                                
                                <ul className="my-8 text-center md:text-left">
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>{homePagerIntlData.cpyEnum1}
                                    </li>
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg><span>{homePagerIntlData.cpyEnum2}</span>
                                    </li>
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>{homePagerIntlData.cpyEnum3}
                                    </li>
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>{homePagerIntlData.cpyEnum4}
                                    </li>
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>{homePagerIntlData.cpyEnum5}
                                    </li>
                                </ul>
                            </div>

                            <div className='flex justify-end'>
                                <ButtonLink params={{
                                    "title": homePagerIntlData.subscribe,
                                    "href": "/subscriptionCompany"
                                }}/>
                            </div>
                        </div>
                    </div>


                    <div className='p-2 md:m-2 mb-4 basis-1/3 rounded 
                        bg-gradient-to-b from-indigo-300 via-teal-200/70 to-fuchsia-200
                        shadow-2xl'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col border-b border-slate-400 w-full mb-4 lg:h-72 md:h-96'>
                                <p className='p-2 mx-auto text-center font-bold text-xl'>{homePagerIntlData.cpyVGPTitle}</p>

                                <ul className="my-8 text-center md:text-left">
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>
                                        {homePagerIntlData.cpyVGPEnum1}
                                    </li>
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>
                                        {homePagerIntlData.cpyVGPEnum2}
                                    </li>
                                </ul>
                            </div>

                            <div className='flex justify-end '>
                                <ButtonLink params={{
                                    "title": homePagerIntlData.subscribe,
                                    "href": "/subscriptionVerifier"
                                }}/>
                            </div>
                        </div>
                    </div>

                    <div className='p-2 md:m-2 mb-4 basis-1/3 rounded 
                        bg-gradient-to-b from-indigo-300 via-teal-200/70 to-fuchsia-200
                        shadow-2xl'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col border-b border-slate-400 w-full mb-4 lg:h-72 md:h-96'>
                                <p className='p-2 mx-auto text-center font-bold text-xl'>{homePagerIntlData.consultRegisterTitle}</p>

                                <ul className="my-8 text-center md:text-left">
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>{homePagerIntlData.consultRegisterEnum1}
                                    </li>
                                    <li className='my-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                            stroke="currentColor" 
                                            className="w-3 h-3 md:w-5 md:h-5 inline mr-2 text-indigo-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                                        </svg>{homePagerIntlData.consultRegisterEnum2}
                                    </li>
                                </ul>
                            </div>

                            <div className='flex justify-end'>
                                <ButtonLink params={{
                                    "title": homePagerIntlData.consultRegisterButton,
                                    "href": "/register",
                                }}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )   
}

export default HomePager;