import { Button } from "@mui/material";
import auth from "../../api/auth";
import { createComment } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function CommentForm({ postId, setRender }) {

    const [commentInput, setCommentInput] = useState(
        {
            commentText: ""
        }
    )

    const navigate = useNavigate()

    const handleLogin = () => {
        window.location.assign("/login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (commentInput.commentText.length === 0) {
            return alert("Empty text")
        }

        const token = auth.loggedIn() ? auth.getToken() : null
        if (!token) {
            return alert("Invalid user")
        }

        try {
            const response = await createComment(token, commentInput, postId)
            if (!response.ok) {
                return
            }


            setRender(true)
            // window.location.reload()

        } catch (error) {
            console.log(error)
        }


    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setCommentInput({ ...commentInput, [name]: value })

    }

    return (
        <div className="sticky bottom-0 flex justify-end w-full p-2">
            <input className="p-2 rounded w-full"
                type="text"
                placeholder="leave a comment.."
                onChange={handleChange}
                name="commentText"
            ></input>
            {auth.loggedIn() ?
                <Button onClick={handleSubmit} variant="contained">Send</Button>
                :
                <Button onClick={handleLogin} variant="contained">Login</Button>
            }

        </div>
    )
}