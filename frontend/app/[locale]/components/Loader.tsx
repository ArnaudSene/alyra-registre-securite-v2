'use client'

import { Spinner } from "@chakra-ui/react"
import { ReactNode } from "react"

const Loader = ({ children, isLoading }: { children: ReactNode, isLoading: boolean }) => {
    return (!isLoading ? children :
        <div>
            <div className="container flex justify-center mt-5">
                <Spinner thickness='4px' speed='0.42s' emptyColor='gray.500' color='indigo.600' size='xl' />
            </div>
        </div>
    )
}
export default Loader


