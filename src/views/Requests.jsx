import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import { getRecievers,getSenders } from '../actions/users'
import { UsersContext } from '../contexts/UsersContext'
import CancelRequest from '../components/CancelRequest'
import ManageRecievedRequest from '../components/ManageRecievedRequest'


const GET_RECIEVERS= gql`
   query sentRequests {
       sentRequests {
          username imgPath
       }
   }
`

const GET_SENDERS= gql`
   query recievedRequests {
       recievedRequests {
          username imgPath
       }
   }
`

function Requests() {

    const [tab,setTab]= useState('recieved')
    const [canceled,setCanceled]= useState([])
    const [accepted,setAccepted]= useState([])
    const [rejected,setRejected]= useState([])
    const { usersState, dispatch }= useContext(UsersContext)
    const { senders,recievers }= usersState

    useQuery(GET_RECIEVERS, {
        fetchPolicy: "no-cache",
        onCompleted: (data)=> dispatch(getRecievers(data.sentRequests)),
    })

    useQuery(GET_SENDERS, {
        fetchPolicy: "no-cache",
        onCompleted: (data)=> dispatch(getSenders(data.recievedRequests)),
    })


    return (
        <div id="requests" className="w-full h-full px-0 sm:px-10 md:px-24 lg:px-32 xl:px-56 pt-10 select-none"> 
            <div className="flex text-sm xs:text-lg font-bold text-gray-700 bg-white rounded-tl-lg rounded-tr-lg">
                <div onClick={()=> setTab('recieved')} className={`w-1/2 py-3 flex justify-center items-center cursor-pointer border-b-2 bg-tr ${tab==="recieved" ? 'border-blue-600 bg-blue-100' : 'border-blue-200' }`}>New Requests</div>
                <div onClick={()=> setTab('sent')} className={`w-1/2 py-3 flex justify-center items-center cursor-pointer border-b-2 ${tab==="sent" ? 'border-blue-600 bg-blue-100' : 'border-blue-200' }`}>Your Requests</div>
            </div>
                {
                    tab==="sent" ? (
                    <div id="requests_box" className="w-full pt-4 pb-8 lg:px-32 bg-white rounded-bl-lg rounded-br-lg shadow-sm">
                        <ul className="my-3 mx-6 overflow-auto h-full">
                            {
                                recievers && recievers.length>0 ? recievers.map(({username,imgPath},index)=>{
                                    return (
                                        <li key={username} className={`mt-2 py-2 px-0 xs:px-2 sm:px-6 flex justify-between items-center ${index<recievers.length-1 && 'border-gray-300 border-b'}`}>
                                            <div className="flex items-center">
                                                <img src={`/svg/avatars/${imgPath}.svg`} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border border-gray-200" alt="user avatar" />
                                                <h1 className="ml-1 xs:ml-2 text-sm xs:text-base sm:text-lg font-bold sm:font-semibold text-blue-900">{username}</h1>
                                            </div>
                                            <div>
                                                {
                                                    !canceled.includes(username) 
                                                    ? (<CancelRequest username={username} setCanceled={setCanceled} canceled={canceled} />)
                                                    : (<div className="text-sm text-red-600">canceled</div>)
                                                }
                                            </div>
                                        </li>
                                    )
                                }) : (<Link to="/explore" className="inline-block flex justify-center text-xl text-blue-600 font-semibold text-center mt-20 hover:underline">Find New Friends</Link>)
                            }
                        </ul>
                    </div>)
                : (<div id="requests_box" className="w-full pt-4 pb-8 xs:px-2 sm:px-6 md:px-12 lg:px-24 bg-white rounded-bl-lg rounded-br-lg shadow-sm">
                        <ul className="my-3 mx-0 sm:mx-6 overflow-auto h-full">
                            {
                                senders && senders.length>0 ? senders.map(({username,imgPath},index)=>{
                                    return (
                                        <li key={username} className={`mt-2 py-2 px-2 sm:px-6 flex justify-between items-center ${index<recievers.length-1 && 'border-gray-300 border-b'}`}>
                                            <div className="flex items-center">
                                                <img src={`/svg/avatars/${imgPath}.svg`} className="w-10 h-10 rounded-full border border-gray-200" alt="user avatar" />
                                                <h1 className="sm:ml-2 text-sm xs:text-base sm:text-lg font-bold sm:font-semibold text-blue-900">{username}</h1>
                                            </div>
                                            <div>
                                                {
                                                    !accepted.includes(username) 
                                                    && !rejected.includes(username)
                                                    && (<ManageRecievedRequest username={username} setAccepted={setAccepted} accepted={accepted} setRejected={setRejected} rejected={rejected} />)
                                                }

                                                {
                                                    accepted.includes(username) && (<div className="text-sm text-green-600">accepted</div>)
                                                }

                                                {
                                                    rejected.includes(username) && (<div className="text-sm text-red-600">rejected</div>)
                                                }
                                                
                                            </div>
                                        </li>
                                    )
                                }) : (<div className="text-2xl text-gray-500 font-bold text-center mt-20">No Requests Found</div>)
                            }
                        </ul>
                    </div>)
                }
               
        </div>
    )
}

export default Requests
