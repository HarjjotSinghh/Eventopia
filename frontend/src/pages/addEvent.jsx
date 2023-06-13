import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeProvider, LoadingOverlay} from '@mantine/core';

const AddEvent = () => {
	let [visible, { toggle }] = useDisclosure(false);
	function validateUrl(url) {
		// Check if the URL is empty
		if (url === '') {
		  return false;
		}
	  
		// Check if the URL starts with http or https
		if (!/^https?:\/\//.test(url)) {
		  return false;
		}
	  
		// Check if the URL contains at least one period
		if (!/\./.test(url)) {
		  return false;
		}
	  
		// Check if the URL is valid using a regular expression
		const regex = /^https?:\/\/[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,}$/;
		return regex.test(url);
	  }
	const sample = {
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
		}
	  }
	
	  //logic for min date.
	const getMinDate = () => {
		const dtToday = new Date();
		const month = (dtToday.getMonth()+1>9)?dtToday.getMonth()+1:`0${dtToday.getMonth()+1}`;
		const day = (dtToday.getDate()>9)?dtToday.getDate():`0${dtToday.getDate()}`;
		const year = dtToday.getFullYear();
		
		return year + '-' + month + '-' + day;  
	}

  const [data, setData] = useState(sample);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [admin, setAdmin] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const checkFormValidity = () => {
	// Check if all form fields have a value
	const formFields = Object.values(data).flat();
	const isFormValid = formFields.every(value => value !== '');
  
	// Update the state to enable/disable the button
	setIsFormValid(isFormValid);
  };


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
		const userEmail_ = userData.email;
		setUserEmail(userEmail_);
        setAdmin(isAdmin);
		// console.log(isAdmin);
		
	});
    };

    const getUserData = async () => {
      try {
		const url = "http://localhost:5000/api/user/fetchUser";
        const userResponse = await axios.post(url, { email: user.email }, { headers: { 'Content-Type': 'application/json' } });
        console.log(userResponse.data.user);
		setUserEmail(userResponse.data.user["email"]);
		// console.log(userEmail);
		// console.log(admin);
		setUserEmail(userResponse.data.user.email);

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
		checkFormValidity();
		// if (name === '_id') {
		// 	if (data._id && data._id.$oid) {
		// 	  const updatedData = {
		// 		...data,
		// 		_id: { '$oid': data._id.$oid }
		// 	  };
		// 	  setData(updatedData);
		// 	} else {
		// 	  console.warn('Invalid _id value:', data._id);
		// 	  // Handle the case when _id value is invalid or missing
		// 	}
		//   }
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
		const updatedData_ = {
			...updatedData, uploadedBy: {email: userEmail}
		}
		setData(updatedData_);
		console.log(updatedData_);
		}
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		e.currentTarget.disabled = true;
		setIsLoading(true);
		setCompleted(false);
		try {
			const base64Data = data.eventDetails.poster.split(',')[1]; // Remove the data:image/jpeg;base64, part
			const decodedData = atob(base64Data); // Decode the base64 data

			// Convert the decoded data to a Uint8Array
			const byteCharacters = Array.from(decodedData).map((char) => char.charCodeAt(0));
			const byteArray = new Uint8Array(byteCharacters);

			// Create a Blob from the Uint8Array
			const file = new Blob([byteArray], { type: 'image/jpeg' });

			// Create a FormData and append the file
			const formData = new FormData();
			formData.append('image', file);

			// Make the POST request with the formData
			const imageResponse = await axios.post('http://localhost:5000/api/image/', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				"Access-Control-Allow-Origin": "*"
			},
			});

			const imageUrl = imageResponse.data.link;

			const eventData = { ...data };
			eventData.eventDetails.poster = imageUrl;
			// console.log(imageUrl);
			const url = "http://localhost:5000/api/events/";
			// console.log(eventData);
			const res = await axios.post(url, eventData, {headers: {'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"}});
			setError("Event uploaded successfully 👍🏼");
			// visible=false;
			document.getElementById("loading-overlay").style.display = "none !important";
			setIsLoading(false);
			setCompleted(true);
			return res.status(500).json({message: "Event uploaded successfully 👍🏼", event: data})
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
			{!completed &&
		 	<>
				{isLoading && <LoadingOverlay id='loading-overlay' className='fixed top-0 left-0 w-full h-full' visible={visible} overlayBlur={3} />}
				<div className="flex justify-center items-center w-screen h-screen pt-[100px] pb-[200px]">
				<div className="flex justify-center items-center bg-slate-50 w-[100%] h-[100%] rounded-[40px]">
				<div className="w-[100%] h-[100%]">
				<form className=" flex justify-center items-center gap-5 flex-col p-12 pt-[100px] pb-[100px]" onSubmit={handleSubmit}>
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
										min={getMinDate()}
										onChange={handleChange}
										value={data.eventDetails.date}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px]"
									/>
									<input
										type="time"
										placeholder="Time"
										name="eventDetails.timing"
										onChange={handleChange}
										value={data.eventDetails.timing}
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
										type="url"
										placeholder="Organization Social Media"
										name="organizer.socialmedia"
										onChange={handleChange}
										value={data.organizer.socialmedia}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px] invalid:text-pink-600
										focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
									/>
									{/* {validateUrl(data.organizer.socialmedia) && <p className="mt-2 hidden peer-invalid:block text-pink-600 text-sm">
									Not woking.
									</p>
									} */}
									<input
										type="url"
										placeholder="Organization Website"
										name="organizer.website"
										onChange={handleChange}
										value={data.organizer.website}
										required
										className="input p-2 rounded-md xl:w-[60%] 2xl:w-[50%] lg:w-[80%] md:w-[90%] w-[90%] text-[14px] invalid:text-pink-600
										focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
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
									
									<button type="submit" onClick={toggle} id='green_btn' className="green_btn px-12 py-2.5 text-xl rounded-[20px] bg-gradient-to-r from-[#25ffed] to-[#07feaa]">
										Submit
									</button>
								</form>
				</div>
				</div>
			</div>
			</>
			}
			{completed && 
			<>
				<div className="flex justify-center items-center w-screen h-screen select-none">
					<h1 className="text-4xl text-center leading-[55px] bg-green-100 border-green-400 border p-6 px-24 rounded-[10px]">
						Event uploaded successfully.<br></br><a href='/events' className='hover:underline'>Click here to see it.</a>
					</h1>
				</div>
			</>
			}
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
