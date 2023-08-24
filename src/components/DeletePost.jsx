import { Button } from "@mui/material";
import { deletePost, getMe } from "../api/api";
import auth from "../api/auth";
export default function DeletePost({ meData, postId }) {


    const handleDelete = async (e) => {

        try {
            const token = auth.loggedIn() ? auth.getToken() : null
            if (!token) {
                return alert("User invalid, please login")
            }
            const response = await deletePost(token, postId)
            if (!response.ok) {
                return alert("Unable to delete")
            }

            window.location.reload()

        } catch (error) {
            console.log(error)
            return
        }

    }

    return (
        <button color="error" variant="contained" onClick={handleDelete}>x </button>
    )
}