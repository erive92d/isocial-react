import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPost } from "../api/api"
import PostForm from "../components/PostForm"
import auth from "../api/auth"
import { capitalizeFirst } from "../helper/capitalizeFirst"
import Loading from "../components/Loading"

export default function Home() {
    const [posts, setPosts] = useState(null)
    const [fetch, setFetch] = useState(true)
    document.title = "Home"

    useEffect(() => {
        if (fetch) {
            getAllPost()
                .then(data => setPosts(data))
            setFetch(false)
        }

    }, [fetch])

    const setRender = () => {
        setFetch(true)
    }

    if (!posts) {
        return <Loading />
    }

    posts.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div className=" min-h-screen">
            {auth.loggedIn() ? <PostForm setRender={setRender} /> : null}

            {posts?.map((post) => {
                return (
                    <Link to={`/post/${post._id}`} >
                        <div key={post._id} className="p-2   bg-green-600 text-white m-2 rounded-lg space-y-2">
                            <p className="text-lg font-bold">{capitalizeFirst(post.postAuthor[0].name)}</p>

                            <p className="">{post.postText}</p>
                            <div className="text-sm font-thin italic flex justify-between">
                                <p>{post.comments.length !== 0 ? post.comments.length + " comments" : null}</p>

                                <p >{post.createdAt}</p>

                            </div>

                            {/* <p>{post.createdAt}</p> */}
                        </div>

                    </Link>
                )
            })}

        </div>
    )
}