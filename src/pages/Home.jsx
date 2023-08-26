import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getAllPost } from "../api/api-post"
import PostForm from "../components/PostForm"
import auth from "../api/auth"
import { capitalizeFirst } from "../helper/capitalizeFirst"
import Loading from "../components/Loading"
import moment from "moment"
import DeleteButton from "../components/DeleteButton"
export default function Home() {
    const [posts, setPosts] = useState(null)
    const [fetch, setFetch] = useState(true)
    const [isAdmin, setAdmin] = useState(false)

    document.title = "Home"

    useEffect(() => {

        if (auth.loggedIn() && auth.getProfile().data.username === "admin") {
            setAdmin(true)
        }
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
    console.log(posts)

    // posts.sort(function (a, b) {
    //     return new Date(b.createdAt) - new Date(a.createdAt);
    // });
    // console.log(posts)
    return (
        <div className=" min-h-screen">
            {auth.loggedIn() ? <PostForm setRender={setRender} /> : null}
            {posts.data?.map((post) => {
                return (
                    <Link key={post._id} to={`/post/${post._id}`} >

                        <div className="p-2   bg-green-600 text-white m-2 rounded-lg space-y-2">
                            <p className="text-lg font-bold">{capitalizeFirst(post?.postAuthor?.name)}</p>
                            <p className="">{post.postText}</p>
                            <div className="text-sm font-thin italic flex justify-between">
                                <p>{post.comments.length !== 0 ? post.comments.length + " comments" : null}</p>

                                <p >{moment(post.createdAt).fromNow()}</p>

                            </div>
                            {isAdmin && <DeleteButton postId={post._id} token={auth.getToken()} setRender={setRender} />}


                            {/* <p>{post.createdAt}</p> */}
                        </div>

                    </Link>
                )
            })}

        </div>
    )
}