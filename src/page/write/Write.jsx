import "./write.css";
import Sidebar from "../../component/sidebar/Sidebar"
import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { PostContext } from "../../context/postContext"
import axios from 'axios'
import LeftSidebar from "../../component/leftSidebar/LeftSidebar";

export default function Write() {

  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [inforPost, setInforPost] = useState({
    titlePost: '',
    typePost: '',
    descPost: '',
  })

  const { titlePost, typePost, descPost } = inforPost
  const { addPost } = useContext(PostContext)

  const onChangeInput = (e) => {
    setInforPost({ ...inforPost, [e.target.name]: e.target.value })
  }

  const createPost = async (e) => {
    e.preventDefault()
    const newPost = { titlePost, typePost, descPost }

    if (file) {
			const data = new FormData()
			const filename = Date.now() + file.name
			data.append('name', filename)
			data.append('file', file)
			newPost.file = filename
			try {
				await axios.post('/upload', data)
			} catch (err) {}
		}
    try {
      const res = await addPost(newPost)
      if (res.success) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }

  }

  return (
	  <div className="writeContainer">
		  	<LeftSidebar />
			<div className="write">
				{file ? (
					<img
						className="writeImg"
						src={URL.createObjectURL(file)}
						alt=""
					/>
			  ) : (
					<img 
						className="writeImg"
						src="https://previews.123rf.com/images/aniwhite/aniwhite1602/aniwhite160200021/51792621-writing-an-article-for-blog-on-computer-flat-illustration.jpg"
						alt=""
					/>
				)}
				<form className="writeForm" onSubmit={createPost}>
					<div className="writeFormGroup">
						<label htmlFor="fileInput">
						  <i className="writeIcon fas fa-file-upload"></i> 
						  Choose a file
						</label>
						<input
							id="fileInput"
							type="file"
							style={{ display: 'none' }}
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<input
							className="writeInput"
							placeholder="Title"
							type="text"
							name="titlePost"
							autoFocus={true}
							value={titlePost}
							onChange={onChangeInput}
						/>
					  <select name="typePost" className="writeInputType" value={ typePost } onChange={onChangeInput}>
        						<option >Choose A Type</option>
        						<option>Sercurity</option>
        						<option>Language Code</option>
        						<option>AI</option>
        						<option>Computer Science</option>
      					</select>
					</div>
					<div className="writeFormGroup">
						<textarea
							className="writeInput writeText"
							placeholder="Tell your story..."
							type="text"
							name="descPost"
							autoFocus={true}
							value={descPost}
							onChange={onChangeInput}
						/>
					</div>
					<button className="writeSubmit" type="submit">
						Upload
					</button>
				</form>
			</div>
			<Sidebar />
		</div>
  )
}
