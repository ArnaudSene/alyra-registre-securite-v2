"use client"

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
                <div className="bottom-0 w-full">
                    <nav className="flex flex-col mx-auto justify-between text-center p-4 text-gray-600">
                        <div className='flex flex-col md:flex-row mb-2'>
                            <div className='flex flex-col md:flex-row justify-between w-full'>
                                
                                <div className='basis-1/3 p-2 m-2'>
                                    <h1 className='font-bold text-lg border-b border-gray-900/10 pb-2 mb-2'>{footerIntl.products}</h1>
                                    <ul className='text-center'>
                                        <li><Link href="/subscriptionCompany">{footerIntl.companySubscription}</Link></li>
                                        <li><Link href="/subscriptionVerifier">{footerIntl.verifierSubscription}</Link></li>
                                        <li><Link href="/register">{footerIntl.register}</Link></li>
                                        <li><Link href="/company">{footerIntl.company}</Link></li>
                                        <li><Link href="/verifier">{footerIntl.verifier}</Link></li>
                                    </ul>
                                </div>

                                <div className='basis-1/3 p-2 m-2'>
                                    <h1 className='font-bold text-lg border-b border-gray-900/10 pb-2 mb-2'>{footerIntl.support}</h1>
                                    
                                    <ul className='text-center'>
                                        <li><a href="mailto:arnaud.sene@pm.me">{footerIntl.contact}</a></li>
                                        <li><Link href="/faq">{footerIntl.faq}</Link></li>
                                    </ul>
                                </div>

                                <div className='basis-1/3 p-2 m-2'>
                                    <h1 className='font-bold text-lg border-b border-gray-900/10 pb-2 mb-2'>{footerIntl.developer}</h1>
                                    <ul className='text-center'>
                                        <li><Link href="/helper">{footerIntl.helper}</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row md:justify-between'>
                            <div className="flex flex-row mx-auto md:justify-center mb-2 md:mb-0 md:w-1/2">
                                <a className='px-1' href='https://github.com/ArnaudSene/alyra-registre-securite'>
                                    
                                    <svg className='w-[35px] h-[35px]' viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" 
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