import axios from "axios"
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../../Layout";
import { useContext } from "react";







export default function Login() {
    
    const navigator = useNavigate();
    const loginForm = document.loginForm;
    
    const {setUserData} = useContext(UserContext);
    
    const [password,setpassword] = useState('');
    const [username,setusername] = useState('');
    // const [UserData,setUserData] = useState([])
    const [Error,setError] = useState('');
    let User = {}
    
    const  handleSubmit =  async (e)=>{
        e.preventDefault()
        User = {username,password};
        loginForm.username.value = '';
        loginForm.password.value = '';
        
        try {
            const res = await axios.post('http://localhost:8080/user/login',User);
            console.log(res.status)
            if(res.status==200){
                alert("succesfully logged in")
                const loggedInUser = res.data;
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                setUserData(res.data)
                navigator('/')               
            }else{
                setError('Wrong Username or Password');
                throw Error
            }
             
        } catch (error) {
            alert('Wrong Username or Password')
        }
    }
   
    

    
    return (
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                            <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                                Join us for this banger 
                            </h1>
                            <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                                Fill in the form
                            </p>

                            <div className="flex items-center mt-8 text-gray-600">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    DAV jalandhar, near Burlton park, Kabir Nagar
                                </div>
                            </div>

                            <div className="flex items-center mt-4 text-gray-600">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    +44 1234567890
                                </div>
                            </div>

                            <div className="flex items-center mt-2 text-gray-600">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-8 h-8 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    dav@gmail.org
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} name="loginForm" className="p-6 flex flex-col justify-center">
                            <div className="flex flex-col">
                                <label htmlFor="username" className="hidden">
                                    UserName
                                </label>
                                <input
                                    onChange={(e) => setusername(e.target.value)}
                                    type="username"
                                    name="username"
                                    id="username"
                                    placeholder="UserName"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="password" className="hidden" >
                                    password
                                </label>
                                <input
                                    onChange={(e) => setpassword(e.target.value)}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="password"
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            

                            

                            <button
                                type="submit"
                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                            >
                                Sign In
                            </button>
                        </form>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}