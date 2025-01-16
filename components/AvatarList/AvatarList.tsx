import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";



export default function AvatarList() {

    const userRedux = useSelector((store: RootState) => store.user);
    const avatarRedux = useSelector((store: RootState) => store.avatar);


    return (
        <div className="cursor-pointer relative" title="Users in the project">
            <Dialog>
                <DialogTrigger>
                    <div className="flex relative z-50 items-center justify-center mb-[6px] hover:rotate-2 hover:scale-110 transition-all">
                        {userRedux.map((user,index) => index < 5 && 
                            <div className={"w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center absolute opacity-100 drop-shadow-lg"} key={"img"+index} style={{left: (index+1)*30 , zIndex: (index+1)*-2}}>
                                <img src={avatarRedux.find((avatar) => avatar.id === user.avatar)?.avatar} className={"w-9 h-9"}/>
                            </div>
                        )}
                        {userRedux.length > 5 && 
                            <div className="absolute left-[181px] w-9 h-9 drop-shadow-lg font-medium text-lg flex items-center justify-center gap-1 text-gray-500 rounded-full bg-gray-200" style={{zIndex: "-20"}}>
                                <span>+</span>
                                <span>{userRedux.length-5}</span>
                            </div>
                        }
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Users in the project</DialogTitle>
                    <DialogDescription>Users</DialogDescription>
                    <div className="grid gap-4 py-4">
                        {userRedux.map((user,index) =>
                        <div className="flex items-center justify-start gap-3" key={"img2"+index}>
                            <div className={"w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center"}>
                                <img src={avatarRedux.find((avatar) => avatar.id === user.avatar)?.avatar} className={"w-7 h-7"}/>
                            </div>
                            <div className="drop-shadow-lg text-base text-gray-500">
                                {user.username}
                            </div>
                        </div>
                        )}
                </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}