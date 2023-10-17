export interface IButtonLink {
    title: string
    href: string | object
    minWidth?: string
}

export interface ISubmitButtonLayout {
    loading: boolean
    spinnerSize: string
    buttonName: string
}

export interface IFormInputLayout {
    id: string
    label: string
    placeholder: string
    autoComplete: string
}

export interface IEventFieldLayout {
    title: string
    value: string | `0x${string}` | null | undefined
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