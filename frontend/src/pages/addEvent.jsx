import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';

const AddEvent = () => {
	const sample = {
		"_id": {
		  "$oid": ""
		},
		"eventDetails": {
		  "title": "",
		  "date": "",
		  "timing": "",
		  "venue": "",
		  "description": "",
		},
		"organizer": {
		  "society": "",
		  "socialmedia": "",
		  "website": ""
		},
		"management": {
		  "email": "",
		  "contact": ""
		},
		"createdAt": {
		  "$date": ""
		},
		"updatedAt": {
		  "$date": ""
		},
		"uploadedBy": {
			"userName": ""
		},
		"__v": 0
	  }
  const [data, setData] = useState(sample);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1);

    const fetchData = async () => {
      const user1 = getUserData();
      user1.then((user) => {
        // console.log(user);
        const userData = user;
        const isAdmin = userData.admin;
        setAdmin(isAdmin);
      });
    };

    const getUserData = async () => {
      try {
		const url = "http://localhost:5000/api/user/fetchUser";
        const userResponse = await axios.post(url, { email: user.email }, { headers: { 'Content-Type': 'application/json' } });
        return userResponse.data.user;
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

	const handleChange = (event) => {
		const { name, value, files } = event.target;
		if (name === 'eventDetails.poster') {
		const file = files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const updatedData = {
			...data,
			eventDetails: {
				...data.eventDetails,
				poster: e.target.result
			}
			};
			setData(updatedData);
		};
		reader.readAsDataURL(file);

		const fileName = file ? file.name : 'No file chosen'; // Extract only the file name
		//   event.target.parentNode.querySelector('.file-name').innerText = fileName; // Display the file name in a separate element
		} else {
		const [nestedKey, nestedProperty] = name.split('.');
		const updatedData = {
			...data,
			[nestedKey]: {
			...data[nestedKey],
			[nestedProperty]: value
			}
		};
		setData(updatedData);
		}
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/events/";
			const res = await axios.post(url, data);
			// console.log(res);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

  if (loading) {
    return (
		<>
			<Navbar/>
			<div className="flex justify-center items-center w-screen h-screen select-none">
				<h1 className="text-4xl">Loading...</h1>
			</div>
		</>
      
    );
  }

  if (user && admin === false) {
    return (
		<>
			<Navbar/>
			<div className="flex justify-center items-center w-screen h-screen select-none">
				<h1 className="text-4xl text-center leading-[55px] bg-red-100 border-red-400 border p-6 rounded-[10px]">

					You need to be an admin to access this webpage.<br></br><a href='/apply' className='hover:underline'>Click here to apply for admin.</a>
				</h1>
			</div>
		</>
      
    );
  }

  if (user && admin === true) {
    return (
		<>
			<Navbar/>
				<div className="flex justify-center items-center w-screen h-screen py-[100px]">
				<div className="flex justify-center items-center bg-slate-50 w-[100%] h-[100%] rounded-[40px]">
				<div className="w-[100%] h-[100%]">
				<form className=" flex justify-center items-center gap-5 flex-col p-12" onSubmit={handleSubmit}>
									<h1 className="lg:text-4xl text-3xl select-none">
										Event Details
									</h1>
									<input
										type="Title"
										placeholder="Title"
										name="eventDetails.title"
										onChange={handleChange}
										value={data.eventDetails.title}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="Date"
										placeholder="Date"
										name="eventDetails.date"
										onChange={handleChange}
										value={data.eventDetails.date}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="time"
										placeholder="Time"
										name="eventDetails.time"
										onChange={handleChange}
										value={data.eventDetails.time}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="text"
										placeholder="Venue"
										name="eventDetails.venue"
										onChange={handleChange}
										value={data.eventDetails.venue}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="text"
										placeholder="Description"
										name="eventDetails.description"
										onChange={handleChange}
										value={data.eventDetails.description}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<div className="flex items-center gap-8 xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] bg-white px-2 py-1 rounded-md">
										<p className="text-[14px] text-[#9fa6b1]">Event Poster</p>
										<input
										type="file"
										name="eventDetails.poster"
										onChange={handleChange}
										required
										className=""
										/>
										{/* <span className="file-name opacity-0">No file chosen</span> */}
									</div>
									{data.eventDetails.poster && (
										<img
										src={data.eventDetails.poster}
										alt={data.eventDetails.poster}
										className="w-[80px] h-auto rounded-md"
										draggable="false"
										/>
									)}
									<h1 className="lg:text-4xl text-3xl select-none">
										Organization Details
									</h1>
									<input
										type="text"
										placeholder="Oranization Name"
										name="organizer.society"
										onChange={handleChange}
										value={data.organizer.society}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="text"
										placeholder="Organization Social Media"
										name="organizer.socialMedia"
										onChange={handleChange}
										value={data.organizer.socialmedia}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="text"
										placeholder="Organization Website"
										name="organizer.website"
										onChange={handleChange}
										value={data.organizer.website}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>

									<h1 className="lg:text-4xl text-3xl select-none">
										Management Details
									</h1>
									<input
										type="text"
										placeholder="Management Email"
										name="management.email"
										onChange={handleChange}
										value={data.management.email}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="text"
										pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
										placeholder="Management Contact Number"
										name="management.contact"
										onChange={handleChange}
										value={data.management.contact}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
										onKeyDown={(e) => {
											const maxLength = 10;
											const inputValue = e.target.value.replace(/[^0-9-]/g, ''); // Remove non-digit and non-hyphen characters
										
											// Allow backspace, delete, and navigation keys
											if (
											e.key === "Backspace" ||
											e.key === "Delete" ||
											e.key === "ArrowLeft" ||
											e.key === "ArrowRight" ||
											e.key === "Home" ||
											e.key === "End"
											) {
											return;
											}
										
											// Prevent input if the maximum length has been reached
											if (inputValue.length >= maxLength) {
											e.preventDefault();
											return;
											}
										
											// Only allow digits and hyphens
											if (!/[\d-]/.test(e.key)) {
											e.preventDefault();
											}
										}}
									/>
									{error && <div className="error_msg">{error}</div>}
									<button type="submit" className="green_btn px-12 py-2.5 text-xl bg-gradient-to-r from-green-300 to-cyan-300 rounded-[20px]">
										Submit
									</button>
								</form>
				</div>
				</div>
			</div>
		</>
      
    );
  }

  return (
	<>
			<Navbar/>
			<div className="flex justify-center items-center w-screen h-screen select-none">
				<h1 className="text-4xl text-center leading-[55px] bg-red-100 border-red-400 border p-6 px-24 rounded-[10px]">
					You are not logged in.<br></br><a href='/login' className='hover:underline'>Click here to log in.</a>
				</h1>
			</div>
		</>
      
  );
};

export default AddEvent;
