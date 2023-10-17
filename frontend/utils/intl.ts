import { IFormSubscriptionCompany, IFormSubscriptionVerifier, IHeaderFooter, IHomePager, IIndex, ILayoutButton, ILayoutEventLog, IToasterMessages } from '@/interfaces/intl'
import { useTranslations } from 'next-intl'

export const toasterMessages = (): IToasterMessages => {
    const t = useTranslations('ToasterMessages')
    
    return {
        notConnectedTitle: t('notConnected.title'),
        notConnectedDescription: t('notConnected.description'),
        subscribeCompanyOkTitle: t('subscribeCompany.ok.title'),
        subscribeCompanyOkDescription: t('subscribeCompany.ok.description'),
        subscribeCompanyErrorTitle: t('subscribeCompany.error.title'),
        subscribeCompanyErrorDescription: t('subscribeCompany.error.description'),
        subscribeVerifierOkTitle: t('subscribeVerifier.ok.title'),
        subscribeVerifierOkDescription: t('subscribeVerifier.ok.description'),
        subscribeVerifierErrorTitle: t('subscribeVerifier.error.title'),
        subscribeVerifierErrorDescription: t('subscribeVerifier.error.description'),
    }
}

export const headerFooterIntl = (): IHeaderFooter => {
    const t = useTranslations('HeaderFooter')

    return {
        title: t('title'),
        register: t('register'),
        member: t('member'),
        companySubscription: t('companySubscription'),
        verifierSubscription: t('verifierSubscription'),
        company: t('company'),
        verifier: t('verifier'),
        support: t('support'),
        faq: t('faq'),
        documentation: t('documentation'),
        products: t('products'),
        contact: t('contact'),
        developer: t('developer'),
        helper: t('helper'),
        rights: t('rights')
    }
}

export const indexIntl = (): IIndex => {
    const t = useTranslations('Index')
    return {
        title: t('title'),
    }
}

export const homePagerIntl = (): IHomePager => {
    const t = useTranslations('HomePager')
    return {
        "homePagerTitle": t('homePagerTitle'),
        "homePagerSubtitle1": t('homePagerSubtitle1'),
        "homePagerSubtitle2": t('homePagerSubtitle2'),
        "homePagerSubtitle3": t('homePagerSubtitle3'),
        "subscribe": t('subscribe'),
        "descTitle": t('descTitle'),
        "descSubTitle": t('descSubTitle'),
        "descText1": t('descText1'),
        "descText2": t('descText2'),
        "descText3": t('descText3'),
        "descText4": t('descText4'),
        "descText5": t('descText5'),
        "descText6": t('descText6'),
        "descText7": t('descText7'),
        "moreInfo": t('moreInfo'),
        "cpyTitle": t('cpyTitle'),
        "cpyEnum1": t('cpyEnum1'),
        "cpyEnum2": t('cpyEnum2'),
        "cpyEnum3": t('cpyEnum3'),
        "cpyEnum4": t('cpyEnum4'),
        "cpyEnum5": t('cpyEnum5'),
        "cpyVGPTitle": t('cpyVGPTitle'),
        "cpyVGPEnum1": t('cpyVGPEnum1'),
        "cpyVGPEnum2": t('cpyVGPEnum2'),
        "consultRegisterTitle": t('consultRegisterTitle'),
        "consultRegisterEnum1": t('consultRegisterEnum1'),
        "consultRegisterEnum2": t('consultRegisterEnum2'),
        "consultRegisterButton": t('consultRegisterButton')
    }
}

export const formSubscriptionCompanyIntl = (): IFormSubscriptionCompany => {
    const t = useTranslations('layout.form.subscriptionCompany')
    return {
        title: t('title'),
        description: t('description'),
        name: t('name'),
        address: t('address'),
        siret: t('siret'),
        siteName: t('siteName'),
        siteAddress: t('siteAddress')
    }
}

export const formSubscriptionVerifierIntl = (): IFormSubscriptionVerifier => {
    const t = useTranslations('layout.form.subscriptionVerifier')
    return {
        title: t('title'),
        description: t('description'),
        name: t('name'),
        address: t('address'),
        siret: t('siret'),
        approval: t('approval')
    }
}

export const layoutButtonIntl = (): ILayoutButton => {
    const t = useTranslations('layout.button')
    return {
        validate: t('validate'),
        subscribe: t('subscribe'),
        save: t('save'),
        cancel: t('cancel'),
    }
}

export const layoutEventLogIntl = (): ILayoutEventLog => {
    const t = useTranslations('layout.eventLog')
    return {
        linkTitle: t('linkTitle'),
        blockTitle: t('blockTitle'),
        title: t('title'),
        smartContractAddress: t('smartContractAddress'),
        blockHash: t('blockHash'),
        transactionHash: t('transactionHash'),
        blockNumber: t('blockNumber'),
        publicKeyAddress: t('publicKeyAddress'),
    }
}