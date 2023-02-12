import React from "react";
import { Info } from "./info";

interface NoAnswersProps {
    msg: string
}
  
export function NoAnswers({ msg }: NoAnswersProps) {
    return (
        <div className="border border-main p-[30px] flex flex-col items-center">
            <Info msg={msg} />
        </div>
    )
}