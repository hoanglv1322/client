import { React, useState, useContext, useEffect } from 'react'
import './user.css'
import { AuthContext } from '../../context/authContext'

export default function Post({ account }) {
	const PF = 'http://localhost:5000/images/'
	const {
		authState: { user },
		addFriend,
		deleteFriend,
	} = useContext(AuthContext)

	const [isFriend, setIsFriend] = useState(false)

	useEffect(() => {
		let isFriendCurrent = false
		user.friends?.forEach((friend) => {
			if (friend._id === account._id) {
				isFriendCurrent = true
				setIsFriend(isFriendCurrent)
				return isFriendCurrent
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account])

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
