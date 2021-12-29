import { React, createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import { authReducer } from '../reducers/AuthReducer'
import { SET_AUTH, UPDATE_USER } from '../reducers/type'
import { setAuthToken } from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	})

	//Authenticate user
	const loadUSer = async () => {
		if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
			setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
		}

		try {
			const res = await axios.get(`${apiUrl}/auth`)
			if (res.data.success) {
				dispatch({
					type: SET_AUTH,
					payload: { isAuthenticated: true, user: res.data.user },
				})
			}
		} catch (error) {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
			setAuthToken(null)
			dispatch({
				type: SET_AUTH,
				payload: { isAuthenticated: false, user: null },
			})
		}
	}

	useEffect(() => {
		loadUSer()
	}, [])

	//login
	const loginUser = async (userForm) => {
		try {
			const res = await axios.post(`${apiUrl}/auth/login`, userForm)
			if (res.data.success) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN_NAME,
					res.data.accessToken
				)
				loadUSer()
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//logoutUser
	const logoutUser = () => {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
		setAuthToken(null)
		dispatch({
			type: SET_AUTH,
			payload: { isAuthenticated: false, user: null },
		})
	}

	//register user
	const registerUser = async (registerForm) => {
		try {
			const res = await axios.post(
				`${apiUrl}/auth/register`,
				registerForm
			)
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	//update infor user
	const updateInforUser = async (updateUserInfor) => {
		try {
			const res = await axios.put(
				`${apiUrl}/user/update/${updateUserInfor.userId}`,
				updateUserInfor
			)
			if (res?.data.success) {
				dispatch({
					type: UPDATE_USER,
					payload: {
						isAuthenticated: true,
						user: res.data.updatedUser,
					},
				})
			}
			return res.data
		} catch (error) {
			if (error.response.data) return error.response.data
			return { success: false, message: error.message }
		}
	}

	// context data
	const authContextData = {
		loginUser,
		authState,
		logoutUser,
		registerUser,
		updateInforUser,
	}

	// return
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
