import React,{useState,useContext} from 'react'
import {gql,useLazyQuery} from '@apollo/client'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { login } from '../../actions/auth'


const LOGIN_USER= gql`
    query login($email: String! $pwd: String!) {
        login(email:$email pwd:$pwd){
            username email token
        }
    }
`


function Login({history}) {

    const { dispatch }= useContext(AuthContext)
    const [errors,setErrors]= useState({}) 
    const [cred, setCred]= useState({
        email: '',
        pwd: ''
    })

    const [loginUser, {loading}]= useLazyQuery(LOGIN_USER, {
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        onCompleted(data){
            setErrors({})
            dispatch((login({...data.login})))
            localStorage.setItem('token', data.login.token)
            window.location.href= "/"
        }
    })

    const handleSubmit= (e)=> {
        e.preventDefault()
        loginUser({variables: cred})
    }

    return (
        <div id="login" className="w-full pt-16 sm:mx-12 md:mx-16 lg:mx-24 text-gray-700">
            <h1 className="text-3xl sm:text-5xl font-bold text-center select-none">Login</h1>
            <form onSubmit={handleSubmit} className="w-11/12 sm:w-10/12 md:w-2/3 lg:w-7/12 xl:w-5/12 px-4 flex flex-col container mx-auto">
                <div className="flex flex-col mt-5">
                    <label htmlFor="email" className="font-semibold text-lg select-none">Email</label>
                    <input type="text" id="email" value={cred.email} onChange={e=> setCred({...cred, email: e.target.value })} className="px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:shadow-lg" />
                    <p className="ml-2 text-sm text-red-600">{errors.email && errors.email}</p>
                </div>
                <div className="flex flex-col mt-5">
                    <label htmlFor="password" className="font-semibold text-lg select-none">Password</label>
                    <input type="password" id="password" value={cred.pwd} onChange={e=> setCred({...cred, pwd: e.target.value })} className="px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:outline-none focus:shadow-lg" />
                    <p className="ml-2 text-sm text-red-600">{errors.pwd && errors.pwd}</p>
                </div>
                <div className="mt-4 flex justify-around">
                    <button className="px-3 sm:px-6 py-1 sm:py-2 font-bold text-white bg-green-500 hover:text-green-200 focus:bg-green-600 select-none tracking-wide rounded-lg focus:outline-none transition-all duration-200 ease-out">{loading ? 'Loading' : 'Login'}</button>
                    <Link to="/register" className="px-3 py-2 text-sm text-blue-600 rounded-lg focus:outline-none hover:underline">Don't have an account?</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
