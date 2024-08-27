"use client"
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton,UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
export const Navbar=()=>{
    const scrolled =useScrollTop();
    const {isAuthenticated,isLoading}=useConvexAuth();
    return(
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6",scrolled&&"border-b shadow-sm")}>
            <Logo/>
            <div className ="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-3">
                {isLoading && (<p>
                    <Spinner/>
                </p>)}
                {!isAuthenticated && !isLoading &&(
                    <>
                    <SignInButton
                    mode="modal">
                        <Button
                        variant="ghost"
                        size="sm">
                        Log In
                        </Button>
                        </SignInButton>
                        <SignInButton
                    mode="modal">
                        <Button
                        size="sm">
                        Get PaperTrailblazer Free
                        </Button>
                    </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading &&(
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="./documents">
                            Enter PaperTrailblazer
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/"/>
                        
                    </>
                )}
                <ModeToggle/>
            </div>

        </div>


    );
}