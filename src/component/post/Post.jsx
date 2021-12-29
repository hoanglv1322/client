import { Link } from 'react-router-dom'
import './post.css'
import { useState, useContext } from 'react'
import { PostContext } from '../../context/postContext'
import { AuthContext } from '../../context/authContext'

export default function Post({ post }) {
	const PF = 'http://localhost:5000/images/'

	//use context
	const { updateStatusPost, deleteStatusPost } = useContext(PostContext)
	const {
		authState: { user },
	} = useContext(AuthContext)

	const isLiked = post?.userLikePost?.includes(user?._id)
	const [like, setLike] = useState(isLiked)
	const [sumLike, setSumLike] = useState(post.sumLike)
	var likeUpdate

	const updateStatus = async (e) => {
		e.preventDefault()
		setLike(!like)
		try {
			if (!like) {
				likeUpdate = sumLike + 1
				setSumLike(likeUpdate)
				const postUpdate = {
					sumLike: likeUpdate,
					postId: post._id,
				}
				const res = await updateStatusPost(postUpdate)
				if (res.success) {
				}
			} else {
				likeUpdate = sumLike - 1
				setSumLike(likeUpdate)
				const postUpdate = {
					sumLike: likeUpdate,
					postId: post._id,
				}
				const res = await deleteStatusPost(postUpdate)
				if (res.success) {
				}
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div className="post">
			{post.file && (
				<img className="postImg" src={PF + post.file} alt="" />
			)}

			<div className="postInfo">
				<div className="postCats">
					<span className="postCat">Type Post: {post.typePost}</span>
				</div>
				<span className="postTitle">
					<Link to={`/post/${post._id}`} className="link">
						{post.titlePost}
					</Link>
				</span>
				<hr />
				<div className="postDate">
					<div>Author: {post.author && post.author.username}</div>
					<div>{new Date(post.dateCreated).toDateString()}</div>
				</div>

				<p className="postDesc">{post.descPost}</p>
			</div>
			<div className="postStatus">
				<span>
					<i
						className="status-icon fab fa-gratipay"
						style={{ color: like ? 'red' : 'black' }}
						onClick={updateStatus}
					></i>
					{sumLike}
				</span>
				<span>
					<i className="status-icon far fa-comment-alt"></i>
					123
				</span>
			</div>
		</div>
	)
}
