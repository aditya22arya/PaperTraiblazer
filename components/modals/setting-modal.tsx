"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader

} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useSetting } from "@/hooks/use-settings"
import { ModeToggle } from "@/components/mode-toggle"

export const SettingModal=()=>{
    const settings=useSetting();
    return(
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogHeader className="border-b pb-3">
                <h2 className="text-lg front-medium">
                    My Settings
                </h2>
            </DialogHeader>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <Label>
                        Appearance
                    </Label>
                    <span className="text-[0.8rem] text-muted-foreground">
                        Customize how PaperTraiblaizer looks on your device 
                    </span>
                </div>
                <ModeToggle/>
            </div>
        </Dialog>
    )
}