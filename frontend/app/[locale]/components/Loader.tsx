'use client'

import { Progress } from "@chakra-ui/react"
import { ReactNode } from "react"

const Loader = ({ children, isLoading }: { children: ReactNode, isLoading: boolean }) => {
    return (!isLoading ? children :
        <div>
            <Progress size='xs' isAnimated hasStripe isIndeterminate colorScheme='purple'/>
        </div>
    )
}
export default Loader


