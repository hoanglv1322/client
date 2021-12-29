import React from 'react'
import './messager.css'

export default function Messager({ own }) {
	return (
		<div>
			<div className={own ? 'message own' : 'message'}>
				<div className="messageTop">
					<p className="messageText">
						hello world i am from viet nam, i very happy to meet you
					</p>
				</div>
				<div className="messageBottom">1 hour ago</div>
			</div>
		</div>
	)
}
