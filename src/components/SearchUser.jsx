import { useEffect, useState } from "react"
import { getUsers, getUserByName } from "../api/api"


export default function SearchUser() {

    const [textInput, setTextInput] = useState("")
    const [result, setResult] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            if (textInput)
                getUserByName(textInput)
                    // .then(data => setResult(data))
                    .then((data) => {
                        if (data) {
                            setResult(data[0])
                        }
                    })
        }, 1000)
    }, [textInput])

    const handleChange = (e) => {
        setTextInput(e.target.value)
    }

    console.log(result)

    return (
        <div className="p-2 relative">
            <input type="text" value={textInput} onChange={handleChange} placeholder="search.." className="text-black rounded p-1"></input>
            {result &&
                <div className="bg-white text-black absolute w-2/3 ">
                    {result.name}
                </div>
            }
        </div>
    )
}