import { Link, useNavigate } from 'react-router-dom'
import { React, useState, useContext } from 'react'
import './login.css'
import { AuthContext } from '../../context/authContext'

export default function Login() {
	const [loginForm, setFormLogin] = useState({
		email: '',
		password: '',
	})
	const [typePass, setTypePass] = useState(true)
	const[error, setError] = useState('')
	const { email, password } = loginForm

	const { loginUser } = useContext(AuthContext)
	const navigate = useNavigate()

	const onChangeFormLogin = (e) => {
		setFormLogin({ ...loginForm, [e.target.name]: e.target.value })
	}

	const login = async (e) => {
		e.preventDefault()
		try {
			const loginData = await loginUser(loginForm)
			console.log(loginData)
			if (loginData.success) {
				navigate('/')
			}
			setError(loginData.message)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={login}>
				<label>Email</label>
				<input
					className="loginInput"
					type="text"
					name="email"
					value={email}
					placeholder="Enter your email..."
					onChange={onChangeFormLogin}
				/>
				<label>Password</label>
				<input
					className="loginInput"
					type={typePass ? 'password' : 'text'}
					name="password"
					value={password}
					placeholder="Enter your password..."
					onChange={onChangeFormLogin}
				/>
				<small
					className="showPass"
					onClick={() => setTypePass(!typePass)}
				>
					{typePass ? 'Show' : 'Hide'}
				</small>
				<button className="loginButton" type="submit">
					Login
				</button>
			</form>
			<button className="loginRegisterButton">
				<Link to="/register" className="link">
					Register
				</Link>
			</button>
			{
				error && (<p className="error">{error}</p>)
			}
		</div>
	)
}
