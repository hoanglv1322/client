import "./sidebar.css"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img 
                    src="https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg"
                    alt="avatar"
                />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    <li className="sidebarListItem">Life</li>
                    <li className="sidebarListItem">Music</li>
                    <li className="sidebarListItem">Style</li>
                    <li className="sidebarListItem">Sport</li>
                    <li className="sidebarListItem">Tech</li>
                    <li className="sidebarListItem">Cinema</li>
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <ul className="sidebarSocial">
                    <i className="sidebar-icon fab fa-facebook-square"></i>
                    <i className="sidebar-icon fab fa-instagram"></i>
                    <i className="sidebar-icon fab fa-twitter-square"></i>
                    <i className="sidebar-icon fab fa-pinterest-square"></i>
                </ul>
            </div>

        </div>
    )
}
