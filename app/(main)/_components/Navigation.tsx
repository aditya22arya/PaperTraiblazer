"use client"
import { TrashBox } from "./trash-box"
import { ChevronsLeft, MenuIcon,Plus,PlusCircle, Search, Settings, Trash } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { ElementRef} from "react"
import { usePathname } from "next/navigation"
import { useMediaQuery } from "usehooks-ts"
import { cn } from "@/lib/utils"
import { UserItem } from "./user-items"
import { useMutation } from "convex/react"
import {api} from "@/convex/_generated/api"
import {Item} from "./items"
import { toast } from "sonner"
import { DocumentList } from "./DocumentList"
import { Popover, PopoverTrigger,PopoverContent } from "@/components/ui/popover"
import { useSearch } from "@/hooks/use-search"
import { useSetting } from "@/hooks/use-settings"

export const Navigation=()=>{
    const search = useSearch();
    const setting=useSetting();
    const pathname=usePathname ();//it is used when the user is in the mobile and clicks on a certain document then the side bar will be automaticly collapsed 
    const isMobile= useMediaQuery("(max-width: 768px)");
    // const documents  =useQuery(api.documents.get);
    const create = useMutation(api.documents.create)

    const isResigningRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting,setIsResetting]= useState(false);
    const [isCollapsed,setIsCollapsed]=useState(isMobile);
    useEffect(()=>{
        if(isMobile){
            collapse();
        }
        else{
            resetWidth();
        }
    },[isMobile]);
    useEffect(()=>{
      if(isMobile) {
        collapse();

      } 
    },[pathname,isMobile])

    const handleMouseDown=(
        event: React.MouseEvent<HTMLDivElement,MouseEvent>

    )=>{
    event.preventDefault();
    event.stopPropagation();
    isResigningRef.current=true;
    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup",handleMouseUp);
    };
    const handleMouseMove=(event:MouseEvent)=>{
        if(!isResigningRef.current) return;
        let  newWidth= event.clientX;
        if(newWidth<240) newWidth=240;
        if(newWidth>480) newWidth=480;
        if(sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width =`${newWidth}px`;
            navbarRef.current.style.setProperty("left",`${newWidth}px`);
            navbarRef.current.style.setProperty("width",`calc(100%-${newWidth}px)`)
        }

    }
    const handleMouseUp=()=>
    {
        isResigningRef.current=false;
        document.removeEventListener("mousemove",handleMouseMove);
        document.removeEventListener("mouseup",handleMouseUp);

    }
    const resetWidth=()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setIsResetting(true)
            sidebarRef.current.style.width =isMobile?"100%":"240px";
            navbarRef.current.style.setProperty("width",
            isMobile?"0":"calc(100%-240px)");
            navbarRef.current.style.setProperty(
                "left",
                isMobile?"100%":"240px"
            );
            setTimeout(()=>setIsResetting(false),500)
        }
    }
    const collapse=()=>{
        if(sidebarRef.current && navbarRef
            .current){
                setIsCollapsed(true);
                setIsResetting(true);
                sidebarRef.current.style.width="0";
                navbarRef.current.style.setProperty("width","100%");
                navbarRef.current.style.setProperty("left","0");
                setTimeout(()=>setIsResetting(false),500);
            }
        
    }
    const handleCreate=()=>{
        const promise =create({title:"Untitled"});
        toast .promise(promise,{
            loading:"Creating a new node....",
            success:"New node is created",
            error:"Failed to create a new node",
        });
    };

    return(
        <>
        <aside 
        ref={sidebarRef}
        className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
         isResetting && "transition-all ease-in-out duration-500",
         isMobile  && "w-0"
        )
        }>
        <div 
        role="button"
        className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity -100"
        )}>
            <ChevronsLeft onClick={collapse} className="h-6 w-6"/>
        </div>
        <div>
            <UserItem/>
            <Item label="search"
            icon ={Search}
            isSearch
            onclick={search.onOpen}/>
             <Item label="Setting"
            icon ={Settings}
            onclick={setting.onOpen}/>
            <Item 
            onclick={handleCreate} 
            label="New Page" 
            icon={PlusCircle}
            />

        </div>
        <div onClick={(e)=>e.stopPropagation()} className="mt-4">
          <DocumentList/>
          <Item
          onclick={handleCreate}
          icon={Plus}
          label="Add a page"/>
          <Popover>
            <PopoverTrigger className="w-full mt-4">
                <Item label="Trash" icon={Trash}/>
            </PopoverTrigger>
            <PopoverContent
            className="p-0 w-72"
            side={isMobile?"bottom":"right"}>
                <TrashBox/>
            </PopoverContent>
          </Popover>
          

        </div>
        <div
        onMouseDown={handleMouseDown}
        onClick={()=>{}}
        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"/>
        </aside>
        <div
         ref={navbarRef}
         className={cn("absolute top-0 z-[999999] left-60 w-[calc(100%-240px)]",
            isResetting &&"transition-all ease-in-out duration-500",
            isMobile && "left-0 w-full"
         )}>
            <nav className="bg-transparent px-3 py-2 w-full">
            {isCollapsed && <MenuIcon   onClick={resetWidth} className="h-6 w-6 text-muted-foreground"/>}
            </nav>
        </div>
        </>
    )
    
}

