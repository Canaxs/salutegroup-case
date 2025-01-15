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

    const tasks = useSelector((store: RootState) => store.task);

    const [columns, setColumns] = useState<Column[]>(defaultCols);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<TaskState | null>(null);


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
            const fakeTasks = tasks;
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
            }
            dispatch(updateTask(twoTasks));
            /*
            setTasks(task => task.filter(item => item.id !== twoTasks.id));
            setTasks(tasks => [...tasks , twoTasks]);
            */
            return arrayMove(tasks, activeIndex, activeIndex);
        }

    }


    return (
        <div className="w-full h-full mt-10">
            <h1 className="text-3xl drop-shadow font-medium text-gray-700 ml-5 mb-5">Board</h1>
            <div className="flex">
                <DndContext
                    sensors={sensors}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                >
                    <SortableContext items={columnsId}>
                        {columns.map((col) => (
                            <ColumnContainer 
                            key={col.id}
                            column={col}
                            tasks={tasks.filter((task) => task.status === col.id)}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    )
}