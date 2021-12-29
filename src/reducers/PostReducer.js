import { ALL_POST, ADD_POST, DELETE_POST } from './type'

export const postReducer = (state, action) => {
	const { type, payload } = action

	switch (type) {
		case ALL_POST:
			return {
				...state,
				posts: payload,
			}
		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, payload],
			}
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== payload),
			}
		default:
			return state
	}
}
