import { Column } from "@/types/columnInterface";
import { TaskState } from "@/types/taskInterface";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { CSS } from "@dnd-kit/utilities";
import TaskBar from "./TaskBar";



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

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
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

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className=" bg-columnBackgroundColor opacity-40 border-2 border-pink-500 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col "
            ></div>
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className=" bg-[#f4f5f7] w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col m-5">
            <div
                {...attributes}
                {...listeners}
                className=" bg-[#f4f5f7] text-md h-[60px] cursor-grab rounded-b-none p-3 font-bold border-columnBackgroundColor flex items-center justify-between ">
                <div className="flex gap-2 ml-1 rounded">
                    <span className="text-[#959EAE] font-normal drop-shadow-sm">
                        {column.title}
                    </span>
                    
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
            <button
                className="flex gap-2 items-center text-gray-400 drop-shadow-sm text-base p-2 transition-all hover:text-black"
                onClick={() => {
                    {/* createTask(column.id); */}
                }}>
                + Add task
            </button>
            : ""}
        </div>
    )
}