import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPost } from "../api/api"
import DeleteButton from "./DeleteButton"
import DeletePost from "./DeletePost"

export default function UserPosts({ currentUser, meData, posts }) {
    const [grabPosts, setGrabPosts] = useState(null)
    document.title = `${currentUser}'s profile`
    // useEffect(() => {
    //     getAllPost()
    //         .then(data => setGrabPosts(data))
    // }, [])

    // console.log(posts)
    // console.log(meData)
    // const currentPosts = grabPosts?.filter(pst => pst.postAuthor[0].username === currentUser)
    // currentPosts?.sort(function (a, b) {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    // });
    // console.log(currentPosts)

    return (
        <div className="bg-white p-2">
            {/* {title && <h1>{title}</h1>} */}
            {posts &&
                posts.map((crnt) => (
                    <div className="m-2 flex justify-between p-3 rounded-lg bg-green-600 text-white">

                        <Link to={`/post/${crnt._id}`}>
                            <h1>{crnt.postText}</h1>
                            <p className="italic font-thin text-right text-sm">{crnt?.comments.length} comments</p>
                        </Link>

                        <div className="text-right">
                            {crnt.postAuthor === meData?._id ? <DeletePost meData={meData} postId={crnt._id} /> : null
                            }
                        </div>
                    </div>
                ))

            }
        </div>
    )
}