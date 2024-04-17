import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Layout";
import axios from "axios";



export default function EventReg(){
  

    const location = useLocation();

    const navigator = useNavigate();

    const{EventData,UserData} = useContext(UserContext)

    const [date, setDate] = useState(new Date());

    const RegForm = document.RegForm;

    const[username,setusername]=useState();

    const [email,setemail] = useState();

  
    const handleReg = async(e)=>{
        e.preventDefault()
        RegForm.name.value = '';
        RegForm.email.value = '';
        const event = EventData.find((event)=>event.title == eventName);
        const eventId = event.eventID;
        const userId= UserData.userID;

        const regDate = date.toDateString()
        try{
            const res = await axios.post('http://localhost:8080/reg',{userId,eventId,regDate})
            if(res){
                console.log(res);

                navigator('/events')
            }else{
                throw Error(res.message)
            }
        }catch(e){
            console.log(e);
        }
    }

    
    const eventName = location.state?.eventName 
    
    
    return (
        
        <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                                            <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                                                Register For {eventName} 
                                            </h1>
                                            <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                                                Showcase your talent
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

                                        <form onSubmit={handleReg} name="RegForm" className="p-6 flex flex-col justify-center">
                                            <div className="flex flex-col">
                                                <label htmlFor="name" className="hidden">
                                                    Username
                                                </label>
                                                <input
                                                    type="name"
                                                    name="name"
                                                    onChange={(e)=>setusername(e.target.value)}
                                                    id="name"
                                                    placeholder="Username"
                                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                                />
                                            </div>

                                            <div className="flex flex-col mt-2">
                                                <label htmlFor="email" className="hidden">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    onChange={(e)=>setemail(e.target.value)}
                                                    id="email"
                                                    placeholder="Email"
                                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                                />
                                            </div>

                                            

                                            <button
                                                type="submit"
                                                className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                                            >
                                                Submit
                                            </button>
                                        </form>
                                </div>
                     
                            </div>
                        </div>
                    </div>
        
    );
}