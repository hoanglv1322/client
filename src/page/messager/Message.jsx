import { React, useContext } from 'react'
import './messager.css'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import { AuthContext } from '../../context/authContext'
import Conversation from '../../component/conversation/Conversation'
import Messager from '../../component/messager/Messager'

export default function Message() {

    const { authState: { user } } = useContext(AuthContext)



    return (
        <div>
            <div className="home">
                <LeftSidebar />
                <div className="messager">
                    <div className="userChats">
                         <span>Chats</span>
                        {user.friends?.map((friend, index) =>
                            <Conversation user={friend} key={index} />
                        )}
                    </div>
                    <div className="wrapperMessager">
                        <div className="userChatting">
                            <Conversation user={user} />
                        </div>
                        <div className="chatBoxTop">
                            <Messager own={true}/>
                            <Messager own={false}/>
                            <Messager own={true}/>
                            <Messager own={false}/>
                            <Messager own={true}/>
                            <Messager own={false} />
                        </div>
                        <div className="chatBoxBottom">
                             <textarea
                                className="chatMessageInput"
                                placeholder="write something...">
                            </textarea>
                            <button className="chatSubmitButton">
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="messager-setting"></div>
                </div>
            </div>
        </div>
    )
}
