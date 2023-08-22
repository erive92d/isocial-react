import { Button } from "@mui/material";
import { deletePost } from "../api/api";
export default function DeleteButton({ postId, token, setRender }) {


    const handleDelete = async (e) => {
        e.preventDefault()

        try {
            const response = await deletePost(token, postId)
            if (!response.ok) {
                return alert("Could not delete the post")
            }

            setRender(true)


        } catch (error) {
            console.log(error)
        }


    }
    return <div className="text-right">
        <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
    </div>
}