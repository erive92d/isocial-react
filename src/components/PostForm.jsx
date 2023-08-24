import { Button, FormControl, FormHelperText } from "@mui/material";
import { useState } from "react";
import { createPost } from "../api/api";
import { useNavigate } from "react-router-dom";
import auth from "../api/auth";
export default function PostForm({ setRender }) {
    const navigate = useNavigate()
    // const authorId = auth.loggedIn() ? auth.getProfile().data._id : null
    const [show, setShow] = useState(false)

    const [post, setPost] = useState(
        {
            postText: "",
        }
    )
    const handleShow = () => {
        setShow(false)
        if (!show) {
            setShow(true)
        }
    }

    const handleChange = (e) => {
        if (!e.target.value) {
            return "Cannot be empty!"
        }

        if (e.target.value.length === 280) {
            window.alert("Max character have been reached")
        }

        const { value, name } = e.target
        if (auth.loggedIn()) {
            setPost({ ...post, [name]: value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = auth.loggedIn() ? auth.getToken() : null
            const response = await createPost(token, post)

            if (response.status === 500) {
                return alert("Maximum character 280")
            }
            if (!response.ok) {
                return "Something went wrong!"
            }
            setRender(true)
            setShow(false)
            // window.location.reload()
        } catch (error) {
            console.error(error)
        }

        setPost(
            {
                postText: "",
            }
        )


    }


    return (
        <div className="flex flex-col p-2 ">
            <div>
                {show ? <Button onClick={handleShow} >x</Button> : <Button variant="contained" onClick={handleShow}>Post</Button>
                }
            </div>

            {show ?
                <form className="flex flex-col items-center  p-2">
                    <div>
                        <textarea
                            className="text-black rounded-xl p-2"
                            name="postText"
                            rows={3}
                            cols={30}
                            type="text"
                            placeholder="Whatcha thinkin?"
                            onChange={handleChange}
                            maxLength={280}
                        ></textarea>
                    </div>

                    <div>
                        <Button variant="contained" onClick={handleSubmit}>Send</Button>

                    </div>
                </form>
                :
                null
            }

        </div>
    )
}