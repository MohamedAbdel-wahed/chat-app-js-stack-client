import React, { useState,useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { UsersContext } from '../contexts/UsersContext'


const SEND_REQUEST= gql`
  mutation  sendRequest($to:String!){
       sendRequest(to:$to){
           to from
       }
   }

`

function SendRequest () {
    if(!localStorage.getItem('token')) window.location.href="/login"
    
    const [recipients,setRecipients]= useState([])
    const { usersState }= useContext(UsersContext)
    let { users }= usersState

    const [sendRequest]=useMutation(SEND_REQUEST, {
        onCompleted: (data)=> users= users.filter(user=> user.username===data.sendRequest.to)
    })

   const addUser= (username)=> {
        setRecipients([...recipients, username])
        sendRequest({ variables: {to: username} })     
    }

    return (
        <ul className="my-3 mx-2  xs:mx-3 sm:mx-6 overflow-auto h-full">
            {
                users && users.length>0 ? users.map(({username,imgPath})=>{
                    return (
                        <li key={username} className="mt-2 py-2 flex justify-between items-center border-b border-gray-300">
                            <div className="flex items-center">
                                <img src={`/svg/avatars/${imgPath}.svg`} className="w-10 h-10 rounded-full border border-gray-200" alt="user avatar" />
                                <h1 className="ml-1 xS:ml-2 text-sm sm:text-lg font-bold sm:font-semibold text-blue-900">{username}</h1>
                            </div>
                            <div>
                                {
                                    recipients && recipients.includes(username) 
                                    ? (<div className="text-sm text-green-600 font-semibold">request sent</div>)
                                    : (<button onClick={()=> addUser(username)} className="px-2 xs:px-3 py-1 bg-indigo-600 text-xs xs:text-sm font-bold text-white rounded-lg opacity-100 focus:outline-none focus:opacity-75 transition-all duration-400 ease-in-out">Add Friend</button>)
                                }
                            </div>
                        </li>
                    )
                }) : (<div className="text-3xl text-gray-500 font-bold text-center mt-20">No Users Found</div>)
            }
           
        </ul>
    )
}

export default SendRequest