import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const EventDetailsPage = () => {
  const [events, setEvents] = useState(null);
  const [event, setEvent] = useState(null);
  let {title} = useParams();
  title = decodeURI(title);
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:5000/api/events', {method:"GET"});
      const json = await response.json();
      if (response.ok) {
        setEvents(json);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events) {
      const foundEvent = events.find((event) => event.eventDetails.title === title);
      setEvent(foundEvent);
    }
  }, [title, events]);


  function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  function formatTime(time) {
    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours);
    let period = 'AM';
  
    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = 'PM';
    }
  
    return `${formattedHours}:${minutes} ${period}`;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  // Render event details here
  return (
    <>
    <Navbar/>
      <div className='flex items-center justify-center pt-[250px] pb-[250px] px-4'>
        <div key={event._id} className={`bg-gradient-to-tr from-[#e7fff5] to-[#ddfffa] rounded-[30px] 2xl:w-[1200px] h-auto `}>
        <img src={event.eventDetails.poster} draggable="false" alt='hello' className='w-[100%] h-[500px] p-[0px] rounded-t-[30px] object-cover bg-black'/>
        <div className='p-8 break-words'>
        <h1 className='lg:text-4xl text-2xl pt-3 pb-3'>{event.eventDetails.title}</h1>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Date:</span> {formatDate(event.eventDetails.date)}</p>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Timing:</span> {formatTime(event.eventDetails.timing)}</p>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Venue:</span> {event.eventDetails.venue}</p>
            
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Description:</span> {
            event.eventDetails.description.length > 50
              ? event.eventDetails.description.slice(0, 50) + "..."
              : event.eventDetails.description
            }</p>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Fees:</span> INR {event.eventDetails.fees}</p>
            {/* <p>Completed: {event.eventDetails.completed ? 'Yes' : 'No'}</p> */}
            
            <h2 className='lg:text-[30px] text-[18px] pt-3 pb-3'>Organizer</h2>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Society:</span> {event.organizer.society}</p>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Social Media:</span> {event.organizer.socialmedia}</p>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Website:</span> {event.organizer.website}</p>
            
            <h2 className='lg:text-[30px] text-[18px] pt-3 pb-3'>Management</h2>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Email:</span> {event.management.email}</p>
            <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Contact:</span> {event.management.contact}</p>
            
            {/* <h3>Uploaded By</h3>
            <p>Username: {event.uploadedBy.username}</p> */}
        </div>
        </div>
      </div>
      
    </>
    
  );
};

export default EventDetailsPage;