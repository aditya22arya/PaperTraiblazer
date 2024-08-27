"use client"

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Heading =()=>{
    const {isAuthenticated,isLoading}=useConvexAuth();
    return(
    <>
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Blaze Your Path to Perfect Notes<span className="
                underline">
                    PaperTrailblazer
                </span>
            </h1>
            <h3 className="text-based sm:text-xl md:text-2xl" >
               PaperTraiblazer is the connected workspace where <br/>better, faster work happens.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                <Spinner size="lg"/>
                </div>
            )}
            {isAuthenticated && !isLoading &&(
            <Button asChild>
                <Link href="./documents">
            Enter PaperTrailblazer<ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            
            </Button>)}

            {!isAuthenticated &&!isLoading &&(
                <SignInButton mode="modal"><Button>
                  Get PaperTrailblazer<ArrowRight className="h-4 w-4 ml-2"/></Button>
                </SignInButton>
            )}
        </div>
    </>

    );

}