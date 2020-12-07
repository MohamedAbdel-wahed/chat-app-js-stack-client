import React, { useState, useContext, useEffect } from 'react'
import { gql, useQuery, useSubscription } from '@apollo/client'
import Messages from '../components/Messages'
import Sidebar from '../components/Sidebar'
import { AuthContext } from '../contexts/AuthContext'
import { MessagesContext } from '../contexts/MessagesContext'
import { getCurrentUser } from '../actions/auth'
import { addMessage } from '../actions/messages'


const CURRENT_USER= gql`
    query currentUser{
        currentUser {
            username imgPath
        }
    }
`

const GET_NEW_MESSAGE_ON_WS= gql`
    subscription newMessage{
        newMessage {
            uuid to from content createdAt
        }
    }
`

function Home() {
    if(!localStorage.getItem('token')) window.location.href="/login"
    

 

    const [hidden,setHidden]= useState(true)


    const { dispatch }= useContext(AuthContext)
    const { msgState, msgDispatch } = useContext(MessagesContext)
    const { selectedUser }= msgState

    const [currentUser,setCurrentUser]= useState(null)
    useQuery(CURRENT_USER, {
        fetchPolicy: 'no-cache',
        onCompleted: data=> setCurrentUser(data.currentUser)
    })

    useEffect(()=>{
       currentUser && dispatch(getCurrentUser(currentUser))
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])


    const {data:newMsgData, error:newMsgError}= useSubscription(GET_NEW_MESSAGE_ON_WS)
        
   useEffect(()=>{
        newMsgError && console.log(newMsgError)
        newMsgData && msgDispatch(addMessage(newMsgData.newMessage))
   },[newMsgData])
      

   

    return (
        <div id="home" className="md:flex">
           <div className="w-10/12 xs:w-8/12 sm:w-1/2 md:w-1/3 absolute md:relative">
                <img onClick={()=>setHidden(!hidden)} src="/svg/right-arrow.svg" className={`${!hidden && 'translate-x-56 xs:translate-x-64 sm:translate-x-94'} md:hidden absolute w-6 h-6 cursor-pointer transform translate-y-4 ${!hidden && 'xs:ml-4'} ml-2 select-none`} alt="arrow icon" />
               <div className={`w-full md:translate-x-0 transition-all duration-300 ease-out ${hidden && 'transform -translate-x-84 xs:-translate-x-108'}`}>
                  <Sidebar hidden={hidden} setHidden={setHidden} />
               </div>
           </div>
            {
                 selectedUser && selectedUser.username ? (<Messages {...currentUser} />) : 
                        (<div id="messages" className="h-screen flex-1 flex flex-col justify-center items-center">
                              <img src="/svg/sleeping.svg" alt="sleeping emoji" className="block -mt-20 w-24 sm:w-32"/>
                              <h1 className="text-center mt-10 text-xl sm:text-2xl md:text-4xl font-bold text-gray-600">Select friends to chat with..</h1>
                        </div>)
            }
        </div>
    )
}

export default Home
