import { useAlertDialogStore } from "store/alert-dialog.store"

interface Props {
    title?: string;
    description?: string;
    onConfirm?: () => void;
}

export function useAlertDialog(props: Props) {
    const isOpen = useAlertDialogStore(state => state.open)
    const description = useAlertDialogStore(state => state.description)
    const title = useAlertDialogStore(state => state.title)
    const setAlertDialog = useAlertDialogStore(state => state.setAlertDialog)
    const onConfirm = useAlertDialogStore(state => state.onConfirm)

    function open(openProps?: Props) {
        setAlertDialog({
            open: true,
            ...props,
            ...openProps,
        })
    }

    function close() {
        setAlertDialog({
            open: false,
            ...props
        })
    }

    function toggle() {
        setAlertDialog({
            open: !isOpen,
            ...props
        })
    }



    return { isOpen, description, title, open, close, toggle, onConfirm }
}