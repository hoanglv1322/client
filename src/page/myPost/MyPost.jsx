import './myPost.css'
import Posts from '../../component/posts/Posts'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import { useContext } from 'react'
import { PostContext } from '../../context/postContext'
import { AuthContext } from '../../context/authContext'

export default function MyPost() {
	const {
		postState: { posts },
	} = useContext(PostContext)

	const {
		authState: { user },
	} = useContext(AuthContext)

	const myPost = posts.filter((post) => post.author._id === user._id)
	const myLikePost = posts.filter((post) => post.userLikePost.includes(user._id))

	return (
		<div>
			<div className="home">
				<LeftSidebar />
				<div className="mypostcontainer">
					<div className="myPosts">
						<h1>My Posts</h1>
						<Posts posts={myPost} postsPerPage={4} />
					</div>
					<hr />
					<div className="myPosts">
						<h1>My posts favourites </h1>
						<Posts posts={myLikePost} postsPerPage={4} />
					</div>
				</div>
			</div>
		</div>
	)
}
