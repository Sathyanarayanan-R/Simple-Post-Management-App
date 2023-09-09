import axios from "axios"

export const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
})

export const getPosts = async () => {
    try {
        const response = await api.get('/posts')
        return response.data
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = async (id) => {
    try {
        const response = await api.delete(`/posts/${id}`);

        if (response.status === 200)
            console.log(`DELETED the Post with ID : ${id} Successfully`)

    } catch (err) {
        console.log(err);
    }
}

export const getComments = async (id) => {
    try {
        const response = await api.get(`/posts/${id}/comments`)
        return response.data
    } catch (err) {
        console.log(err);
    }
}