"use client"
import {useEffect,useState} from "react";
import {SettingModal} from "@/components/modals/setting-modal"
export const ModalProvidor=()=>{
    const[isMounted,setisMounted]= useState(false);

    useEffect(()=>{
        setisMounted(true);

    },[]);

    if(!isMounted){
        return null;
    }

    return(
        <>
        <SettingModal/>
        </>
    )
}
