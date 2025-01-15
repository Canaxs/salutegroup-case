import { RootState } from "@/redux/store";
import { TaskState } from "@/types/taskInterface";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
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


interface Props {
    task: TaskState;
}

export default function TaskBar({
    task,
}: Props) {

    const userRedux = useSelector((store: RootState) => store.user);

    const defaultBgColor = [
        {
            color: "bg-gray-500",
            status: "open"
        },
        {
            color: "bg-orange-300",
            status: "progress"
        },
        {
            color: "bg-blue-500",
            status: "review"
        },
        {
            color: "bg-green-500",
            status: "done"
        }
    ];

    function returnBgColor(status) {
        return defaultBgColor.filter((res) => res.status === status).map((str) => str.color);
    }

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
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

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500  cursor-grab relative "
            />
        );
    }


    return (
        <Sheet>
            <SheetTrigger>
                <div ref={setNodeRef} style={style} {...attributes} {...listeners}
                className="bg-mainBackgroundColor border p-2.5 h-[80px] items-center flex flex-col justify-between rounded-sm hover:ring-2 hover:ring-inset hover:ring-blue-300 cursor-grab relative task">
                        <span className="overflow-y-auto overflow-x-hidden whitespace-pre-wrap w-full line-clamp-1 text-sm text-start">
                                {task.title}
                        </span>
                        <div className="flex justify-between w-full">
                            <div className={"text-white rounded-md "+returnBgColor(task.status)}>
                                <span className="text-xs p-2">{task.status}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-5 h-5 bg-gray-200 flex items-center justify-center rounded-full">
                                    <span className="drop-shadow-md text-xs text-black">{task.storyPoint}</span>
                                </div>
                                <span className="text-xs">{userRedux[task.userId].username}</span>
                                <div className="w-7 h-7 bg-gray-200 rounded-full flex justify-center items-center">
                                    <img src={userRedux[task.userId].avatar} className="w-6 h-6"/>
                                </div>
                            </div>
                        </div>
                </div>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
                <SheetHeader>
                <SheetTitle>{task.taskNo}</SheetTitle>
                <SheetDescription>
                    {task.description}
                </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                    <div className="mb-2 flex justify-between">
                        <div className={"text-white rounded-md w-auto inline-block "+returnBgColor(task.status)}>
                            <span className="text-xs p-2">{task.status}</span>
                        </div>
                        <div>
                            <div className="ml-10 flex gap-2 items-center">
                                <div className="w-7 h-7 bg-gray-200 rounded-full flex justify-center items-center">
                                    <img src={userRedux[task.userId].avatar} className="w-6 h-6"/>
                                </div>
                                <span className="drop-shadow-md text-sm text-gray-900">{userRedux[task.userId].username}</span>
                                <span className="text-[10px] text-gray-500">opened on Oct 4, 2025 </span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <div className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-full">
                            <span className="drop-shadow-md text-sm text-black">{task.storyPoint}</span>
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