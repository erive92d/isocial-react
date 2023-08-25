import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { singleUserPosts } from "../api/api-post"
import { Link } from "react-router-dom"
import { getAllPost } from "../api/api-post"
import DeleteButton from "./DeleteButton"
import DeletePost from "./DeletePost"

export default function UserPosts({ currentUser, meData, posts, userId }) {
    const [grabPosts, setGrabPosts] = useState([])
    document.title = `${currentUser}'s profile`

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await singleUserPosts(userId)
                // if (!response.ok) {
                //     console.log("fetching failed")
                //     return
                // }

                // console.log(response)
                // setGrabPosts(response)
                singleUserPosts(userId)
                    .then(data => setGrabPosts(data))
                    .catch(err => console.log(err))

            } catch (error) {
                console.log(error)
            }

        }

        fetchData()
    }, [])
    console.log(grabPosts)

    return (
        <div className="bg-white p-2">
            {/* {title && <h1>{title}</h1>} */}
            {grabPosts &&
                grabPosts.map((crnt) => (
                    <div key={crnt._id} className="m-2 flex justify-between p-3 rounded-lg bg-green-600 text-white">

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