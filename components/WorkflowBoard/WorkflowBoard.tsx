import { addUser , setUser } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { userData } from "@/data/UserData";


export default function Workflowboard() {

    const dispatch = useDispatch();

    const users = useSelector((store: RootState) => store.user);

    const tasks = useSelector((store: RootState) => store.task);

    return (
        <div>
            
        </div>
    )
}