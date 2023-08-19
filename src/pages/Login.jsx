import { Button, ButtonGroup, Input } from "@mui/material"
import { useState } from "react"
import { login } from "../api/api"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import auth from "../api/auth"
import Signup from "./Signup"
export default function Login() {

    const navigate = useNavigate()

    const [userData, setUserData] = useState(
        {
            username: "",
            password: ""
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target

        setUserData({ ...userData, [name]: value })
    }


    const handleClick = async (e) => {
        e.preventDefault()
        // console.log(userData)
        try {
            const response = await login(userData)
            console.log(response)


            if (response.status === 400) {
                return alert("No user with this username!")
            }

            if (response.status === 420) {
                return alert("Wrong password")
            }

            const { token, user } = await response.json();
            auth.login(token);

            navigate(-1)

        } catch (error) {
            console.log(error)
        }
        setUserData({
            username: "",
            password: ""
        })
    }


    if (auth.loggedIn()) {
        window.location.assign("/")
    }


    return (
        <div className="flex flex-col  space-y-7 p-5 min-h-screen bg-gray-300">
            {auth.loggedIn() ? <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
            </p>
                :
                <div className="flex flex-col w-2/3 space-y-5">
                    <h1 className="text-2xl text-white font-thin">Login</h1>

                    <Input placeholder="username" type="text" name="username" onChange={handleChange}></Input>
                    <Input placeholder="password" type="password" name="password" onChange={handleChange}></Input>
                    <div className="flex space-x-5">
                        <Button variant="contained" onClick={handleClick} type="submit">Login</Button>
                        <p>Not a member? Signup <Link className="btn btn-lg btn-light underline" to="/signup">here</Link> </p>
                        {/* <Link className="btn btn-lg btn-light m-2" to="/signup">
                            <Button>
                                Signup
                            </Button>
                        </Link> */}
                        {/* <Button> <a href="/signup">Signup</a></Button> */}

                    </div>


                </div>
            }

        </div>
    )
}