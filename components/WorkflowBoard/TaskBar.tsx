import { RootState } from "@/redux/store";
import { TaskState } from "@/types/taskInterface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDispatch, useSelector } from "react-redux";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { IoTimeOutline } from "react-icons/io5";
  import { IoMdTimer } from "react-icons/io";
  import { TbUserEdit } from "react-icons/tb";
  import { RiEdit2Line } from "react-icons/ri";
import { useState } from "react";
import { Input } from "../ui/input";
import { motion } from "motion/react";
import { MdExitToApp } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { useToast } from "../ui/use-toast";
import { updateTask } from "@/redux/features/taskSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { TbEditCircle } from "react-icons/tb";
import { MdOutlineNextWeek } from "react-icons/md";




interface Props {
    task: TaskState;
}

export default function TaskBar({
    task,
}: Props) {

    const userRedux = useSelector((store: RootState) => store.user);
    const avatarRedux = useSelector((store: RootState) => store.avatar);

    const [descEditMode, setDescEditMode] = useState(false);
    const [userEditMode, setUserEditMode] = useState(false);
    const [pointEditMode, setPointEditMode] = useState(false);
    const [approveDescW , setApproveDescW] = useState(task.description);
    const [approveUserW , setApproveUserW] = useState<number>(0);
    const [approvePointW , setApprovePointW] = useState<number>(task.storyPoint);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const defaultBgColor = [
        {
            id:1,
            color: "bg-gray-500",
            textcolor: "text-gray-500",
            status: "open"
        },
        {
            id:2,
            color: "bg-orange-300",
            textcolor: "text-orange-500",
            status: "progress"
        },
        {
            id:3,
            color: "bg-blue-500",
            textcolor: "text-blue-500",
            status: "review"
        },
        {
            id:4,
            color: "bg-green-500",
            textcolor: "text-green-500",
            status: "done"
        }
    ];

    function returnBgColor(status) {
        return defaultBgColor.filter((res) => res.status === status).map((str) => str.color);
    }

    function returnNextBgColor(status) {
        if(status != "done") {
            const bgColorNum = defaultBgColor.filter((res) => res.status === status).map((str) => str.id);
            return defaultBgColor[bgColorNum[0]].textcolor;
        }
        else {
            return "";
        }
    }

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition
    } = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const { toast } = useToast();

    const dispatch = useDispatch();


    function approveStatus(status) {
        const statusIndex = defaultBgColor.filter((res) => res.status === status).map((str) => str.id);
            const approveTask: TaskState = {
                id: task.id ,
                title: task.title,
                description: task.description,
                status: defaultBgColor[statusIndex[0]].status,
                userId: task.userId,
                taskNo: task.taskNo,
                storyPoint: task.storyPoint,
                startDate: task.startDate,
                endDate: task.endDate,
            }
            dispatch(updateTask(approveTask));
            toast({
                variant: "success",
                title: "Status field was changed successfully",
                description: "",
            })
    }

    function approveDesc() {
        const approveTask: TaskState = {
            id: task.id ,
            title: task.title,
            description: approveDescW,
            status: task.status,
            userId: task.userId,
            taskNo: task.taskNo,
            storyPoint: task.storyPoint,
            startDate: task.startDate,
            endDate: task.endDate,
        }
        dispatch(updateTask(approveTask));
        setDescEditMode(false)
        toast({
            variant: "success",
            title: "Description field was changed successfully",
            description: "",
          })
    }

    function approveUser() {
        if(approveUserW === 0) {
            toast({
                variant: "destructive",
                title: "Please Assign User.",
                description: "",
              })
        }
        else if(approveUserW != task.userId) {
            const approveTask: TaskState = {
                id: task.id ,
                title: task.title,
                description: task.description,
                status: task.status,
                userId: approveUserW,
                taskNo: task.taskNo,
                storyPoint: task.storyPoint,
                startDate: task.startDate,
                endDate: task.endDate,
            }
            dispatch(updateTask(approveTask));
            setUserEditMode(false);
            toast({
                variant: "success",
                title: "Task user changed successfully",
                description: "",
            })
        }
        else {
            toast({
                variant: "destructive",
                title: "Please Assign Another User.",
                description: "",
              })
        }
    }

    function approveStoryPoint() {
        const approveTask: TaskState = {
            id: task.id ,
            title: task.title,
            description: task.description,
            status: task.status,
            userId: task.userId,
            taskNo: task.taskNo,
            storyPoint: approvePointW,
            startDate: task.startDate,
            endDate: task.endDate,
        }
        dispatch(updateTask(approveTask));
        setPointEditMode(false);
        toast({
            variant: "success",
            title: "Task user changed successfully",
            description: "",
        })
    }


    return (
        <Sheet>
            <SheetTrigger>
                <div ref={setNodeRef} style={style} {...attributes} {...listeners}
                className="bg-mainBackgroundColor border p-2.5 h-[80px] items-center flex flex-col justify-between rounded-sm hover:ring-2 hover:ring-inset hover:ring-blue-300 cursor-grab relative task">
                        <span className="overflow-y-auto overflow-x-hidden whitespace-pre-wrap w-full line-clamp-1 text-sm text-start max-sm:text-xs">
                                {task.title}
                        </span>
                        <div className="flex justify-between w-full">
                            <div className={"text-white rounded-md "+returnBgColor(task.status)}>
                                <span className="text-xs p-2 max-sm:p-1 line-clamp-1 max-sm:text-[9px]">{task.taskNo}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-5 h-5 bg-gray-200 flex items-center justify-center rounded-full max-sm:w-4 max-sm:h-4">
                                    <span className="drop-shadow-md text-xs text-black max-sm:text-[9px]">{task.storyPoint}</span>
                                </div>
                                <span className="text-xs line-clamp-1 max-sm:text-[9px]">{userRedux[task.userId-1].username}</span>
                                <div className="w-7 h-7 max-sm:w-5 max-sm:h-5 bg-gray-200 rounded-full flex justify-center items-center">
                                    <img src={avatarRedux.find((res) => res.id === userRedux[task.userId-1].avatar)?.avatar} className="w-6 h-6 max-sm:w-4 max-sm:h-4"/>
                                </div>
                            </div>
                        </div>
                </div>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                <SheetTitle>{task.taskNo}</SheetTitle>
                <SheetDescription>
                    {!descEditMode ? 
                    <motion.div layout className="flex gap-2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.125 }}
                    >
                    {task.description} 
                    <RiEdit2Line className="size-5 text-gray-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => setDescEditMode(true)}/> 
                    </motion.div> 
                    : 
                    <motion.div layout className="flex gap-2 items-center"
                        initial={{ width: '0%', x: -50 }}
                        animate={{ width: '100%', x: 0 }}
                        transition={{ delay: 0.125 }}
                    >
                        <Input value={approveDescW} className="w-3/5 shadow-md" onChange={(e) => setApproveDescW(e.target.value)}/>
                        <FcApproval className="size-6 text-green-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => approveDesc()}/>
                        <MdExitToApp className="size-6 text-red-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => setDescEditMode(false)}/>
                    </motion.div>
                    }
                </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                    <div className="mb-2 flex gap-3 items-center">
                        <div className={"text-white rounded-md w-auto inline-block "+returnBgColor(task.status)}>
                            <span className="text-xs p-2">{task.status[0].toUpperCase() + task.status.slice(1)}</span>
                        </div>
                        <div>
                           {task.status != "done" && <MdOutlineNextWeek title="Advance Task" className={"size-5 hover:scale-125 transition-all cursor-pointer "+returnNextBgColor(task.status)}
                            onClick={() => approveStatus(task.status)}
                           /> }
                        </div>
                    </div>
                    <div className="mt-4 mb-4 flex items-center gap-3">
                        {!pointEditMode ? 
                        <motion.div layout
                        initial={{ width: '0%', x: -50 }}
                        animate={{ width: '100%', x: 0 }}
                        transition={{ delay: 0.125 }}
                        className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full shadow-md shadow-black">
                                <span className="drop-shadow-md text-sm text-black">{task.storyPoint}</span>
                            </div>
                            <div>
                                <TbEditCircle className="size-6 text-gray-600 drop-shadow cursor-pointer transition-all hover:scale-125" onClick={() => setPointEditMode(true)}/>
                            </div>
                        </motion.div>
                        :
                        <motion.div layout className="flex gap-2 items-center"
                        initial={{ width: '0%', x: -50 }}
                        animate={{ width: '100%', x: 0 }}
                        transition={{ delay: 0.125 }}
                        >
                            <Input value={approvePointW} className="w-10 h-10 rounded-full bg-gray-200 text-black drop-shadow-md focus:ring-offset-0 focus:ring-0 shadow-md shadow-black" onChange={(e) => setApprovePointW(Number(e.target.value))} />
                            <FcApproval className="size-6 text-green-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => approveStoryPoint()}/>
                            <MdExitToApp className="size-6 text-red-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => setPointEditMode(false)}/>
                        </motion.div>
                        }
                    </div>
                    <div className="mt-4 mb-4 flex justify-between items-end">
                        <div className="flex flex-col ml-1 text-sm gap-3 drop-shadow-md text-gray-800">
                            <span className="flex gap-1 items-center drop-shadow-xl"><IoTimeOutline  className="size-8 text-green-300"/> {task.startDate.toDateString()} </span>
                            <span className="flex gap-1 items-center drop-shadow-md"><IoMdTimer className="size-8 text-red-300"/> {task.endDate.toDateString()} </span>
                        </div>
                        <div>
                            <div className="ml-10 flex gap-2 items-center">
                                {!userEditMode ? 
                                <motion.div layout className="flex items-center gap-2"
                                initial={{ width: '0%', x: -50 }}
                                animate={{ width: '100%', x: 0 }}
                                transition={{ delay: 0.125 }}
                                >
                                    <div className="mr-1">
                                        <TbUserEdit className="size-5 text-gray-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => setUserEditMode(true)}/>
                                    </div>
                                    <div className="w-7 h-7 bg-gray-200 rounded-full flex justify-center items-center">
                                        <img src={avatarRedux.find((res) => res.id === userRedux[task.userId-1].avatar)?.avatar} className="w-6 h-6"/>
                                    </div>
                                    <span className="drop-shadow-md text-sm text-gray-900">{userRedux[task.userId-1].username}</span>
                                    <span className="text-[10px] text-gray-500">opened on Oct 4, 2025 </span>
                                </motion.div>
                                :
                                <motion.div className="flex gap-2 items-center"
                                initial={{ width: '0%', x: -50 }}
                                animate={{ width: '100%', x: 0 }}
                                transition={{ delay: 0.125 }}
                                >
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                                                <div className="flex gap-2 items-center">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                                        {value && <img src={avatarRedux.find((res) => res.id === userRedux.find((user) => user.username === value)?.avatar)?.avatar} className="w-5 h-5"/>}
                                                    </div>
                                                    <span>{value ? userRedux.find((user) => user.username === value)?.username : "Select user"}</span>
                                                </div>
                                            <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                            <CommandInput placeholder="Search user..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup>
                                                {userRedux.map((user) => (
                                                    <CommandItem key={user.id} value={user.username} onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                        setApproveUserW(user.id)
                                                    }}>
                                                        <div className="flex gap-2 items-center">
                                                            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                                                                <img src={avatarRedux.find((res) => res.id === user.avatar)?.avatar} className="w-5 h-5"/>
                                                            </div>
                                                            <span>{user.username}</span>
                                                        </div>
                                                    <Check className={cn( "ml-auto", value === user.username ? "opacity-100" : "opacity-0")} />
                                                    </CommandItem>
                                                ))}
                                                </CommandGroup>
                                            </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FcApproval className="size-6 text-green-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => approveUser()}/>
                                    <MdExitToApp className="size-6 text-red-400 drop-shadow-lg cursor-pointer hover:scale-125 transition-all" onClick={() => setUserEditMode(false)}/>
                                </motion.div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <SheetFooter>
                <SheetClose asChild>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}