'use client'

import { useEffect, useState } from "react"
import { useAccount } from "wagmi"

import Link from "next/link"

const Navbar = () => {
    const { address, isConnected } = useAccount()
    const [isVerifier, setIsVerifier] = useState(false)
    const [isCompany, setIsCompany] = useState(false)
    const [isOwner, setIsOwner] = useState(false)
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        setIsVerifier(false)
        setIsCompany(false)
        setIsOwner(false)

    }, [address, isConnected, refresh])

    return ((isOwner || isVerifier || isCompany) &&
        // <nav className="bg-gray-800 text-gray-100 border-gray-500 border-b p-3 text-center">
        //     {isOwner && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/admin">Owner</Link>}
        //     {isVerifier && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/verifier">Verifier</Link>}
        //     {isCompany && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/company">Company</Link>}
        // </nav>
        <nav className="bg-gradient-to-r from-cyan-300 to-violet-500 border-b p-3 text-center">
            {isOwner && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/admin">Owner</Link>}
            {isVerifier && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/verifier">Verifier</Link>}
            {isCompany && <Link className="p-5 font-semibold hover:text-indigo-500 hover:font-bold" href="/company">Company</Link>}
        </nav>
    )
}
export default Navbar;