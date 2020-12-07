import React, { useRef, useEffect, useContext } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import NewMessage from './NewMessage'
import { MessagesContext } from '../contexts/MessagesContext'
import { setMessages } from '../actions/messages'


const GET_MESSAGES= gql`
    query messages($from: String!){
        messages(from:$from){
            uuid to from content createdAt
        }
    }
`

function Messages({username,imgPath}) {

     if(!localStorage.getItem('token')) window.location.href="/login"

    const { msgState, msgDispatch }= useContext(MessagesContext)
    const { messages, selectedUser }= msgState
    const scrollToBottom = useRef(null);
    
    const [getMessages]= useLazyQuery(GET_MESSAGES, {
        fetchPolicy: 'no-cache',
        onCompleted: (data)=> data && msgDispatch(setMessages(data.messages))
    })
    
    useEffect(()=>{
        selectedUser && getMessages({variables: {from: selectedUser.username}})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedUser])
    
    useEffect(() => {
        if (scrollToBottom) {
            scrollToBottom.current.addEventListener('DOMNodeInserted', e => {
            const { currentTarget: target }= e
            target.scroll({ top: target.scrollHeight })
          })
        }
    }, [selectedUser])

    return (
        <div id="messages" className="flex-1 overflow-hidden">
             <div id="messages_header" className="py-2 px-10 bg-gray-100 bg-transparent shadow-md select-none">
                <div className="flex items-center">
                    <div className="">
                         <img src={`/svg/avatars/${selectedUser.imgPath }.svg`} className="rounded-full w-10 h-10" alt="user avatar" /> 
                    </div>
                    <div className="ml-3">
                        <h1 className="font-bold text-gray-800">{ selectedUser?.username || '' }</h1>
                    </div>
                </div>
            </div>
             <div id="messages_body" ref={scrollToBottom} className="pt-3 pb-5 px-2 xs:px-6 sm:px-8 md:px-10 overflow-auto overflow-x-hidden select-none">
                {
                    messages && messages.map(({uuid,to,from,content,createdAt},index)=>{
                        const authUser= from===username
                        const hideImg= index && index<messages.length-1 && from===messages[index+1].from
                        return ( 
                            <div key={uuid} className={`transition-all ease-in-out duration-700 flex flex-col justify-center w-2/3 mt-2 items-start break-words ${authUser ? 'ml-auto items-end' : 'mr-auto'}`}>
                                <div className="flex items-end">
                                    {
                                        !hideImg && index>0 &&(<img src={ to===selectedUser.username ? `/svg/avatars/${imgPath}.svg` : `/svg/avatars/${selectedUser.imgPath}.svg`} 
                                                          className={`rounded-full w-10 h-10 border border-gray-200 mx-1 ${authUser && 'order-last'}`}
                                                          alt="user avatar" 
                                                       />)
                                    } 
                                    <div className={`flex flex-col ${hideImg && authUser || index===0 ? 'mr-12' : ''} ${hideImg && !authUser || index===0 ? 'ml-12' : ''}`}>
                                        <p className={`px-3 py-2 rounded-lg break-words text-sm ${authUser ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-800'}`} title={createdAt}>
                                            { content }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) 
                    })
                }
            </div>
            {
                selectedUser && (<NewMessage recepient={selectedUser.username} />)
            }
       </div>
    )
}

export default Messages
