import Image from "next/image";
export const Heros =()=>{
    return(
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px]
                sm:h-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                     src="./reading.svg"
                     fill
                     className="object-contain"
                     alt="reading"
                    />

                </div>
                <div className="relative w-[300px] h-[300px] sm:w-[350px]
                sm:h-[350px] md:h-[400px] md:w-[400px] hidden md:block">
                    <Image
                    src="./thinking2.svg"
                    fill
                    className="object-contain"
                    alt="thinking2"
                    />


                </div>

            </div>
            
        </div>


    );
}