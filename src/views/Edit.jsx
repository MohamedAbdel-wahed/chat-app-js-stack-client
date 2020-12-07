import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { gql,useMutation } from '@apollo/client'



const EDIT_DATA= gql`
    mutation editData($imgPath:String!){
        editData(imgPath:$imgPath)
    }
`



function Edit({history}) {
    if(!localStorage.getItem('token')) window.location.href="/login"

    const [editData]= useMutation(EDIT_DATA, {
        update: ()=> history.push('/'),
        onError(err){
            if(err.graphQLErrors[0].message.includes("Unauthenticated")) window.location.href= "/login"
        }
    })

    const avatars= ['santa-claus','boy','girl', 'avatar1', 'avatar2', 'woman', 'business-man','grandpa','avatar3',
                     'avatar4','emperor','chineese-girl', 'avatar5', 'avatar6','boy1', 'avatar7', 'avatar8', 'avatar9',
                      'avatar10','avatar11','wizard','ninja','avatar12', 'avatar13','boy2', 'avatar14', 'avatar15',
                      'graphic-designer', 'avatar16', 'avatar17', 'avatar18','avatar19', 'avatar20']

    const { authState }= useContext(AuthContext)
    const {currentUser}= authState

    const [selectedAvatar,setSelectedAvatar]= useState(currentUser?.imgPath || '')
    
    const saveImg= ()=>  editData({variables: {imgPath: selectedAvatar}})

    return (
        <div id="edit" className="overflow-hidden flex justify-center w-full bg-gray-200">
            <div id="edit_box" className="w-full pt-4 pb-16 flex flex-col mt-5 mx-4 sm:mx-24 md:mx-32 lg:mx-48 xl:mx-64 bg-white rounded-lg border border-gray-100 shadow-md">
                    <button onClick={ saveImg } className="ml-auto mr-6 tracking-wide text-lg font-bold px-6 py-2 bg-blue-500 text-white hover:text-blue-200 rounded-lg focus:outline-none focus:bg-blue-700 focus:opacity-75">save</button>
                    <h1 className="py-2 px-8 text-2xl sm:text-3xl font-bold text-gray-800 select-none">Choose Avatar:</h1>
               <div id="avatars" className="overflow-auto h-full">
                    <div className="w-10/12 sm:w-9/12 md:w-2/3 ml-10 sm:ml-16 md:ml-32 flex flex-wrap justify-end rounded-lg select-none">
                        {
                            avatars.map((avatar,index)=>{
                                const selected= avatar===selectedAvatar
                                return (<div key={index} onClick={()=> setSelectedAvatar(avatar)} className={`w-4/12 sm:w-3/12 py-4 flex justify-center items-center rounded-lg cursor-pointer ${avatar && 'bg-gray-200'} ${selected ? 'border-2 border-blue-500 bg-blue-200' : 'border border-white hover:bg-blue-100'}`}>
                                            <img src={`/svg/avatars/${avatar}.svg`} className="w-10 sm:w-12 rounded-lg" alt="current user avatar"/> 
                                        </div>)
                            })
                        }
                    </div>
               </div>
            </div>
        </div>
    )
}

export default Edit
