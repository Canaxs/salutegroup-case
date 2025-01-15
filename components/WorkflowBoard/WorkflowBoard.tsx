import { addUser , setUser } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { userData } from "@/data/UserData";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    UniqueIdentifier,
    DragMoveEvent,
    DragEndEvent,
    DragOverEvent,
  } from "@dnd-kit/core";
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from "@dnd-kit/sortable";
import { TaskState } from "@/types/taskInterface";
import ColumnContainer from "./ColumnContainer";
import { Column } from "@/types/columnInterface";
import { clearTask, updateTask } from "@/redux/features/taskSlice";
import { IdAndStatus } from "@/types/IdAndStatus";
import { TaskData } from "@/data/TaskData";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { IoClose } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UserState } from "@/types/userInterface";
import { useToast } from "../ui/use-toast";

const defaultCols: Column[] = [
    {
      id: "open",
      title: "Open",
    },
    {
      id: "progress",
      title: "In Progress",
    },
    {
      id: "review",
      title: "In Review",
    },
    {
      id: "done",
      title: "Done"
    }
  ];


export default function Workflowboard() {

    const [render, setRender] = useState(false);

    const dispatch = useDispatch();

    const userRedux = useSelector((store: RootState) => store.user);
    const avatarRedux = useSelector((store: RootState) => store.avatar);

    const tasks = useSelector((store: RootState) => store.task);

    const [columns, setColumns] = useState<Column[]>(defaultCols);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<TaskState | null>(null);

    const [dialogOpen , setDialogOpen] = useState(false);

    const { toast } = useToast();

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    const [cAvatar , setCAvatar] = useState<number>(0);
    const [wUser, setWUser] = useState("");


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
              distance: 10,
            },
          })
    );

    useEffect(() => {
        setRender(true)
      }, [])
    
      if (!render) return null

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveTask(null);
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;
        setColumns((columns) => {
          const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
          const overColumnIndex = columns.findIndex((col) => col.id === overId);
          return arrayMove(columns, activeColumnIndex, overColumnIndex);
        });
      }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
          setActiveColumn(event.active.data.current.column);
          return;
        }
        if (event.active.data.current?.type === "Task") {
          setActiveTask(event.active.data.current.task);
          return;
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";
        if (!isActiveATask) return;
        if (isActiveATask && isOverATask) {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);

            if (tasks[activeIndex].status != tasks[overIndex].status) {
                const oneTasks: TaskState = {
                    id: tasks[activeIndex].id,
                    title: tasks[activeIndex].title,
                    description: tasks[activeIndex].description,
                    status: tasks[overIndex].status,
                    userId: tasks[activeIndex].userId,
                    taskNo: tasks[activeIndex].taskNo,
                    storyPoint: tasks[activeIndex].storyPoint,
                    startDate: tasks[activeIndex].startDate,
                    endDate: tasks[activeIndex].endDate,
                }
                dispatch(updateTask(oneTasks));
                /*
              setTasks(task => task.filter(item => item.id !== oneTasks.id));
              setTasks(tasks => [...tasks , oneTasks]);
              */
              return arrayMove(tasks, activeIndex, overIndex - 1);
            }
            return arrayMove(tasks, activeIndex, overIndex);
        }


        const isOverAColumn = over.data.current?.type === "Column";
        if (isActiveATask && isOverAColumn) {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const twoTasks: TaskState = {
                id: tasks[activeIndex].id,
                title: tasks[activeIndex].title,
                description: tasks[activeIndex].description,
                status: overId.toString(),
                userId: tasks[activeIndex].userId,
                taskNo: tasks[activeIndex].taskNo,
                storyPoint: tasks[activeIndex].storyPoint,
                startDate: tasks[activeIndex].startDate,
                endDate: tasks[activeIndex].endDate,
            }
            dispatch(updateTask(twoTasks));
            /*
            setTasks(task => task.filter(item => item.id !== twoTasks.id));
            setTasks(tasks => [...tasks , twoTasks]);
            */
            return arrayMove(tasks, activeIndex, activeIndex);
        }

    }

    function createUser() {
      if(wUser.length != 0) {
        const userDispatch: UserState = {
          id: userRedux.length+1,
          username: wUser,
          avatar: cAvatar
        }
        dispatch(addUser(userDispatch));
        toast({
          variant: "success",
          title: "User Created",
          description: "Username : "+wUser,
        })
        setDialogOpen(false);
      }
    }


    return (
        <div className="w-full h-full max-2xl:h-auto">
          <div className="inline-block ml-5 relative left-[3%] mb-4 mt-10">
            <h1 className="text-3xl drop-shadow font-medium text-gray-700 max-lg:text-xl">Board</h1>
          </div>
            <div className="mb-2 flex gap-3 items-center">
              <div className="flex rounded-xl shadow p-1 bg-white border-2 ml-5 relative left-[3%]">
                <input name="episodequery" id="title" className="border-white text-sm outline-none border-0 w-full rounded-xl p-1 cursor-no-drop" type="text" placeholder="Designed for Display only" />
                <button type="submit" className="rounded-xl text-white text-xl p-1 ml-2">
                  <span className="w-auto flex justify-end  items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </span>
                </button>
              </div> 
              <div className="ml-[3%]">
                <Dialog open={dialogOpen}>
                  <DialogTrigger>
                    <Button variant={"outline"} className="font-normal drop-shadow-md text-sm text-white bg-gray-600 p-2" onClick={() => setDialogOpen(true)}>Create user</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>+ Add User</DialogTitle>
                    <DialogDescription>
                        Fill in the user information. Click save when you're done.
                    </DialogDescription>
                    <div className="absolute right-4 top-4">
                       <IoClose  className="size-6 text-black cursor-pointer transition-all hover:scale-110" onClick={() => setDialogOpen(false)}/>
                    </div>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Username</Label>
                        <Input placeholder="Please fill in" className="col-span-2" onChange={(e) => setWUser(e.target.value)}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Choose Avatar</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                           <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
                              <div className="flex gap-2 items-center">
                                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                                   {value && <img src={avatarRedux.find((avatar) => avatar.avatar === value)?.avatar} className="w-5 h-5"/>}
                                  </div>
                                              <span>{value ? avatarRedux.find((avatar) => avatar.avatar === value)?.avatar : "Select user"}</span>
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
                                          {avatarRedux.map((avatar) => (
                                              <CommandItem key={avatar.id} value={avatar.avatar} onSelect={(currentValue) => {
                                                  setValue(currentValue === value ? "" : currentValue)
                                                  setOpen(false)
                                                  setCAvatar(avatar.id)
                                              }}>
                                                  <div className="flex gap-2 items-center">
                                                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                                                          <img src={avatarRedux.find((res) => res.id === avatar.id)?.avatar} className="w-5 h-5"/>
                                                      </div>
                                                      <span>{avatar.avatar}</span>
                                                  </div>
                                              <Check className={cn( "ml-auto", value === avatar.avatar ? "opacity-100" : "opacity-0")} />
                                              </CommandItem>
                                          ))}
                                          </CommandGroup>
                                      </CommandList>
                                      </Command>
                                  </PopoverContent>
                            </Popover>
                    </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="hover:bg-gray-300 transition-all" onClick={() => createUser()}>Create</Button>
                   </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="flex">
                <DndContext
                    sensors={sensors}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <SortableContext items={columnsId}>
                      <div className="flex flex-wrap w-full justify-center">
                        {columns.map((col) => (
                            <ColumnContainer 
                            key={col.id}
                            column={col}
                            tasks={tasks.filter((task) => task.status === col.id)}
                            />
                        ))}
                        </div>
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}