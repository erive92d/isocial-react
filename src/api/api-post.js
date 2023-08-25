export const createPost = (token, postBody) => {
    try {
        return fetch('/api/posts/', {
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
    const response = await fetch('/api/posts/')
    const data = await response.json()
    return data
}

export const getOnePost = async (postId) => {
    const response = await fetch(`/api/posts/${postId}`)
    const data = await response.json()
    return data
}

export const deletePost = async (token, postId) => {
    const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })

    return response
}

export const singleUserPosts = async (userId) => {
    const response = await fetch(`/api/posts/userpost/${userId}`)
    return await response.json()
}