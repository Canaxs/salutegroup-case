"use client";
import Image from "next/image";
import SideBar from "@/components/SideBar/SideBar"; 
import Workflowboard from "@/components/WorkflowBoard/WorkflowBoard";

export default function Home() {
  return (
    <div className="flex w-full h-full">
        <SideBar />
        <Workflowboard />
    </div>
  );
}
