import './posts.css'
import React, { useState } from 'react'
import Post from '../post/Post'
import ReactPaginate from 'react-paginate'

export default function Posts({ posts, postsPerPage }) {
	const [pageNumber, setPageNumber] = useState(0)
	const pagesVisited = pageNumber * postsPerPage

	const displayPosts = posts
		.slice(pagesVisited, pagesVisited + postsPerPage)
		.map((p, index) => {
			return <Post key={index} post={p} />
		})

	const pageCount = Math.ceil(posts.length / postsPerPage)

	const changePage = ({ selected }) => {
		setPageNumber(selected)
	}

	return (
		<div className="posts">
			<div className="posts-continer">{displayPosts}</div>
			<ReactPaginate
				previousLabel={'Previous'}
				nextLabel={'Next'}
				pageCount={pageCount}
				onPageChange={changePage}
				containerClassName={'paginationBttns'}
				previousLinkClassName={'previousBttn'}
				nextLinkClassName={'nextBttn'}
				disabledClassName={'paginationDisabled'}
				activeClassName={'paginationActive'}
			/>
		</div>
	)
}
