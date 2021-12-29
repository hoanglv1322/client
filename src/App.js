import './App.css'
import TopBar from './component/topbar/TopBar'
import Home from './page/home/Home'
import Login from './page/login/Login'
import Register from './page/register/Register'
import Setting from './page/setting/Settings'
import Single from './page/single/Single'
import Write from './page/write/Write'
import Footer from './component/footer/Footer'
import MyPost from './page/myPost/MyPost'
import Message from './page/messager/Message'
import { Friend } from './page/friend/Friend'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { React, useContext } from 'react'
import { AuthContext } from '../src/context/authContext'

function App() {
	const {
		authState: { isAuthenticated },
	} = useContext(AuthContext)

	return (
		<BrowserRouter>
			<TopBar />
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />

				<Route path="/" element={<Home />} />
				<Route
					path="/write"
					element={isAuthenticated ? <Write /> : <Login />}
				/>
				<Route
					path="/post/:postID"
					element={isAuthenticated ? <Single /> : <Login />}
				/>

				<Route
					path="/setting"
					element={isAuthenticated ? <Setting /> : <Login />}
				/>

				<Route
					path="/mypost"
					element={isAuthenticated ? <MyPost /> : <Login />}
				/>

				<Route
					path="/friends"
					element={isAuthenticated ? <Friend /> : <Login />}
				/>

				<Route
					path="/messager"
					element={isAuthenticated ? <Message /> : <Login />}
				/>
			</Routes>
			<Footer />
		</BrowserRouter>
	)
}

export default App
