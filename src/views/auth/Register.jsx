import React,{useState} from 'react'
import {gql,useMutation} from '@apollo/client'
import {Link} from 'react-router-dom'


const REGISTER_USER= gql`
    mutation register($username: String! $email: String! $pwd: String! $confirmPwd: String!) {
        register(username:$username email:$email pwd:$pwd confirmPwd:$confirmPwd) {
            username email 
        }
    }
`

function Register({history}) {

    const [errors,setErrors]= useState({}) 
    const [cred, setCred]= useState({
        username: '',
        email: '',
        pwd: '',
        confirmPwd: ''
    })

    const [registerUser, {loading}]= useMutation(REGISTER_USER, {
        update(){
            history.push('/login')
            setErrors({})
        },
        onError: (err)=> setErrors(err.graphQLErrors[0].extensions.errors)
    })

    const handleSubmit= (e)=> {
        e.preventDefault()
        registerUser({variables: cred})
    }

    return (
        <div id="register" className="w-full pt-4 sm:mx-12 md:mx-20 lg:mx-32 xl:mx-40 text-gray-700">
            <h1 className="text-3xl sm:text-5xl font-bold text-center select-none">Register</h1>
            <form onSubmit={handleSubmit} className="w-11/12 sm:w-10/12 md:w-2/3 lg:w-7/12 xl:w-5/12 px-4 flex flex-col container mx-auto">
                <div className="flex flex-col mt-1">
                    <label htmlFor="username" className="font-semibold text-base sm:text-lg select-none">Username</label>
                    <input type="text" id="username" value={cred.username} onChange={e=> setCred({...cred, username: e.target.value })} className="px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:shadow-lg text-sm sm:text-base" autoComplete="off" />
                    <p className="ml-2 text-sm text-red-600">{errors.username && errors.username}</p>
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="username" className="font-semibold text-base sm:text-lg select-none">Email</label>
                    <input type="text" id="email" value={cred.email} onChange={e=> setCred({...cred, email: e.target.value })} className="px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:shadow-lg text-sm sm:text-base" />
                    <p className="ml-2 text-sm text-red-600">{errors.email && errors.email}</p>
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="password" className="font-semibold text-base sm:text-lg select-none">Password</label>
                    <input type="password" id="password" value={cred.pwd} onChange={e=> setCred({...cred, pwd: e.target.value })} className="px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:shadow-lg text-sm sm:text-base" />
                    <p className="ml-2 text-sm text-red-600">{errors.pwd && errors.pwd}</p>
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="confirm_password" className="font-semibold text-base sm:text-lg select-none">Confirm Password</label>
                    <input type="password" id="confirm_password" value={cred.confirmPwd} onChange={e=> setCred({...cred, confirmPwd: e.target.value })} className="px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:shadow-lg text-sm sm:text-base" />
                    <p className="ml-2 text-sm text-red-600">{errors.confirmPwd && errors.confirmPwd}</p>
                </div> 
                <div className="mt-4 flex justify-around">
                    <button className="px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-base font-bold text-white bg-green-500 hover:text-green-200 tracking-wide focus:bg-green-600 select-none rounded-lg focus:outline-none transition-all duration-200 ease-out">{loading ? 'Loading...':'Submit'}</button>
                    <Link to="/login" className="px-3 py-2 text-sm text-blue-600 rounded-lg focus:outline-none hover:underline">Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
