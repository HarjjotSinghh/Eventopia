import '../App.css';
import { useEffect, useState } from 'react';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import Navbar from '../components/Navbar';
import { MainPageVector } from '../components/MainPageVector';
import { Pragraph } from '../components/Paragraph';
import { Button } from "../components/Button"

function Events() {
  const [events, setEvents] = useState(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:5000/api/events', {method:"GET"});
      const json = await response.json();
      if (response.ok) {
        setEvents(json)
      };
    };
    fetchEvents();
  }, [])

  return (
    <>
      <Navbar/>
      <div className='main flex flex-wrap justify-center gap-[50px] items-center w-[100%] select-none pl-10 pr-10 pb-[100px] xl:pt-[10%] pt-[20vh] xl:flex-row flex-col'>
        {events && events.map((event) => {
            
            return (
                <div key={event._id} className='bg-[#f6f6f6] rounded-[30px] w-[500px] h-auto'>
                    <img src={event.eventDetails.poster} alt='hello' className='w-[100%] h-[270px] p-[0px] rounded-t-[30px] object-cover bg-black'/>
                    <div className='p-8 break-words'>
                        <h1 className='text-4xl pt-3 pb-3'>{event.eventDetails.title}</h1>
                        <p className='text-xl'><span className='text-2xl'>Date:</span> {event.eventDetails.date}</p>
                        <p className='text-xl'><span className='text-2xl'>Timing:</span> {event.eventDetails.timing}</p>
                        <p className='text-xl'><span className='text-2xl'>Venue:</span> {event.eventDetails.venue}</p>
                        <p className='text-xl'><span className='text-2xl'>Description:</span> {event.eventDetails.description}</p>
                        <p className='text-xl'><span className='text-2xl'>Fees:</span> INR {event.eventDetails.fees}</p>
                        {/* <p>Completed: {event.eventDetails.completed ? 'Yes' : 'No'}</p> */}
                        
                        <h2 className='text-4xl pt-3 pb-3'>Organizer</h2>
                        <p className='text-xl'><span className='text-2xl'>Society:</span> {event.organizer.society}</p>
                        <p className='text-xl'><span className='text-2xl'>Social Media:</span> {event.organizer.socialmedia}</p>
                        <p className='text-xl'><span className='text-2xl'>Website:</span> {event.organizer.website}</p>
                        
                        <h2 className='text-4xl pt-3 pb-3'>Management</h2>
                        <p className='text-xl'><span className='text-2xl'>Email:</span> {event.management.email}</p>
                        <p className='text-xl'><span className='text-2xl'>Contact:</span> {event.management.contact}</p>
                        
                        {/* <h3>Uploaded By</h3>
                        <p>Username: {event.uploadedBy.username}</p> */}
                    </div>
                </div>
            )
        })}
      </div>
    </>
    
  );
}

export default Events;
