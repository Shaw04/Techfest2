import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export default function AddEvent() {
  const location = useLocation();
  const navigator = useNavigate();

  const { setEventdata, EventData } = useContext(UserContext);

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [venueId, setvenueId] = useState("");
  const [logo, setlogo] = useState("");
  const events = location.state?.events;
  const eventFormRef = useRef(null);

  let dec = false;
  useEffect(() => {
    if (events && eventFormRef.current) {
      eventFormRef.current.querySelector('input[name="title"]').value =
        events.title;
      eventFormRef.current.querySelector('input[name="description"]').value =
        events.description;
      eventFormRef.current.querySelector('input[name="date"]').value =
        events.date;
      eventFormRef.current.querySelector('input[name="time"]').value =
        events.time;
      eventFormRef.current.querySelector('input[name="venueId"]').value =
        events.venueId;
      const logoInput =
        eventFormRef.current.querySelector('input[name="logo"]');
      logoInput.src = events.logo;
    }
  }, [events]);
  if (events) {
    dec = true;
  }
  useEffect(() => {
    if (events) {
      settitle(events.title);
      setdescription(events.description);
      setdate(events.date);
      settime(events.time);
      setvenueId(events.venueId);
      setlogo(events.logo);
    }
  }, [events]);
  const handleEvent = async (e) => {
    e.preventDefault();
    if (dec) {
      try {
        const res = await axios.put(
          `http://localhost:8080/event/${events.eventID}`,
          { title, description, date, time, venueId, logo }
        );
        if (res.status === 200) {
          const updatedIndex = EventData.findIndex(
            (event) => event.eventID === events.eventID
          );
          const updatedEventData = [...EventData];
          updatedEventData[updatedIndex] = res.data;
          setEventdata(updatedEventData);
          dec = false;
          navigator("/events");
        } else {
          throw Error("SOmething is wrong");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await axios.post("http://localhost:8080/event", {
          title,
          description,
          date,
          time,
          logo,
          venueId,
        });
        if (res.status === 200) {
          setEventdata([...EventData, res.data]);
          navigator("/events");
        } else {
          throw Error("SOmething is wrong");
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const filePath = URL.createObjectURL(file); // Get a temporary URL for the file
    setlogo(filePath); // Store the temporary URL
  };
  console.log(logo);

  return (
    <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
              <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                Get in touch:
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

            <form
              onSubmit={handleEvent}
              ref={eventFormRef}
              className="p-6 flex flex-col justify-center"
            >
              <div className="flex flex-col">
                <label htmlFor="username" className="hidden">
                  Event Title
                </label>
                <input
                  onChange={(e) => settitle(e.target.value)}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="hidden">
                  description
                </label>
                <input
                  onChange={(e) => setdescription(e.target.value)}
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  email
                </label>
                <input
                  onChange={(e) => setdate(e.target.value)}
                  type="text"
                  name="date"
                  id="date"
                  placeholder="date"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  email
                </label>
                <input
                  onChange={(e) => settime(e.target.value)}
                  type="text"
                  name="time"
                  id="time"
                  placeholder="time"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  email
                </label>
                <input
                  onChange={(e) => setvenueId(e.target.value)}
                  type="number"
                  name="venueId"
                  id="venueId"
                  placeholder="venueId"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="logo" className="hidden">
                  Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="logo"
                  id="logo"
                  className="hidden"
                  onChange={handleUpload}
                />
                <label
                  htmlFor="logo"
                  className="w-full mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none cursor-pointer"
                >
                  {logo ? "Image Selected" : "Choose Logo"}
                </label>
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
