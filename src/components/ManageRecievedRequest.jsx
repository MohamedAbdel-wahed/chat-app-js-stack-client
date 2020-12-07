import React from 'react'
import {gql,useMutation} from '@apollo/client'


const ACCEPT_REQUEST= gql`
    mutation acceptRequest($from: String!){
        acceptRequest(from:$from)
    }
`

const REJECT_REQUEST= gql`
    mutation rejectRequest($from: String!){
        rejectRequest(from:$from)
    }
`

function ManageRecievedRequest({username, setAccepted, accepted, setRejected, rejected}) {

    const [acceptRequest]= useMutation(ACCEPT_REQUEST)
    const [rejectRequest]= useMutation(REJECT_REQUEST)


    const accept= ()=>{
        setAccepted([...accepted, username])
        acceptRequest({variables: {from:username}})
    }

    const reject= ()=>{
        setRejected([...rejected, username])
        rejectRequest({variables: {from:username}})
    }

    return (
        <div className="flex items-center">
            <button onClick={accept} className="mr-1 xs:mr-3 px-2 xs:px-3 py-1 text-xs xs:text-sm font-bold xs:font-semibold bg-blue-600 text-white rounded-lg focus:outline-none focus:bg-opacity-50">accept</button>
            <button onClick={reject} className="px-2 xs:px-3 py-1 text-xs xs:text-sm font-bold xs:font-semibold bg-red-600 text-white rounded-lg focus:outline-none focus:bg-opacity-50">reject</button>
        </div>
    )
}

export default ManageRecievedRequest
