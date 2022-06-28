import create from 'zustand'

export const initialAlertDialogValue = {
    open: false,
    title: "Undefined Title",
    description: "Lorem Ipsum",
    onConfirm: null as (null | (() => void))
}

type setInputType = Partial<typeof initialAlertDialogValue>

export const useAlertDialogStore = create<typeof initialAlertDialogValue & { setAlertDialog: (input: setInputType) => void }>((set) => ({
    ...initialAlertDialogValue,
    setAlertDialog: (input: setInputType) => set(state => ({ ...input })),
}))