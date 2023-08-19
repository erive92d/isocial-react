import { useEffect } from "react";
import { getMe, getAllPost, getUser } from "../api/api";
import auth from "../api/auth";
import Login from "./Login";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserPosts from "../components/UserPosts";
import { capitalizeFirst } from "../helper/capitalizeFirst";
import Loading from "../components/Loading";


export default function Profile() {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(null)
    const [isLogged, setLogged] = useState(true)
    const { userId } = useParams()
    const token = auth.loggedIn() ? auth.getToken() : null
    if (auth.loggedIn() && auth.getProfile().data._id === userId) {
        navigate("/me")
    }
    useEffect(() => {
        const newData = userId ? getUser(userId) : getMe(token)
        newData.then(js => setNewUser(js))
    }, [userId])



    if (!newUser) return <Loading />

    return (
        <div className=" min-h-screen">
            <div className="p-2 flex justify-between">
                <div>
                    {/* {isLogged && <p>Logged</p>} */}

                    <Button variant="contained" color="success" onClick={() => navigate(-1)}>Back</Button>
                </div>
                <div >
                    {!userId && <Button variant="contained" color="error" onClick={() => auth.logout()}>Logout</Button>}
                </div>
            </div>


            <div className="">
                <div className="bg-white p-2">
                    <h1>{capitalizeFirst(newUser.name)}</h1>
                    <p className="italic font-thin text-gray-600">@{newUser.username}</p>
                    {/* <p className="italic font-thin text-gray-600">@{newUser.createdAt}</p> */}

                </div>
            </div>

            <div>
                <UserPosts
                    title={`${newUser.username}'s post`}
                    posts={newUser.post}
                    currentUser={newUser.username}
                />
                {/* <ProfilePost userId={userId} /> */}

            </div>
        </div>
    )

}