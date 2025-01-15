import { Column } from "@/types/columnInterface";
import { TaskState } from "@/types/taskInterface";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import TaskBar from "./TaskBar";
import { Dialog, DialogTrigger , DialogContent, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { addTask } from "@/redux/features/taskSlice";
import { IoClose } from "react-icons/io5";




interface Props {
    column: Column;
    tasks: TaskState[];
}

export default function ColumnContainer({
    column,
    tasks
}: Props) {


    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id);
    }, [tasks]);

    const userRedux = useSelector((store: RootState) => store.user);
    const allTasks = useSelector((store: RootState) => store.task);
    const avatarRedux = useSelector((store: RootState) => store.avatar);

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [dialogOpen , setDialogOpen] = useState(false);

    const [wtaskNo, setWTaskNo] = useState("");
    const [wtitle, setWTitle] = useState("");
    const [wdesc, setWDesc] = useState("");
    const [wuser, setWUser] = useState<number>(0);
    const [wpoint, setWPoint] = useState<number>(0);
    const [wstart, setWStart] = useState(new Date());
    const [wend, setWEnd] = useState(new Date());

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const { toast } = useToast();

    const dispatch = useDispatch();

    function createTask() {
        if(wuser != 0 && wtaskNo.length != 0 && wtitle.length != 0 
            && wdesc.length != 0 && wpoint != 0 ){
            const createTask: TaskState = {
                id: allTasks.length+1 ,
                title: wtitle,
                description: wdesc,
                status: "open",
                userId: wuser,
                taskNo: wtaskNo,
                storyPoint: wpoint,
                startDate: wstart,
                endDate: wend,
            }
            dispatch(addTask(createTask));
            setDialogOpen(false);
            toast({
                variant: "success",
                title: "Task Created",
                description: "Task No : "+wtaskNo,
              })
        }
        else {
            toast({
                variant: "destructive",
                title: "Please fill in the blank fields.",
                description: "Try Again.",
              })
        }
    }

    function getTaskStoryPoint() {
        let sum = 0;
        const points = allTasks.filter((task) => task.status === column.id).forEach((obj) => sum += obj.storyPoint);
        return sum;
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className=" bg-[#f4f5f7] max-lg:basis-[90%] 2xl:basis-[21%] xl:basis-[29%] lg:basis-[43%] h-[500px] max-h-[500px] rounded-md flex flex-col m-5">
            <div
                {...attributes}
                {...listeners}
                className=" bg-[#f4f5f7] text-md h-[60px] cursor-grab rounded-b-none p-3 font-bold border-columnBackgroundColor flex items-center justify-between">
                <div className="flex gap-2 ml-1 rounded justify-between w-full">
                    <span className="text-[#959EAE] font-normal drop-shadow-sm max-lg:text-sm">
                        {column.title}
                    </span>
                    <div className="bg-gray-400 w-8 h-8 rounded-full flex justify-center items-center text-white transition-all">
                        <span className="text-sm drop-shadow-md">
                            {getTaskStoryPoint()}
                        </span>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
                <SortableContext items={tasksIds}>
                    {tasks.map((task) => (
                        <TaskBar
                            key={task.id}
                            task={task}
                        />
                    ))}
                </SortableContext>
            </div>
            {column.id === "open" ? 
            <Dialog open={dialogOpen}>
                <DialogTrigger>
                    <div
                        className="flex gap-2 items-center text-gray-400 drop-shadow-sm text-base p-2 transition-all hover:text-black" onClick={() => setDialogOpen(true)}>
                        + Add task
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>+ Add Task</DialogTitle>
                    <DialogDescription>
                        Fill in the task information. Click save when you're done.
                    </DialogDescription>
                    <div className="absolute right-4 top-4">
                        <IoClose  className="size-6 text-black cursor-pointer transition-all hover:scale-110" onClick={() => setDialogOpen(false)}/>
                    </div>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                            Task No
                            </Label>
                            <Input placeholder="Please fill in" className="col-span-3" onChange={(e) => setWTaskNo(e.target.value)}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Title
                            </Label>
                            <Input placeholder="Please fill in" className="col-span-3" onChange={(e) => setWTitle(e.target.value)}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Description
                            </Label>
                            <Input placeholder="Please fill in" className="col-span-3" onChange={(e) => setWDesc(e.target.value)}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Assign
                            </Label>

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
                                                setWUser(user.id)
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
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Story Point
                            </Label>
                            <Input placeholder="Please fill in" className="col-span-3" onChange={(e) => setWPoint(Number(e.target.value))}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Start Date
                            </Label>
                            <DatePicker className="border p-1 rounded-md" selected={wstart}  onChange={(date) => date && setWStart(date)} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                End Date
                            </Label>
                            <DatePicker className="border p-1" selected={wend}  onChange={(date) => date && setWEnd(date)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="hover:bg-gray-300 transition-all" onClick={() => createTask()}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            : ""}
        </div>
    )
}