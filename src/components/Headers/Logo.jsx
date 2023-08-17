import { useEffect } from "react"
import { Link } from "react-router-dom"
import { getUser } from "../../api/api"
import { useNavigate } from "react-router-dom"
import { Button } from "@mui/material"
export default function Logo() {
    const navigate = useNavigate()

    // if (document.title !== "Home") {
    //     return <Button onClick={() => navigate(-1)}>Go back</Button>
    // }
    //This is header
    return <Link to="/"><h1 className="p-2 text-2xl ">iSocial</h1>   </Link>


}