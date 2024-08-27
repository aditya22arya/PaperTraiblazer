"use client"
import {useState} from "react"
import {useParams, useRouter} from "next/navigation";
import { Doc, Id } from "@/convex/_generated/dataModel"
import{useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Item} from "./items"
import { cn } from "@/lib/utils";
import {FileIcon} from "lucide-react"

interface documentListProps{
    parentDocumentId?:Id<"documents">;
    level?:number;
    data?:Doc<"documents">[];
}

export const DocumentList=({
    parentDocumentId,
    level= 0
}:documentListProps)=>{
    const params =useParams();
    const router =useRouter();
    const [expanded,setExpanded]=useState<Record<string,boolean>>({});

    const OnExpand =(documentId:string)=>{
        setExpanded(prevExpanded =>({
            ...prevExpanded,
            [documentId]:! prevExpanded[documentId]
        }))
    }
    const documents =useQuery(api.documents.getSidebar,{
        parentDocument :parentDocumentId
    });
    const onRedirect= (documentId:string)=>{
        router.push(`/documnets/${documentId}`)
    };

    if(documents === undefined){
        return(
            <>
            <Item.Skeleton level ={level}/>
            {level === 0 && (
                <>
                <Item.Skeleton level ={level}/>
                
                </>

            )}
            </>
        )
    }
    return(
        <>
        <p style ={{
            paddingLeft :level ?`${(level * 12)+25}px`:undefined  
        }}
        className={cn("hidden text-sm font-medium text-muted-foreground/80",
            expanded && "last:block",
            level === 0 && "hidden"
        )}
        >
            No Pages Inside



        </p>
        {documents.map((document)=>(
            <div key = {document._id}>
                <Item
                id ={document._id}
                onclick={()=>onRedirect (document._id)}
                label ={document.title}
                icon ={FileIcon}
                documentIcon ={document.icon}
                active={params.documetsId === document._id }
                level={level}
                onExpand={()=>OnExpand(document._id)}
                expanded  ={expanded[document._id ]}
                />
                {
                    expanded[document._id]&&(
                        <DocumentList
                        parentDocumentId={document._id}
                        level ={level+1}
                        />
                    )
                }
            </div>
        ))}
        </>
    );
};