import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AuthContextProvider from './context/authContext'
import PostContextProvider from './context/postContext'
import CommentContextProvider from './context/commentContext'

ReactDOM.render(
	<React.StrictMode>
		<AuthContextProvider>
			<PostContextProvider>
				<CommentContextProvider>
					<App />
				</CommentContextProvider>
			</PostContextProvider>
		</AuthContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
