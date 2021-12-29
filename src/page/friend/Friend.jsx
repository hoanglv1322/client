import { React, useContext, useEffect, useState } from 'react'
import './friend.css'
import LeftSidebar from '../../component/leftSidebar/LeftSidebar'
import { AuthContext } from '../../context/authContext'
import User from '../../component/user/User'


export const Friend = () => {


    const { authState: { user }, getAllAccounts } = useContext(AuthContext)
    const [listUsers, setListUsers] = useState([])
   

    useEffect(() => {
        const getListAccount = async () => {
        try {
            const res = await getAllAccounts()
            if (res.success) {
                console.log(res.allAccounts)
                console.log(user._id)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                const list = res.allAccounts.filter(account => (account._id !== user._id))
                setListUsers(list)
            }
        } catch (error) {
            console.error(error)
        }
        }
        getListAccount()
       
    }, [getAllAccounts, user._id])

    return (
        <div>
            <div className="home">
                <LeftSidebar />
                <div className="friends-container">
                    {listUsers.map((account, index) =>
                       <User account={account} key={index} />
                    )}
                </div>
            </div>
        </div>
    )
}
