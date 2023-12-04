import React from 'react'
import Headers from '../headers/headers'
import Footer from '../footers/footer'

const BaseLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className='min-h-screen flex flex-col justify-between
            bg-gradient-to-tr from-fuchsia-50 via-purple-300 to-cyan-300'>
            <Headers />

            <main className={`mb-auto py-16`}>
                {children}
            </main>

            <Footer />
        </div>
    )
}
  
  export default BaseLayout