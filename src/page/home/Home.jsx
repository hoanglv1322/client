import './home.css'
import Posts from '../../component/posts/Posts'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import { useContext } from 'react'
import { PostContext } from '../../context/postContext'

export default function Home() {
	const {
		postState: { posts },
	} = useContext(PostContext)
	return (
		<div>
			<div className="home">
				<LeftSidebar />
				<Posts posts={posts} postsPerPage={8} />
			</div>
		</div>
	)
}
