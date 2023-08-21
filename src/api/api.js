export async function getUsers() {
    const response = await fetch("/api/users")
    const data = await response.json()
    return data
}

export const login = (userData) => {
    try {
        return fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    } catch (error) {
        console.log(error)
    }

};


export const createUser = (data) => {

    try {
        return fetch("/api/users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

    } catch (error) {
        console.error(error)
    }

}

export const getMe = async (token) => {
    try {

        const response = await fetch('/api/users/me', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    } catch (err) {
        console.error(err)
    }

}

export const getUser = async (userId) => {
    try {
        const response = await fetch(`/api/users/user/${userId}`)
        const data = await response.json()
        return data
    }
    catch (err) {
        console.error(err)
    }
}


export const getUserByName = async (name) => {
    try {
        const response = await fetch(`/api/users/username/${name}`)
        const data = await response.json()
        return data
    }
    catch (err) {
        console.error(err)
    }
}
export const createPost = (token, postBody) => {
    try {
        return fetch('/api/users/post', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(postBody)
        })
    } catch (err) {
        console.error(err)
    }
}

export const getAllPost = async () => {
    const response = await fetch('/api/users/post')
    const data = await response.json()
    return data
}

export const getOnePost = async (postId) => {
    const response = await fetch(`/api/users/post/${postId}`)
    const data = await response.json()
    return data
}

export const createComment = async (token, comment, postId) => {
    const response = await fetch(`/api/users/comment/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(comment)
    }
    )
    return response
}

export const followUser = async (token, userId) => {
    const response = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    })

    return response
}

export const deletePost = async (token, postId) => {
    const response = await fetch(`/api/users/post/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })

    return response
}