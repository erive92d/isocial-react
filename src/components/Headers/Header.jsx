import auth from "../../api/auth";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { getMe } from "../../api/api";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import SearchUser from "./SearchUser";
import { capitalizeFirst } from "../../helper/capitalizeFirst";
export default function Header() {
    const [user, setUser] = useState(null)
    const [isUser, setIsUser] = useState(false)

    useEffect(() => {
        if (!user) {
            const token = auth.loggedIn() ? auth.getToken() : null
            if (auth.loggedIn()) {
                setIsUser(true)
                getMe(token)
                    .then(data => setUser(data))
            }
        }

        // setUser()

    }, [isUser])

    // console.log(user)

    return (
        <div className="font-thin p-2 flex justify-between items-center">
            <Logo />
            <SearchUser />
            {isUser && user ? (
                <div className="flex flex-col p-2">
                    <Link className="" to="/me">
                        Welcome {capitalizeFirst(user?.name)}!
                    </Link>
                </div>
            ) : (
                <>
                    <Link className=" " to="/login">
                        <Button variant="contained" className="">
                            Login
                        </Button>

                    </Link>

                </>
            )}
        </div>
    )
}