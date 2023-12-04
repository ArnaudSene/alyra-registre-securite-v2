"use client"

import React from "react"
import Link from 'next/link'
import { IHeaderFooter } from '@/interfaces/intl'
import { headerFooterIntl } from '@/utils/intl'
import { useHeaderFooterContext } from '@/contexts/HeaderFooter'


const Footer = () => {
    const footerIntl: IHeaderFooter = headerFooterIntl()
    const { footerOn } =  useHeaderFooterContext()

    return (
        <footer>
            {footerOn && (
                <div className="w-full text-sm">
                    <nav className="flex flex-col mx-auto justify-between text-center p-4 text-gray-600">
                        <div className={`lg:grid grid-cols-3 p-1 my-2`}>
                            <div>
                                <div className={`font-bold text-base py-2`}>{footerIntl.products}</div>
                                <div className={`flex flex-col border-t border-slate-500`}>
                                    {/*Register*/}
                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/register">{footerIntl.register}</Link></span>
                                        </div>
                                    </div>

                                    {/*Company*/}
                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/subscriptionCompany">{footerIntl.companySubscription}</Link></span>
                                        </div>

                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/company">{footerIntl.company}</Link></span>
                                        </div>
                                    </div>

                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/subscriptionVerifier">{footerIntl.verifierSubscription}</Link></span>
                                        </div>

                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/verifier">{footerIntl.verifier}</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className={`font-bold text-base py-2`}>{footerIntl.support}</div>
                                <div className={`flex flex-col border-t border-slate-500`}>
                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                            <span className={`p-1`}><a href="mailto:arnaud.sene@pm.me">{footerIntl.support}</a></span>
                                        </div>
                                    </div>

                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/faq"><span>{footerIntl.faq}</span></Link></span>
                                        </div>
                                    </div>

                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/documentation"><span>{footerIntl.documentation}</span></Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className={`font-bold text-base py-2`}>{footerIntl.developer}</div>
                                <div className={`flex flex-col border-t border-slate-500`}>

                                    <div className={`p-1.5 lg:ml-5 lg:text-left`}>
                                        <div className={`flex rounded hover:italic hover:bg-indigo-200/50 hover:transition ease-in-out delay-50 duration-50`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                                                 className="w-5 h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                                            </svg>
                                            <span className={`p-1`}><Link href="/helper">{footerIntl.helper}</Link></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='flex flex-col md:flex-row md:justify-between'>
                            <div className="flex flex-row mx-auto md:justify-center mb-2 md:mb-0 md:w-1/2">
                                <a className='px-1' href='https://github.com/ArnaudSene/alyra-registre-securite'>
                                    
                                    <svg className='w-[35px] h-[35px] ' viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        fill="#000000">

                                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                                        <g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> 
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> 
                                            <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" 
                                                fill="#000000" className='fill-slate-900/30'>
                                            <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g>
                                    </svg>

                                </a>

                                <a className='px-1' href='https://twitter.com/ArnaudSene'>
                                    <svg className='w-[35px] h-[35px]' viewBox="0 -2 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                        <title>twitter [#154]</title><desc>Created with Sketch.</desc><defs></defs>
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)" 
                                                fill="#000000" className='fill-slate-900/30'>
                                                <g id="icons" transform="translate(56.000000, 160.000000)"><path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]"></path></g>
                                            </g>
                                        </g>
                                    </svg>
                                </a>

                                <a className='px-1' href='https://www.linkedin.com/in/arnaud-sene-06a49725'>
                                    <svg className='w-[35px] h-[35px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.72 3.99997H5.37C5.19793 3.99191 5.02595 4.01786 4.86392 4.07635C4.70189 4.13484 4.55299 4.22471 4.42573 4.34081C4.29848 4.45692 4.19537 4.59699 4.12232 4.75299C4.04927 4.909 4.0077 5.07788 4 5.24997V18.63C4.01008 18.9901 4.15766 19.3328 4.41243 19.5875C4.6672 19.8423 5.00984 19.9899 5.37 20H18.72C19.0701 19.9844 19.4002 19.8322 19.6395 19.5761C19.8788 19.32 20.0082 18.9804 20 18.63V5.24997C20.0029 5.08247 19.9715 4.91616 19.9078 4.76122C19.8441 4.60629 19.7494 4.466 19.6295 4.34895C19.5097 4.23191 19.3672 4.14059 19.2108 4.08058C19.0544 4.02057 18.8874 3.99314 18.72 3.99997ZM9 17.34H6.67V10.21H9V17.34ZM7.89 9.12997C7.72741 9.13564 7.5654 9.10762 7.41416 9.04768C7.26291 8.98774 7.12569 8.89717 7.01113 8.78166C6.89656 8.66615 6.80711 8.5282 6.74841 8.37647C6.6897 8.22474 6.66301 8.06251 6.67 7.89997C6.66281 7.73567 6.69004 7.57169 6.74995 7.41854C6.80986 7.26538 6.90112 7.12644 7.01787 7.01063C7.13463 6.89481 7.2743 6.80468 7.42793 6.74602C7.58157 6.68735 7.74577 6.66145 7.91 6.66997C8.07259 6.66431 8.2346 6.69232 8.38584 6.75226C8.53709 6.8122 8.67431 6.90277 8.78887 7.01828C8.90344 7.13379 8.99289 7.27174 9.05159 7.42347C9.1103 7.5752 9.13699 7.73743 9.13 7.89997C9.13719 8.06427 9.10996 8.22825 9.05005 8.3814C8.99014 8.53456 8.89888 8.6735 8.78213 8.78931C8.66537 8.90513 8.5257 8.99526 8.37207 9.05392C8.21843 9.11259 8.05423 9.13849 7.89 9.12997ZM17.34 17.34H15V13.44C15 12.51 14.67 11.87 13.84 11.87C13.5822 11.8722 13.3313 11.9541 13.1219 12.1045C12.9124 12.2549 12.7546 12.4664 12.67 12.71C12.605 12.8926 12.5778 13.0865 12.59 13.28V17.34H10.29V10.21H12.59V11.21C12.7945 10.8343 13.0988 10.5225 13.4694 10.3089C13.84 10.0954 14.2624 9.98848 14.69 9.99997C16.2 9.99997 17.34 11 17.34 13.13V17.34Z" 
                                            fill="#000000" className='fill-slate-900/30'/>
                                    </svg>
                                </a>
                            </div>

                            <div className="mx-auto md:w-1/2">
                                <p className='h-full py-1'>
                                    © 2023 {footerIntl.title} <span className="italic"> RS+</span>. {footerIntl.rights}.
                                </p>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </footer>
    )
}
export default Footer