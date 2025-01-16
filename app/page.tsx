"use client";
import SideBar from "@/components/SideBar/SideBar"; 
import Workflowboard from "@/components/WorkflowBoard/WorkflowBoard";

export default function Home() {
  return (
    <div className="flex w-full h-full max-2xl:h-auto">
        <SideBar />
        <Workflowboard />
    </div>
  );
}
