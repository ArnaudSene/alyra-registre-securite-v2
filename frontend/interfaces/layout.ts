export interface IButtonLink {
    title: string
    href: string | object
    minWidth?: string
}

export interface ISubmitButtonLayout {
    loading: boolean
    spinnerSize: string
    buttonName: string
    onClick?: () => void
}

export interface IFormLayout {
    title: string
    onModalClose: () => void
    onSubmit: (e: React.FormEvent) => void
}


export interface IFormInputLayout {
    id: string
    label: string
    placeholder: string
    autoComplete: string
}
export interface IFormInputLayout2 {
    id: string
    label: string
    placeholder: string
    autoComplete: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface IFormSelectData {
    id: string
    value: string
    label: string
}

export interface IFormSelectLayout {
    id: string
    label?: string
    defaultSelected: {value: string, label: string}
    selected: {value: string, label: string}
    data: IFormSelectData[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    inline?: boolean
}

export interface IEventFieldLayout {
    title: string
    value: string | `0x${string}` | null | undefined
    border?: boolean
}

export interface IEventLog {
    blockTitle: string
    blockData: IEventFieldLayout[],
    title: string
    data: IEventFieldLayout[]
}


export interface IEventLogLayout {
    title: string
    description: string
    events: IEventLog | undefined
}

export interface IhandleEventsResponse {
    eventLog: IEventLog | undefined
    ok: boolean
}

export interface ILayoutEventLogMapping {
    addressAttribute: string
    addressValue: `0x${string}`
}