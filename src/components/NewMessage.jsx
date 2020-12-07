import React, {useState,useEffect,useRef} from 'react'
import {gql,useMutation} from '@apollo/client'


const SEND_MESSAGE= gql`
  mutation message($to:String! $content:String!){
      message(to:$to content:$content){
          uuid to from content createdAt
      }
  }
`

function NewMessage({recepient}) {
    if(!localStorage.getItem('token')) window.location.href="/login"

    const msgField= useRef(null)
    const [disabled,setDisabled]= useState(true)
    const [newMsg,setNewMsg]= useState({to: '', content: ''})

    useEffect(() => {
        setNewMsg({...newMsg, to: recepient })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recepient])

    const [sendMessage, {error}]= useMutation(SEND_MESSAGE, {
        onError: ()=> window.location.href= "/login" 
    })

    const onChangeHanlder= (event,defaultHeight)=>{
        const target= event.target
        // disabling the submit button
        target.value.trim()!=="" ? setDisabled(false) : setDisabled(true)
        // set new msg
        setNewMsg({...newMsg, content: target.value})
        // expand textarea according to text height
        target.style.height= defaultHeight
        if(target.scrollHeight<100)
            target.style.height= `${target.scrollHeight}px`
        else
            target.style.height="100px"
    }

    const handleSubmit= (e)=>{
       e.preventDefault()
       if(!localStorage.getItem('token')) window.location.href="/login"
       if(newMsg.content.trim()==="") return;
       sendMessage({variables: newMsg})
       !error && setNewMsg({ ...newMsg, content:""}) // empty message field
       msgField.current.style.height="45px"
   }

    return (
        <div id="messages_form" className="border border-gray-300 z-20">
           <form onSubmit={handleSubmit} className="pt-2 pb-3">
                <div className="w-10/12 flex ml-6 sm:ml-12 items-end">
                    <textarea onChange={ event=> onChangeHanlder(event,'45px') } rows="1" ref={msgField} value={newMsg.content} type="text" className="w-full px-5 py-2 sm:py-3 text-sm font-semibold rounded-lg border-2 focus:outline-none bg-gray-200 focus:bg-gray-100 focus:border-gray-400 text-gray-800 transition-all duration-400 ease-in-out" autoComplete="off" placeholder="type message here..."></textarea>
                    <button type="submit" disabled={disabled} className={`px-2 focus:outline-none rounded-full select-none ${disabled ? 'opacity-50' : 'opacity-100' }`}>
                        <img src="/svg/send.svg" className="w-10 rounded-full" alt="send button"/>
                    </button>
                </div>
           </form>
        </div>
    )
}

export default NewMessage
