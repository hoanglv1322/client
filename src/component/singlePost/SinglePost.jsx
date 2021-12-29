import Comment from '../comment/Comment'
import './singlePost.css'
import { PostContext } from '../../context/postContext'
import { AuthContext } from '../../context/authContext'
import { CommentContext } from '../../context/commentContext'
import { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

export default function SinglePost() {
	const location = useLocation()
	const postId = location.pathname.split('/')[2]
	const PF = 'http://localhost:5000/images/'
	const [updateMode, setUpdateMode] = useState(false)
	const [isAddComment, setIsAddComment] = useState(false)
	const [titlePost, setTitlePost] = useState('')
	const [descPost, setDescPost] = useState('')
	const [post, setPost] = useState({})
	const [comment, setComment] = useState('')
	const [comments, setComments] = useState([])

	//use context
	const { getDetail, updatePost, deletePost } = useContext(PostContext)
	const {
		authState: { user },
	} = useContext(AuthContext)
	const { getComment, addComment } = useContext(CommentContext)

	//navigate to

	const navigate = useNavigate()

	//get post detail and comment of post
	useEffect(() => {
		const getPost = async () => {
			try {
				const postData = await getDetail(postId)
				setPost(postData.post)
				setTitlePost(postData.post.titlePost)
				setDescPost(postData.post.descPost)
			} catch (error) {
				console.log(error)
			}
		}
		const getCommentPost = async () => {
			try {
				const commentData = await getComment(postId)
				setComments(commentData.comments)
				console.log(commentData)
			} catch (error) {}
		}
		getCommentPost()
		getPost()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDetail, postId, updateMode, isAddComment])
	
	//update post
	const handleUpdate = async (e) => {
		e.preventDefault()
		const updatedPostData = {
			titlePost,
			typePost: post.typePost,
			descPost,
			_id: post._id,
		}
		try {
			const res = await updatePost(updatedPostData)
			if (res?.success) {
				setUpdateMode(false)
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	//delete post
	const handleDelete = async (e) => {
		e.preventDefault()
		try {
			const res = await deletePost(post._id)
			if (res?.success) {
				navigate('/')
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	//add comment
	const handleAddComment = async (e) => {
		e.preventDefault()
		const commentAdd = {
			postId,
			userId: user._id,
			commentText: comment
		}
		setComment('')
		try {
			const res = await addComment(commentAdd)
			if (res?.success) {
				setIsAddComment(true)
			}	
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div className="singlePost">
			{post && (
				<div className="singlePostWrapper">
					{post.file && (
						<img
							src={PF + post.file}
							alt=""
							className="singlePostImg"
						/>
					)}
					{updateMode ? (
						<input
							type="text"
							className="singlePostTitleInput"
							autoFocus
							value={titlePost}
							onChange={(e) => {
								setTitlePost(e.target.value)
							}}
						/>
					) : (
						<h1 className="singlePostTitle">
							{post.titlePost}
							{post.author?.username === user?.username && (
								<div className="singlePostEdit">
									<i
										className="singlePostIcon far fa-edit"
										onClick={() => {
											setUpdateMode(true)
										}}
									></i>
									<i
										className="singlePostIcon far fa-trash-alt"
										onClick={handleDelete}
									></i>
								</div>
							)}
						</h1>
					)}

					<div className="singlePostInfo">
						<span className="singlePostAuthor">
							Author:{post.author && post.author.username}
						</span>
						<span className="singlePostDate">
							{new Date(post.dateCreated).toDateString()}
						</span>
					</div>
					{updateMode ? (
						<textarea
							className="singlePostDescInput"
							type="text"
							value={descPost}
							onChange={(e) => {
								setDescPost(e.target.value)
							}}
						/>
					) : (
						<p className="singlePostDesc">{post.descPost}</p>
					)}
					{updateMode && (
						<button
							className="singlePostButton"
							onClick={handleUpdate}
						>
							Update
						</button>
					)}
				</div>
			)}

			<div className="commentArea">
				<div className="commentInput">
					<img
						className="avatar"
						src={
							user?.avatar
							? PF + user.avatar
							: 'https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg'
						}
						alt="avatar"
					/>
					<input type="text" placeholder="input your comment" onChange={(e) => setComment(e.target.value)} value={comment}/>
					<button onClick={handleAddComment} className="btnComment">
						<i className="fas fa-paper-plane"></i>
					</button>
				</div>
				<hr />
				{comments?.map((comment, index) => (
					<Comment key={index} comment={comment} />
				))}
			</div>
		</div>
	)
}
