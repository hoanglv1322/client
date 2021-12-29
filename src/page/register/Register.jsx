import { Link } from 'react-router-dom'
import './register.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'

export default function Register() {
	const [formRegsiter, setFormRegsiter] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [isSuccess, setIsSuccess] = useState(false)
	const [messages, setMessages] = useState([])

	const { username, email, password, confirmPassword } = formRegsiter
	const { registerUser } = useContext(AuthContext)

	const onChangeFormRegsiter = (e) => {
		setFormRegsiter({ ...formRegsiter, [e.target.name]: e.target.value })
	}

	const styleError = {
		color: 'red',
		marginTop: '8px',
		fontSize: '18px',
		fontWeight: 'bold',
	}

	const styleSucess = {
		color: 'green',
		marginTop: '8px',
		fontSize: '18px',
		fontWeight: 'bold',
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await registerUser(formRegsiter)
			if (res.success) {
				setIsSuccess(true)
			}
			setMessages(res.message)
		} catch (error) {
			if (error.response.data) {
				console.log(error.response.data)
			}
		}
	}

	return (
		<div className="register">
			<span className="registerTitle">Register</span>
			<form className="registerForm" onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					className="registerInput"
					type="text"
					name="username"
					value={username}
					placeholder="Enter your username..."
					required
					onChange={onChangeFormRegsiter}
				/>
				<label>Email</label>
				<input
					className="registerInput"
					type="email"
					name="email"
					required
					value={email}
					placeholder="Enter your email..."
					onChange={onChangeFormRegsiter}
				/>
				<label>Password</label>
				<input
					className="registerInput"
					type="password"
					name="password"
					required
					value={password}
					placeholder="Enter your password..."
					onChange={onChangeFormRegsiter}
				/>
				<label>Confirm Password</label>
				<input
					className="registerInput"
					type="password"
					name="confirmPassword"
					required
					value={confirmPassword}
					placeholder="Confirm your password..."
					onChange={onChangeFormRegsiter}
				/>
				<button className="registerButton" type="submit">
					Register
				</button>
			</form>
			<button className="registerLoginButton">
				<Link to="/login" className="link">
					Login
				</Link>
			</button>

			{messages.map((error, index) => (
				<p
					className="error"
					key={index}
					style={isSuccess ? styleSucess : styleError}
				>
					{error}
				</p>
			))}
		</div>
	)
}
