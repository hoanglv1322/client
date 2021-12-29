import { Link, useNavigate } from 'react-router-dom'
import { React, useContext, useState, useEffect } from 'react'
import './topBar.css'
import { AuthContext } from '../../context/authContext'
import {PostContext} from '../../context/postContext'

export default function TopBar() {
	const PF = 'http://localhost:5000/images/'
	const {
		authState: { isAuthenticated, user },
		logoutUser,
	} = useContext(AuthContext)
	const { postState: { posts }, } = useContext(PostContext)

	const [valueSearch, setValueSearch] = useState('')

	const [result, setResult] = useState([])

	const searchPost = () => {
		if (valueSearch.length > 0) {
			const resultPost = posts?.filter((post) => post?.titlePost.includes(valueSearch))
			setResult(resultPost)
		}
		else {
			setResult([])
		}
	}

	useEffect(() => {
		searchPost()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valueSearch])

	const navigate = useNavigate()

	const handleLogout = () => {
		logoutUser()
		navigate('/login')
	}

	return (
		<div className="topBar">
			<div className="left-Top">
				<i className="top-icon fab fa-facebook-square"></i>
				<i className="top-icon fab fa-instagram"></i>
				<i className="top-icon fab fa-twitter-square"></i>
			</div>
			<div className="center-Top">
				<ul className="topList">
					<li className="topListItem">
						<Link to="/" className="link">
							HOME
						</Link>
					</li>
					<li className="topListItem">ABOUT</li>
					<li className="topListItem">CONTACT</li>
					<li className="topListItem">
						<Link to="/write" className="link">
							WRITE
						</Link>
					</li>
				</ul>
			</div>
			<div className="right-Top">
				<div className="searchTop">
					<input type="text" name="name" onChange={(e)=> setValueSearch(e.target.value)}/>
					<i className="fas fa-search"></i>
				</div>
				<i className="top-icon far fa-bell"></i>
				{isAuthenticated ? (
					<div className="avatar-logo">
						<Link className="link" to="/setting">
							<img
								className="topAvatar"
								src={
									user?.avatar
										? PF + user.avatar
										: 'https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg'
								}
								alt="avatar"
							/>
						</Link>
						<button className="logout" onClick={handleLogout}>
							LOGOUT
						</button>
					</div>
				) : (
					<ul className="topList topListleft">
						<li className="topListItem">
							<Link className="link" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
			</div>
			<div className="result-search" style={{display:  result.length > 0 ? 'block':'none'}}>
				{result && result.map((post) => 
						<div className="post-result">
							{post.file && (
								<img
									src={PF + post.file}
									alt=""
									className="singlePostImg"
								/>
							)}
							<div className="post-infor">
								<span className="postCat">Type Post: {post.typePost}</span>
								<h4 className="postTitle">
									<Link to={`/post/${post._id}`} className="link">
										{post.titlePost}
									</Link>
								</h4>
								<div className="postDate">
									<div>Author: {post.author && post.author.username}</div>
									<div>{new Date(post.dateCreated).toDateString()}</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
	)
}
