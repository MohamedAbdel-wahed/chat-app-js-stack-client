import React, {useState} from 'react'
import { gql, useMutation } from '@apollo/client'


const CANCEL_REQUEST= gql`
    mutation cancelRequest($to: String!){
        cancelRequest(to: $to)
    }
`

function CancelRequest({username,canceled,setCanceled}) {

    const [cancelRequest]= useMutation(CANCEL_REQUEST)

    const removeRequest= ()=> {
        setCanceled([...canceled, username])
        cancelRequest({variables: {to:username}})
    } 


    return (
        <div>
            <button onClick={removeRequest} className="px-3 xs:px-4 xs:py-1 bg-white text-gray-700 text-sm font-semibold border-2 border-gray-600 rounded-lg focus:outline-none opacity-100 hover:opacity-50 transition-all duration-500 ease-out">Cancel</button>
        </div>
    )
}

export default CancelRequest
