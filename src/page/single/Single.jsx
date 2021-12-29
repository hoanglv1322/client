import './single.css'
import Sidebar from '../../component/sidebar/Sidebar'
import SinglePost from '../../component/singlePost/SinglePost'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'

export default function Single() {
	return (
		<div className="single">
			<LeftSidebar />
			<SinglePost />
			<Sidebar />
		</div>
	)
}
