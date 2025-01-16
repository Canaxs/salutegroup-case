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
                    <div className="flex relative items-center justify-center mb-[6px] hover:rotate-2 hover:scale-110 transition-all">
                        {userRedux.map((user,index) => index < 5 && 
                            <div className={"w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center absolute opacity-40"} key={"img"+index} style={{left: (index+1)*17 , zIndex: index}}>
                                <img src={avatarRedux.find((avatar) => avatar.id === user.avatar)?.avatar} className={"w-7 h-7"}/>
                            </div>
                        )}
                        {userRedux.length > 5 && 
                            <div className="absolute left-24 z-30 drop-shadow-lg font-medium text-xl flex gap-1 text-black">
                                <span>+</span>
                                <span>{userRedux.length-5}</span>
                            </div>
                        }
                        <div className="absolute w-28 rounded-2xl left-[17px] h-9 bg-gray-500 opacity-30 z-10"></div>
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