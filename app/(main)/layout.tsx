"use client"
import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/Navigation";
import { SearchCommand } from "@/components/search-command";
const MainLayout = ({
    children
}: {
    children:React.ReactNode;
}) => {
    const{isAuthenticated,isLoading}=useConvexAuth();
    if(isLoading){
        return(
            <div className=" h-svh flex items-center justify-center bg-white ">
                <Spinner size="lg" />
            </div>
        )
    }
    if(!isAuthenticated){
        return redirect ("/");
    }
    return ( 
        <div className="h-svh flex">
            <Navigation/>
            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand/>
                {children}
            </main>
        </div> 
    );
}


 
export default MainLayout;