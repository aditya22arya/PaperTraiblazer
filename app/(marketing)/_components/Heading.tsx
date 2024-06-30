"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Heading =()=>{
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
            <Button>
            Enter PaperTrailblazer<ArrowRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    </>

    );

}