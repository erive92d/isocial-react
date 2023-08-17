import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPost } from "../api/api"

export default function UserPosts({ posts, title, currentUser }) {
    const [grabPosts, setGrabPosts] = useState(null)
    console.log(posts)
    document.title = `${currentUser}'s profile`
    useEffect(() => {

        getAllPost()
            .then(data => setGrabPosts(data))
    }, [])

    const currentPosts = grabPosts?.filter(pst => pst.postAuthor[0].username === currentUser)
    currentPosts?.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    console.log(currentPosts)

    return (
        <div className="bg-white p-2">
            {/* {title && <h1>{title}</h1>} */}
            {currentPosts &&
                currentPosts.map((crnt) => (
                    <div className="m-2 border-t p-2 rounded-lg bg-green-600 text-white">
                        <Link to={`/post/${crnt._id}`}>
                            <h1>{crnt.postText}</h1>
                            <p className="italic font-thin text-right text-sm">{crnt.commentCount} comments</p>
                        </Link>

                    </div>
                ))

            }
        </div>
    )
}