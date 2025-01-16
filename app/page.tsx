"use client";
import SideBar from "@/components/SideBar/SideBar"; 
import Workflowboard from "@/components/WorkflowBoard/WorkflowBoard";
import { useState } from "react";

export default function Home() {

  const [isDropDown,setIsDropDown] = useState(true);

  return (
    <div className="flex w-full h-full max-2xl:h-auto">
        <SideBar isDropDown={isDropDown} setIsDropDown={setIsDropDown} />
        <Workflowboard />  
    </div>
  );
}
