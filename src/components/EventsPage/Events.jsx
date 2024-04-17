import { Link } from "react-router-dom";
import { useState,useEffect, useContext } from "react";
import axios from "axios"
import { UserContext } from "../../Layout";




export default function Events() {
        const {UserData,setEventdata,EventData} = useContext(UserContext)

        const [Error,setError] = useState("")

        const getAPIdata = async ()=>{
            try{
                const res = await axios.get("http://localhost:8080/event");
                setEventdata(res.data);
                return res.data;
                
            }catch(error){
                setError(error.message)
                console.log(Error)
                return []
            }
        }

        const checkRegistrationStatus = async (eventId) => {
            if (UserData && UserData.userID) {
                try {
                    const res = await axios.get(`http://localhost:8080/reg/status?userId=${UserData.userID}&eventId=${eventId}`);
                    return res.data; 
                } catch (error) {
                    console.error("Error checking registration status:", error);
                    return false;
                }
            }
            return false;
        };
    
        const updateEventsWithRegistrationStatus = async (events) => {
            const updatedEvents = await Promise.all(events.map(async (event) => {
                const isRegistered = await checkRegistrationStatus(event.eventID); 
                return { ...event, isRegistered };
            }));
            setEventdata(updatedEvents);
        };
    
        useEffect(() => {
            getAPIdata().then(events => {
                if (events && events.length > 0) {
                    updateEventsWithRegistrationStatus(events);
                }
            });
        }, [UserData]); 




    return (
            <div className="py-16 bg-white">
                <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    {EventData.length > 0 ? (
                        EventData.map((events,index) =>
                                (

                                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12"  key={index}>
                                    <div className="md:5/12  flex flex mb-4">
                                        <img className=" mr-10 w-2/4 h-1/2 rounded-2xl"
                                            src={events.logo}
                                            alt="image"
                                        />
                                
                                    <div className="md:7/12 lg:w-1/2">
                                        <h2 className="text-2xl text-gray-900 font-body font-bold md:text-4xl">
                                            {events.title} 
                                        </h2>
                                        <p className="mt-6 text-gray-600">
                                            {events.description}
                                        </p>
                                        <p className="mt-6 text-gray-600">
                                            Date:
                                            {events.date}
                                        </p>
                                        <p className="mt-6 text-gray-600">
                                            Time:{events.time}
                                        </p>
                                        <p className="mt-6 text-gray-600">
                                            Venue:{events.venue.venueName}
                                        </p>
                                        
                                        {UserData ? (
                                            events.isRegistered ? (
                                                <span className="inline-flex text-white items-center px-3 py-2 my-5 font-medium bg-gray-500 rounded-lg">
                                                    Registered
                                                </span>
                                            ) : (
                                                <Link 
                                                    className="inline-flex text-white items-center px-3 py-2 my-5 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                                                    to="/eventreg"
                                                    state={{ eventName: events.title }}
                                                >
                                                    &nbsp; Register Now!
                                                </Link>
                                            )
                                        ) : (
                                            <Link
                                                className="inline-flex text-white items-center px-3 py-2 my-5 font-medium bg-orange-700 rounded-lg hover:opacity-75"
                                                to="/contact"
                                            >
                                                &nbsp; Register Now!
                                            </Link>
                                        )}

                                    </div>
                                    </div>  
                                </div>
                                )
                            )
                        

                     ):<p>loading.....</p>}
                    
                </div>
         </div>
    );
  }