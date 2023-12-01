import { useTranslations } from "next-intl"

export interface ICreateSiteForm {
    title: string
    addSiteTitle: string
    siteName: string
    siteAddressName: string
}

export const createSiteFormIntl = (): ICreateSiteForm => {
    const t = useTranslations('layout.form.createSite')

    return {
        title: t('title'),
        addSiteTitle: t('addSiteTitle'),
        siteName: t('siteName'),
        siteAddressName: t('siteAddressName'),
    }
}
