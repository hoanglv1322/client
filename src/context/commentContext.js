import { React, createContext, useReducer } from 'react'
import axios from 'axios'
import { ALL_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from '../reducers/type'
import { apiUrl } from './constants'
import { commentReducer } from '../reducers/CommentReducer'

export const CommentContext = createContext()

const CommentContextProvider = ({ children }) => {
	const [commentState, dispatch] = useReducer(commentReducer, {
		comments: [],
	})

	//add comment
	const addComment = async (commentAdd) => {
		try {
			const res = await axios.post(
				`${apiUrl}/comments/${commentAdd.postId}/${commentAdd.userId}`,
				commentAdd
			)
			if (res?.data.success) {
				dispatch({
					type: ADD_COMMENT,
					payload: { comment: res.data.comment },
				})
				getComment()
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//get comments
	const getComment = async (postId) => {
		try {
			const res = await axios.get(`${apiUrl}/comments/${postId}`)
			if (res.data.success) {
				dispatch({
					type: ALL_COMMENTS,
					payload: res.data.comments,
				})
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//delete comment
	const deleteComment = async (comment) => {
		try {
			const res = await axios.delete(
				`${apiUrl}/comments/delete/${comment._id}/${comment.postId}`
			)
			if (res.data?.success) {
				dispatch({
					type: DELETE_COMMENT,
					payload: res.data.delete_Comment._id,
				})
			}
			return res.data
		} catch (error) {
			if (error.message) return error.message
			return { success: false, message: error.message }
		}
	}

	//context data
	const commentContextData = {
		commentState,
		getComment,
		addComment,
		deleteComment,
	}

	//return
	return (
		<CommentContext.Provider value={commentContextData}>
			{children}
		</CommentContext.Provider>
	)
}

export default CommentContextProvider
