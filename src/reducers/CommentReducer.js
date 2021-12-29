import { ALL_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from './type'

export const commentReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_COMMENTS:
			return {
				...state,
				comments: payload,
			}
		case ADD_COMMENT:
			return {
				...state,
				comments: [...state.comments, payload],
			}
		case DELETE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment._id !== payload
				),
			}
		default:
			return state
	}
}
