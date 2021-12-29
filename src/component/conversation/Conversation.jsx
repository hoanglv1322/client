import React from 'react'
import './conversation.css'

export default function Conversation({ user }) {
    const PF = 'http://localhost:5000/images/'
    return (
        <div>
            <div className="conversation">
                <img
                    className="conversationImg"
                    src={
                        user?.avatar
                        ? PF + user.avatar
                        : 'https://lh3.googleusercontent.com/proxy/_MDudM9bCqDES3gQQkPIsDF3TWhlWMNzE4y4Mj4aO7tuaQZDmXFNQ_uJAfuPhOPAKMZelTVCl_t6Kz2Ht-mIoiiWT18vUoLdEMrjYF039A'
                    }
                    alt=""
                />
                <span className="conversationName">{user?.username}</span>
            </div>
        </div>
    )
}
