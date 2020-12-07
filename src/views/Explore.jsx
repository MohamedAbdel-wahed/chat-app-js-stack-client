import React, { useContext } from 'react'
import { gql,useQuery } from '@apollo/client'
import SendRequest from '../components/SendRequest'
import { UsersContext } from '../contexts/UsersContext'
import { getUsers } from '../actions/users'


const FIND_FRIENDS= gql`
    query users {
        users {
            username imgPath
        }
    }
`

function Explore() {
    if(!localStorage.getItem('token')) window.location.href="/login"

    const { dispatch }= useContext(UsersContext)

     useQuery(FIND_FRIENDS, {
        fetchPolicy: "no-cache",
        onCompleted: (data)=> dispatch(getUsers(data.users))
    })


    return (
        <div id="explore" className="overflow-hidden flex justify-center w-full transform bg-gray-100 select-none">
              <div id="explore_box" className="w-full px-2 xs:px-6 pt-4 pb-6 flex flex-col mt-5 mx-0 xs:mx-4 sm:mx-16 md:mx-24 lg:mx-48 xl:mx-64 bg-white rounded-lg border border-gray-100 shadow-md">
                  <h1 className="mx-4 text-gray-700 text-2xl sm:text-3xl font-extrabold">Find New Friends</h1>
                  <SendRequest />
              </div>
        </div>
    )
}

export default Explore
