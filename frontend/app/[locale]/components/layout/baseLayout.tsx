import React from 'react'
import Headers from '../headers/headers'
import Footer from '../footers/footer'

const BaseLayout = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className='min-h-screen flex flex-col
            bg-gradient-to-tr from-fuchsia-50 via-purple-300 to-cyan-300'>
            <Headers />
            <div className='mt-16'>
                {children}
            </div>
            <Footer />
        </div>
    )
}
  
  export default BaseLayout