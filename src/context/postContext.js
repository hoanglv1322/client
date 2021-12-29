import { React, createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from './constants'
import { postReducer } from '../reducers/PostReducer'
import { ADD_POST, ALL_POST, DELETE_POST } from '../reducers/type'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	const [postState, dispatch] = useReducer(postReducer, {
		posts: [],
	})

	// Add post
	const addPost = async (newPost) => {
		try {
			const res = await axios.post(`${apiUrl}/posts/create`, newPost)
			if (res.data.success) {
				dispatch({
					type: ADD_POST,
					payload: { post: res.data.post },
				})
				getAllPost()
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//get all post
	const getAllPost = async () => {
		try {
			const res = await axios.get(`${apiUrl}/posts`)
			if (res) {
				if (res.data.success) {
					dispatch({
						type: ALL_POST,
						payload: res.data.posts,
					})
				}
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update post
	const updatePost = async (updatePostData) => {
		try {
			const res = await axios.put(
				`${apiUrl}/posts/update/${updatePostData._id}`,
				updatePostData
			)
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete post
	const deletePost = async (postId) => {
		try {
			const res = await axios.delete(`${apiUrl}/posts/delete/${postId}`)
			dispatch({ type: DELETE_POST, payload: res.data.delete_Post._id })
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//single post
	const getDetail = async (postId) => {
		try {
			const res = await axios.get(`${apiUrl}/posts/${postId}`)
			if (res.data.success) {
				return res.data
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update post status
	const updateStatusPost = async (postUpdate) => {
		try {
			const res = await axios.put(
				`${apiUrl}/posts/updateStatus/${postUpdate.postId}`,
				postUpdate
			)
			if (res.data.success) {
				return res.data
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//update post status
	const deleteStatusPost = async (postUpdate) => {
		try {
			const res = await axios.put(
				`${apiUrl}/posts/deleteStatus/${postUpdate.postId}`,
				postUpdate
			)
			if (res.data.success) {
				return res.data
			}
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	useEffect(() => {
		getAllPost()
	}, [])

	//context data
	const postContextData = {
		addPost,
		postState,
		getDetail,
		updatePost,
		deletePost,
		updateStatusPost,
		deleteStatusPost,
	}

	//return
	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
