import { React, useState, useContext } from 'react'
import './user.css'
import { AuthContext } from '../../context/authContext'

export default function Post({ account }) {
	const PF = 'http://localhost:5000/images/'
	const {
		authState: { user },
		addFriend,
		deleteFriend,
	} = useContext(AuthContext)
	const isFriendCurrent = user.friends.includes(account._id)
	const [isFriend, setIsFriend] = useState(isFriendCurrent)

	const updateFriend = async (e) => {
		e.preventDefault()
		setIsFriend(!isFriend)
		const friendId = account._id
		try {
			if (!isFriend) {
				const res = await addFriend(friendId)
				if (res.success) {
					console.log('Happy add')
				}
			} else {
				const res = await deleteFriend(friendId)
				if (res.success) {
					console.log('Happy delete')
				}
			}
		} catch (error) {
			console.log(error.message)
		}
	}
	return (
		<div>
			<div className="user">
				{account.avatar && (
					<img
						className="avatarImg"
						src={PF + account.avatar}
						alt=""
					/>
				)}
				<h4>{account.username}</h4>
				<button onClick={updateFriend}>
					{isFriend ? 'Unfollow' : 'Follow'}
				</button>
			</div>
		</div>
	)
}
