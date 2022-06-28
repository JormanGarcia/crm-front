import React, { useState } from "react";

export function useFileUpload(drop: React.RefObject<HTMLLabelElement>, onAddFile: (files: FileList) => void): [boolean] {

    const [isOver, setIsOver] = useState(false)
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsOver(true)
        e.stopPropagation();
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsOver(false)
        e.stopPropagation();
    };


    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) {
            onAddFile(e.dataTransfer.files);
        }
        setIsOver(false)

        e.stopPropagation();
    };

    React.useEffect(() => {
        if (!drop.current) return;

        drop.current.addEventListener("dragover", handleDragOver);
        drop.current.addEventListener("dragleave", handleDragLeave);
        drop.current.addEventListener("drop", handleDrop);

        return () => {
            if (!drop.current) return;
            drop.current.removeEventListener("dragover", handleDragOver);
            drop.current.addEventListener("dragleave", handleDragLeave);
            drop.current.removeEventListener("drop", handleDrop);
        };
    }, []);

    return [isOver]


}