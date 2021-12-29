import { SET_AUTH, LOGOUT, UPDATE_USER } from './type'

export const authReducer = (state, action) => {
	const {
		type,
		payload: { isAuthenticated, user },
	} = action

	switch (type) {
		case SET_AUTH:
			return {
				...state,
				isAuthenticated,
				user,
			}
		case LOGOUT:
			return {
				...state,
				isAuthenticated,
				user,
			}
		case UPDATE_USER: {
			return {
				...state,
				user,
			}
		}

		default:
			return state
	}
}
