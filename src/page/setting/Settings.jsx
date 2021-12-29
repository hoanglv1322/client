import './settings.css'
import Sidebar from '../../component/sidebar/Sidebar'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import { AuthContext } from '../../context/authContext'
import { useState, useContext } from 'react'
import axios from 'axios'

export default function Setting() {
	const [file, setFile] = useState(null)

	const PF = 'http://localhost:5000/images/'

	//use context
	const {
		updateInforUser,
		authState: { user },
	} = useContext(AuthContext)

	const [userInfor, setUserInfor] = useState(user)
	const { username, email, password } = userInfor

	const onChangeInput = (e) => {
		setUserInfor({ ...userInfor, [e.target.name]: e.target.value })
	}

	const updateUser = async (e) => {
		e.preventDefault()
		const updateUserInfor = { username, email, password }
		if (file) {
			const data = new FormData()
			const filename = Date.now() + file.name
			data.append('name', filename)
			data.append('file', file)
			updateUserInfor.avatar = filename
			try {
				await axios.post('/upload', data)
			} catch (err) {}
		}

		try {
			updateUserInfor.userId = user._id
			const res = await updateInforUser(updateUserInfor)
			if (res?.success) {
				console.log('Happy')
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="setting-container">
			<LeftSidebar />
			<div className="settings">
				<div className="settingsTitle">
					<span className="settingsTitleUpdate">Public Profile</span>
				</div>
				<div className="settingsForm">
					<div className="settingsPP">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: user.avatar
									? PF + user.avatar
									: 'https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg'
							}
							alt=""
						/>

						<label htmlFor="fileInput">
							<i className="settingsPPIcon fas fa-camera"></i>{' '}
						</label>
						<input
							id="fileInput"
							type="file"
							style={{ display: 'none' }}
							className="settingsPPInput"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>

					<div className="inputItem">
						<label>Username</label>
						<input
							type="text"
							placeholder="user name..."
							name="username"
							value={username}
							onChange={onChangeInput}
						/>
					</div>
					<div className="inputItem">
						<label>Email</label>
						<input
							type="text"
							placeholder="student"
							name="email"
							value={email}
							onChange={onChangeInput}
						/>
					</div>
					<div className="inputItem">
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={onChangeInput}
						/>
					</div>
					<button
						className="settingsSubmitButton"
						onClick={updateUser}
					>
						Update
					</button>
				</div>
			</div>
			<Sidebar />
		</div>
	)
}
