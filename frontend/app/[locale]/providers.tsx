'use client'

import '@rainbow-me/rainbowkit/styles.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from "react"
import { connectorsForWallets, Theme, getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { argentWallet, ledgerWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { hardhat, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import merge from 'lodash.merge'
import { IdentityContextProvider } from "@/contexts/Identity"
import { HeaderFooterContextProvider } from '@/contexts/HeaderFooter'
import { RegisterSecurityEventContextProvider } from '@/contexts/registerSecurityEvent'
import { GlobalContextProvider } from "@/contexts/Global"


const customTheme = merge(lightTheme({
    borderRadius: 'small',
    overlayBlur: 'small',
    fontStack: 'system',
}), {
    colors: {
        accentColor: '#4c5be0ff',
        accentColorForeground: '#d7fffdff', // Test Button
        connectButtonBackground: '#5452e7',
        connectButtonText: '#f1f5f9',
        generalBorder: '#4c5be0ff',
        menuItemBackground: '#4c5be066',
        profileActionHover: '#4c5be066',
        selectedOptionBorder: '',
        standby: '',
    },
} as Theme)

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
        sepolia,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [hardhat] : []),
    ],
    [publicProvider()]
)

const projectId: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || ""

const { wallets } = getDefaultWallets({
    appName: 'RainbowKit Security Register',
    projectId: projectId,
    chains,
})

const AppInfo = {
    appName: 'Security Register RS+',
}

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
])

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
})

export function Providers({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const theme = extendTheme({
        colors: {
            brand: {
                500: "#6366f1",
                600: "#4844bb",
                700: "#312e81"
            },
        },
    })

    return (
        <div>
            <ChakraProvider theme={theme}>
                <WagmiConfig config={wagmiConfig}>
                    <RainbowKitProvider chains={chains} appInfo={AppInfo} theme={customTheme}>
                        <IdentityContextProvider>
                            <HeaderFooterContextProvider>
                                <RegisterSecurityEventContextProvider>
                                    <GlobalContextProvider>
                                        {mounted && children}
                                    </GlobalContextProvider>
                                </RegisterSecurityEventContextProvider>
                            </HeaderFooterContextProvider>
                        </IdentityContextProvider>
                    </RainbowKitProvider>
                </WagmiConfig>
            </ChakraProvider>
        </div>
    )
}