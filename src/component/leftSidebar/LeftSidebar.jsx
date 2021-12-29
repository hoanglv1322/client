import './leftSidebar.css'
import { Link } from 'react-router-dom'

export default function LeftSidebar() {
	return (
		<div className="leftSidebar">
			<div className="leftItem">
				<i className="icon fab fa-facebook-messenger"></i>
				<p>Chat</p>
			</div>
			<div className="leftItem">
				<Link to="/friends" className="link">
					<i className="icon fas fa-user-friends"></i>
					<p>Friends</p>
				</Link>
			</div>
			<div className="leftItem">
				<i className="icon fas fa-music"></i>
				<p>Music</p>
			</div>
			<div className="leftItem">
				<i className="icon fas fa-cogs"></i>
				<p>Setting</p>
			</div>
			<div className="leftItem">
				<Link to="/mypost" className="link">
					<i className="icon fas fa-book"></i>
					<p>My Post</p>
				</Link>
			</div>
		</div>
	)
}
