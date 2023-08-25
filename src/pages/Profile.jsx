import { useEffect } from "react";
import { getMe, getUser } from "../api/api";
import { getAllPost } from "../api/api-post";
import auth from "../api/auth";
import Login from "./Login";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserPosts from "../components/UserPosts";
import { capitalizeFirst } from "../helper/capitalizeFirst";
import Loading from "../components/Loading";
import moment from "moment";
import FollowButton from "../components/FollowButton";

export default function Profile() {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(null)
    const [isLogged, setLogged] = useState(true)
    const [meData, setMeData] = useState([])
    const { userId } = useParams()


    useEffect(() => {

        const fetchMe = async () => {
            const token = auth.loggedIn() ? auth.getToken() : null
            if (!token) {
                window.location.assign("/login")
            }
            const response = await getMe(token)
            setMeData(response)
            return response
        }
        const newData = userId ? getUser(userId) : fetchMe()

        newData.then(js => setNewUser(js))
    }, [userId])


    if (auth.loggedIn() && auth.getProfile().data._id === userId) {
        navigate("/me")
    }
    // console.log(newUser)

    if (!newUser) return <Loading />
    // console.log(newUser)

    return (
        <div className=" min-h-screen">
            <div className="p-2 flex justify-between">
                <div>
                    {/* {isLogged && <p>Logged</p>} */}

                    <Button variant="contained" color="success" onClick={() => navigate(-1)}>Back</Button>
                </div>
                <div >
                    {!userId ? <Button variant="contained" color="error" onClick={() => auth.logout()}>Logout</Button> :
                        <FollowButton userId={userId} />
                    }
                </div>
            </div>
            <div className="">
                <div className="bg-white p-2">
                    <p className="font-thin text-sm text-right">Member since {moment(newUser.createdAt).format("MMM Do YY")}
                    </p>
                    {newUser &&
                        <>
                            <h1>{capitalizeFirst(newUser.name)}</h1>

                            <p className="italic font-thin text-gray-600">@{newUser.username}</p>

                            {/* <p className="italic font-thin text-gray-600">@{newUser.createdAt}</p> */}
                            <div className="flex flex-col py-2 font-thin">
                                <p>{newUser.followers.length} followers </p>
                                <p>{newUser.following.length} following</p>
                            </div>
                        </>

                    }
                </div>
            </div>

            <div>
                <UserPosts
                    title={`${newUser.username}'s post`}
                    posts={newUser.post}
                    userId={newUser._id}
                    meData={meData}
                    currentUser={newUser.username}
                />
                {/* <ProfilePost userId={userId} /> */}

            </div>
        </div >
    )

}