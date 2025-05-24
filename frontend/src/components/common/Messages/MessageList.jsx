// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { getUsers } from "@/store/common/messageSlice";
import { useSelector, useDispatch } from "react-redux";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";
import { setSelectedUser } from "@/store/common/messageSlice";

function MessageList() {
    const dispatch = useDispatch();
    const { users, isUserLoading, selectedUser } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    if (isUserLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r -mt-20 border-r-green-950 flex flex-col transition-all duration-200">
            <div className="border-b-2 w-full p-5">
                <div className="flex items-center gap-2">
                    <p className="text-pretty font-medium text-green-950">Messages</p>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                {users.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => dispatch(setSelectedUser(user))}
                        className={`
                            w-full p-3 flex items-center gap-3
                            hover:bg-base-300 transition-colors
                            ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/profile-icon.jpg"}
                                alt={user.userName}
                                className="size-12 object-cover rounded-full"
                            />
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{user.userName}</div>
                        </div>
                    </button>
                ))}

                {users.length === 0 && (
                    <div className="text-center text-zinc-500 py-4">.......</div>
                )}
            </div>
        </aside>
    );
}

export default MessageList;