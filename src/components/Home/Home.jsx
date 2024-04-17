
import { Link } from 'react-router-dom';
import { UserContext } from '../../Layout';
import { useContext } from 'react';


export default function Home() {
    const {UserData} = useContext(UserContext)
    console.log(UserData)

    
    
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
                <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl text-white font-body2">
                        Welcome To aDAVitya 2024
                            
                        </h2>
                        {UserData? 
                        <Link
                        className="inline-flex text-white font-body2 items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                        to="/"
                    >
                        
                        &nbsp;Already Registered!
                    </Link>
                        :
                        <Link
                            className="inline-flex text-white font-body2 items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                            to="/contact"
                        >
                            
                            &nbsp; Register Now!
                        </Link>
                        }
                    </div>
                </div>

                <div className="absolute inset-0 w-full  sm:my-20 sm:pt-1 pt-12 h-full ">
                    <video src="src/assets/earth.mp4" autoPlay={true} loop={true} muted className='w-full h-full object-cover rounded-3xl '   ></video>
                </div>
                
            </aside>

            <div className="grid  place-items-center sm:mt-20">
                <img className="sm:w-96 w-48 rounded-full" src="src\assets\satinder_sartaj.avif" alt="image2" />
            </div>

            <h1 className="text-center text-2xl sm:text-5xl font-body2 py-10 font-medium">FEATURING SATINDER SARTAJ</h1>

            <div>
                <hr className='text-black text-2xl font-medium' />
                
            {UserData ? (
                <div>
                   
                     <h1 className="text-center text-2xl sm:text-5xl font-body2 py-10 font-medium">Welcome, {UserData.username}!</h1>
                   
                    
                </div>
            ) : (
                <h1 className="text-center text-2xl sm:text-5xl font-body2 py-10 font-medium">Welcome Guest!</h1>
            )}
        </div>
        </div>
    );
}