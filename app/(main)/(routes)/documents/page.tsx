"use client"
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import{api} from"@/convex/_generated/api"
import { toast } from "sonner";

const DocumentPage = () => {
    const{user}=useUser();
    const create=useMutation(api.documents.create)

    const onCreate= ()=>{
        const promise= create({title:"untitled"});
        toast.promise(promise,{
            loading:"Creating a new note...",
            success:"New node created!",
            error:"Failed to create a new note"
        });

    }
    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image src="/learning_light.svg" 
            height="350" 
            width="350" 
            alt="Empty"
            className="dark:hidden"
            />
            <Image src="/learning_dark.svg" 
            height="350"
            width="350"
            alt="Empty"
            className="hidden dark:block"/>
            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s <span>Incubator</span>
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a note 
            </Button>
        </div>
     );
}
 
export default DocumentPage;