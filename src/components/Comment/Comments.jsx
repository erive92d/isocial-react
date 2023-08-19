import { Link } from "react-router-dom"
import { capitalizeFirst } from "../../helper/capitalizeFirst"
import momentFormat from "../../helper/momentFormat"

export default function Comments({ comments, author }) {
    if (comments.length === 0) {
        return <h1>No one has commented</h1>
    }
    // console.log(comments)
    return (
        <div className="">
            {comments?.map((comment) => (
                <div key={comment._id} className={comment.commentAuthor[0]._id === author ? `flex justify-end ` : `justify-start flex text-gray-300  `}>
                    <div className={comment.commentAuthor[0]._id === author ? "bg-green-600 text-white w-2/3 rounded p-2 my-2" : "w-2/3 bg-gray-500 text-white rounded p-2 my-2"}>
                        <Link className="font-bold" to={`/user/${comment.commentAuthor[0]._id}`}>{capitalizeFirst(comment.commentAuthor[0].name)}</Link>
                        <p>{comment.commentText}</p>
                        <p className="text-sm font-thin text-right italic">{momentFormat(comment.createdAt)}</p>

                    </div>

                </div>

            ))}
        </div>
    )
}