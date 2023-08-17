import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPost } from "../api/api"

export default function Feeds() {

    const [posts, setPosts] = useState(null)


    useEffect(() => {
        getAllPost()
            .then((res) => res.json())
            .then(data => setPosts(data))
    })


    return (
        <div>
            <div>
                {posts?.map((post) => {
                    return (
                        <div className="border p-2">
                            <p>{post.postText}</p>
                            <Link to={`/user/${post.postAuthor[0]._id}`}>
                                <p className="text-right">{post.postAuthor[0].username}</p>

                            </Link>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}