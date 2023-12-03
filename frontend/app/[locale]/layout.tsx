import '../globals.css'
import React, { ReactNode } from "react"
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Providers } from './providers'
import BaseLayout from './components/layout/baseLayout'
import { AbstractIntlMessages } from "use-intl"

const locales = ['en', 'fr']

export function generateStaticParams() {
    return [{locale: 'en'}, {locale: 'fr'}]
}

async function RootLayout({ children, params: {locale} }: { children: ReactNode, params: any }) {
    let messages: AbstractIntlMessages
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
                        <BaseLayout> {children} </BaseLayout>  
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}

export default RootLayout
