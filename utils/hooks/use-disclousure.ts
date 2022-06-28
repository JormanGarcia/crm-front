import { useState } from "react"

function useDisclousure(initial = false) {
    const [isOpen, setOpen] = useState(initial)

    function close() {
        setOpen(false)
    }

    function open() {
        setOpen(true)
    }

    function toggle() {
        setOpen(!isOpen)
    }

    return { isOpen, close, open, toggle }
}

export default useDisclousure