import { Button } from "@mui/material";
import { followUser, getMe } from "../api/api";
import { useState, useEffect } from "react";
import auth from "../api/auth";
export default function FollowButton({ userId }) {
    const [isFollowed, setIsFollowed] = useState(false)
    const token = auth.loggedIn() ? auth.getToken() : null
    const [meData, setMeData] = useState([])
    useEffect(() => {

        getMe(token)
            .then(data => setMeData(data))

    }, [])
    // console.log(meData.following)
    // console.log(userId)

    const userExist = meData.following?.some((fol) => fol === userId)
    // console.log(userExist)

    const handleFollow = async (e) => {
        e.preventDefault()

        const token = auth.loggedIn() ? auth.getToken() : null
        if (!token) {
            return alert("Needs to be logged in")
        }

        const response = await followUser(token, userId)
        if (!response) {
            return alert("Unable to follow")
        }

        window.location.reload()

    }


    return (
        <div>
            {userExist ? <Button>Followed</Button> : <Button onClick={handleFollow} variant="contained" color="success">Follow</Button>
            }
        </div>
    )
}