"use client"

import {
    AlertDialogHeader,
    AlertDialogFooter, 
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialog
} from "@/components/ui/alert-dialog"
import React from "react";


interface ConfirmModalProps{
    children:React.ReactNode;
    onConfirm:()=>void
}
export const ConfirmModal = ({
    children,
    onConfirm,
}: ConfirmModalProps) => {
    const handleConfirm = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();
        onConfirm();
    };

    return (
        <AlertDialog>
            {children}
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
