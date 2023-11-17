import '../globals.css'
import { ReactNode } from "react"
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Providers } from './providers'
import Headers from "@/app/[locale]/components/headers/headers"
import Footer from "@/app/[locale]/components/footers/footer"
import BaseLayout from './components/layout/baseLayout'

const locales = ['en', 'fr']

export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'fr'}]
}

async function RootLayout({ children, params: {locale} }: { children: ReactNode, params: any }) {
    
    let messages
    try {
        messages = (await import(`../../lang/${locale}.json`)).default
    } catch (error) {
        notFound()
    }
    const isValidLocale = locales.some((cur) => cur === locale)
    if (!isValidLocale) notFound()
    
    unstable_setRequestLocale(locale)
    

    return ( 
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Providers>
                        {/* <div className='min-h-screen flex flex-col
                            bg-gradient-to-tr from-fuchsia-50 via-purple-300 to-cyan-300'>
                            <Headers />

                            <main className='-flex-1'>
                                {children}
                            </main>

                            <Footer />
                        </div> */}
                        <BaseLayout> {children} </BaseLayout>  
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default RootLayout
