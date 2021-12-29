import './comment.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import {CommentContext} from '../../context/commentContext'

export default function Comment({ comment }) {

	const PF = 'http://localhost:5000/images/'

	//check use is loging
	const {
		authState: { user },
	} = useContext(AuthContext)

	const {deleteComment} = useContext(CommentContext)

	const handleDeleteComment = async (e) => {
		e.preventDefault();
		try {
			const res = await deleteComment(comment)
			if (res?.success) {
				window.location.reload()
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<div className="comment">
			<div className="commentHeader">
				<img
					className="avatar"
					src={
							comment.userId?.avatar
							? PF + comment.userId?.avatar
							: 'https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg'
						}
					alt="avatar"
				/>
				<p className="commentText">{comment.commentText}</p>
            </div>
            <div className="bodyComment">
                <span className="dateComment">
					{new Date(comment.dateCreated).toDateString()}
				</span>

                {comment.userId?._id === user._id ? (
				<div className="singlePostEditComment">
					<i className="singlePostIcon far fa-edit"></i>
					<i className="singlePostIcon far fa-trash-alt" onClick={handleDeleteComment}></i>
				</div>
			) : (
				<div className="singlePostEditComment">
					<p>Reply</p>
					<i className="singlePostIcon fas fa-heart"></i>
				</div>
			)}
            </div>
		</div>
	)
}
