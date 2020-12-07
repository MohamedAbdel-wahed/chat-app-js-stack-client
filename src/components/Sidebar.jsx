import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import classNames from 'classnames'
import { AuthContext } from '../contexts/AuthContext'
import { MessagesContext } from '../contexts/MessagesContext'
import { getSelectedUser } from '../actions/messages'
import { getFriends } from '../actions/messages'



const FRIEND_LATESTMSG= gql`
  query friend_message {
      friend_message {
          username imgPath latestMsg {
              to from content createdAt
          }
      }
  }
`

function Sidebar({hidden,setHidden}) {
    if(!localStorage.getItem('token')) window.location.href="/login"
    
    const { authState }= useContext(AuthContext)
    const {currentUser}= authState
    const { msgDispatch }= useContext(MessagesContext)
    const [friends,setFriends]= useState(null)
    const [selectedUser,setSelectedUser]= useState({})

    const { loading, data }= useQuery(FRIEND_LATESTMSG, {
        fetchPolicy: 'no-cache',
        onError: ()=> window.location.href= "/login",
        onCompleted: (data)=> {
            setFriends(data.friend_message)
            msgDispatch(getFriends(data.friend_message))
        }
    })

    const limitStr= (str)=> str.length>20 ? str.slice(0,20)+'...' : str

     useEffect(()=>{
        selectedUser && msgDispatch(getSelectedUser(selectedUser))
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[selectedUser])

    let markup=null
    if(loading && !data){
         markup= (<div className="text-center mt-10">
                        <p className="text-2xl font-bold text-gray-500">Loading...</p>
                    </div>)   
    }
    else if(!loading && friends && friends.length===0) {
         markup= (<div className="text-center mt-10">
                        <p className="text-2xl font-bold text-gray-600">No Friends Found</p>
                        <Link to="/explore" className="mt-2 text-blue-500 hover:underline">Find Friends</Link>
                    </div>)
    }
    else {
         markup= friends && friends.map(({username,imgPath,latestMsg})=>{
            const selected= selectedUser.username===username
            return (
                <div key={username} onClick={ ()=> { setSelectedUser({username,imgPath}); setHidden(true) } } className={ classNames("flex items-center py-3 px-4 cursor-pointer", { 'bg-white': selected, 'hover:bg-gray-300': !selected }) }>
                    <div className="">
                        <img src={`/svg/avatars/${imgPath}.svg`} className="w-12 h-12 rounded-full border border-gray-200" alt="user avatar" />
                    </div>
                    <div className="flex flex-col ml-3 w-10/12">
                        <h1 className="text-gray-800 font-semibold">{username}</h1>
                        <p className="text-sm text-gray-600 w-full">
                           {
                               latestMsg ? (<>
                                            <span className="font-bold">{ latestMsg.from===currentUser.username ? 'You' : latestMsg.from}:</span>
                                            <span className="ml-1">{ limitStr(`${latestMsg.content}`) }</span>
                                           </>)
                                        : (<span>...</span>)
                           }
                        </p>
                    </div>
                </div>
            )
        })
    }
    
    const filterFriends= (e)=> {
        let input= e.target.value
        input= input.replace("[","-")
        const filtered= !loading && data && data.friend_message.filter(friend=> friend.username.match(input))
        setFriends(filtered)
    }
    
    const authImg= currentUser && currentUser.imgPath==="default"
     
    return (
        <div id="sidebar" className={`w-full relative border-r ${hidden && 'z-30'}`}>
            <div id="header" className="relative py-3 px-4 lg:px-6 flex items-center select-none">
                {
                    currentUser && (<div className={classNames("rounded-full mr-auto", {'border-2': !authImg, 'border-blue-400': !authImg})}>
                                        <img src={`/svg/avatars/${currentUser.imgPath}.svg`} className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 border-white" alt="user avatar" />
                                    </div>)
                }
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-gray-800">Pensa</h1>
                <Link to="/edit" className="ml-auto">
                    <img src="/svg/edit.svg" className="w-5 sm:w-6" alt="edit icon" title="Edit Profile Info" />
                </Link>
            </div>
            <div id="search" className="pt-2 pb-3 px-6 md:px-10 flex justify-center rounded-lg">
                <input type="text" onChange={filterFriends} className="w-full px-4 py-1 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-gray-400 focus:shadow-sm bg-white text-sm sm:text-base font-semibold text-gray-700" placeholder="Search" />
            </div>
            <div id="friends" className="overflow-auto select-none">
                { markup && markup }               
            </div>
        </div>
    )
}

export default Sidebar
