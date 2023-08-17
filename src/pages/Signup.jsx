import { Button } from "@mui/material"
import { useState } from "react"
import { createUser } from "../api/api"
import { TextField } from "@mui/material"
import auth from "../api/auth"
export default function Signup() {

    const [userData, setUserData] = useState(
        {
            name: "",
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

        try {
            const response = await createUser(userData)
            console.log(response)
            if (!response.ok) {
                return
            }
            const { token, user } = await response.json();
            console.log(user)
            auth.login(token);

        } catch (error) {
            console.log(error)
        }
        setUserData({
            name: "",
            username: "",
            password: ""
        })
    }



    return (
        <div className="flex flex-col space-y-5 p-5">
            <h1 className="text-2xl text-gray-600 font-thin">Sign up Page</h1>
            <TextField
                name="name" type="text" placeholder="enter name.." onChange={handleChange}
                label="name" variant="outlined" />

            <TextField
                name="username" type="text" placeholder="enter username.." onChange={handleChange}
                label="username" variant="outlined" />
            <TextField
                name="password" type="password" placeholder="enter password.." onChange={handleChange}
                label="password" variant="outlined" />

            {/* <input name="username" type="text" placeholder="enter username.." onChange={handleChange} />
            <input name="password" type="text" placeholder="enter password.." onChange={handleChange} /> */}
            <div>
                <Button type="submit" variant="outlined" onClick={handleClick}>Create</Button>

            </div>
        </div >
    )
}