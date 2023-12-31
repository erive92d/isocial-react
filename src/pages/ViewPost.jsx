import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOnePost } from "../api/api-post";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Comments from "../components/Comment/Comments";
import CommentForm from "../components/Comment/CommentForm";
import { capitalizeFirst } from "../helper/capitalizeFirst";
import Loading from "../components/Loading";
import momentFormat from "../helper/momentFormat";

export default function ViewPost() {

    const navigate = useNavigate()

    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [fetch, setFetch] = useState(true)
    useEffect(() => {
        if (fetch) {
            getOnePost(postId)
                .then(data => setPost(data[0]))
            setFetch(false)
        }

    }, [fetch])

    const setRender = () => {
        setFetch(true)
    }

    if (!post) return <Loading />

    // console.log(post)
    document.title = `${capitalizeFirst(post?.postAuthor?.username)}'s post`
    return (
        <div className=" min-h-screen">
            <div className="p-2">
                <Button variant="contained" color="success" onClick={() => navigate(-1)}>Back</Button>
            </div>

            {post && (
                <div className="flex flex-col p-2 my-2 space-y-2">
                    <div className="rounded-lg ">
                        <div className="bg-white p-2 rounded ">
                            <Link className="text-lg font-bold" to={`/user/${post.postAuthor?._id}`}>{capitalizeFirst(post.postAuthor?.name)}</Link>

                            <h1 className="font-light">{post.postText}</h1>
                            <p className="text-sm font-thin italic text-right">{momentFormat(post.createdAt)}</p>
                        </div>
                    </div>


                    <div>
                        <Comments comments={post.comments} author={post.postAuthor?._id} />

                    </div>

                </div>
            )}

            <div className="relative">
                <CommentForm setRender={setRender} postId={postId} />
            </div>
        </div>
    )
}