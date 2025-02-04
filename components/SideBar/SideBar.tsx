import { motion } from "motion/react";
import { useState } from "react";
import { PiTableDuotone } from "react-icons/pi";
import { CgBoard } from "react-icons/cg";
import { VscIssueDraft } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { RiArrowRightWideFill , RiArrowLeftWideFill } from "react-icons/ri";

const sideBarNameSpaces = {
    title: "Alpha",
    description: "Business Project"
};

export default function SideBar(props) { 


    return (
        <div className="h-full max-2xl:h-auto">
                <motion.div layout 
                className={props.isDropDown ? "lg:w-[300px] md:w-[250px] sm:w-[150px] max-sm:w-[100px] sticky h-full m-0 p-0" : "sticky lg:w-[100px] md:w-[75px] sm:w-[50px] max-sm:w-[25px] h-full m-0 p-0"}
                >
                    <div className="bg-gray-100 h-full w-full">
                        <motion.div className={props.isDropDown ? "flex" : "flex justify-center"}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        >
                            <div className="flex p-3 justify-center">
                                <div className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-6 sm:h-6 max-sm:w-5 max-sm:h-5 rounded-full flex justify-center">
                                    <img src="https://static.cdnlogo.com/logos/j/41/jira.svg" className="w-full h-full"/>
                                </div>
                                {props.isDropDown && (
                                    <motion.div layout 
                                        className="flex flex-col justify-around ml-3 max-sm:ml-2"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.125 }}
                                    >
                                        <span className="lg:text-base md:text-sm sm:text-xs max-sm:text-[10px] font-medium drop-shadow-xl">{sideBarNameSpaces.title}</span>
                                        <span className="lg:text-sm md:text-xs sm:text-[9px] max-sm:text-[8px] text-gray-400 line-clamp-1">{sideBarNameSpaces.description}</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                        {props.isDropDown && (
                        <motion.div className="lg:mt-5 md:mt-4 sm:mt-3 max-sm:mt-2 lg:text-base md:text-sm sm:text-xs max-sm:text-[9px]"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
                            <ul>
                                <li className="flex gap-2 items-center max-lg:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded">
                                    <PiTableDuotone className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/> 
                                    <span className="text-gray-800 drop-shadow">Summary</span>
                                </li>
                                <li className="flex gap-2 items-center max-lg:p-1 max-sm:m-1 p-3 bg-gray-200 m-3 rounded cursor-pointer">
                                    <CgBoard className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-blue-500"/> 
                                    <span className="text-blue-500 drop-shadow">Board</span>
                                </li>
                                <li className="flex gap-2 items-center max-lg:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded">
                                    <VscIssueDraft className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/> 
                                    <span className="text-gray-800 drop-shadow">Issues</span>
                                </li>
                                <li className="flex gap-2 items-center max-lg:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded">
                                    <TbReport className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/> 
                                    <span className="text-gray-800 drop-shadow">Reports</span>
                                </li>
                                <li className="flex gap-2 items-center max-lg:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded">
                                    <IoIosSettings className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/> 
                                    <span className="text-gray-800 drop-shadow line-clamp-1">Project settings</span>
                                </li>
                            </ul>
                        </motion.div>
                        )}
                        {!props.isDropDown && (
                            <motion.div className="lg:mt-5 md:mt-4 sm:mt-3 max-sm:mt-2 lg:text-base md:text-sm sm:text-xs max-sm:text-[9px]"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                            >
                                <ul>
                                    <li className="flex gap-2 items-center justify-center max-sm:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded"><PiTableDuotone className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/></li>
                                    <li className="flex gap-2 items-center justify-center max-sm:p-1 max-sm:m-1 p-3 bg-gray-200 m-3 rounded cursor-pointer"><CgBoard className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-blue-500"/></li>
                                    <li className="flex gap-2 items-center justify-center max-sm:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded"><VscIssueDraft className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/></li>
                                    <li className="flex gap-2 items-center justify-center max-sm:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded"><TbReport className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/></li>
                                    <li className="flex gap-2 items-center justify-center max-sm:p-1 max-sm:m-1 p-3 m-3 cursor-pointer hover:bg-gray-200 transition-all rounded"><IoIosSettings className="lg:size-7 md:size-6 sm:size-5 max-sm:size-4 text-gray-600"/></li>
                                </ul>
                            </motion.div>
                        )}
                        <div className="flex w-full justify-center">
                            {props.isDropDown && (
                                <div className="absolute bottom-2 flex items-center cursor-pointer hover:scale-110 transition-all" onClick={() => props.setIsDropDown(false)}>
                                    <RiArrowLeftWideFill className="size-8"/>
                                    <span className="drop-shadow">Hide</span>
                                </div>
                            )}
                            {!props.isDropDown && (
                                <div className="absolute bottom-2 flex items-center cursor-pointer hover:scale-110 transition-all" onClick={() => props.setIsDropDown(true)}>
                                    <RiArrowRightWideFill className="size-8"/>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
        </div>
    )
}