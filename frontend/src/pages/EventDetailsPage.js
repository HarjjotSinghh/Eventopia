import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

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
    return (<>
      <div className='flex justify-center w-screen h-screen items-center select-none text-center '>
        <h1 className='text-4xl bg-red-300 border-red-500 p-6 leading-[45px] rounded-3xl'>This event does not exist.
        <br></br>
        <Link to="/events" className=' hover:underline'>
          Click here to see all events.
        </Link>
        </h1>
      </div>
    </>);
  }

  // Render event details here
  return (
    <>
    <Navbar/>
      <div className='flex items-center justify-center pt-[250px] pb-24 px-4 flex-col'>
        <div className='flex justify-center gap-6 items-center flex-row pb-16'>
          <div src={event.eventDetails.poster} alt={event.eventDetails.poster} 
                className='w-[100px] rounded-full h-[100px] ' style={{backgroundImage: `url(${event.eventDetails.poster})`, backgroundSize: "cover", backgroundOrigin:"center", backgroundPosition:"center"}}>

                </div>
          <h1 className='lg:text-6xl text-4xl font-bold  select-none'>
            {event.eventDetails.title}
          </h1>
        </div>
        
        <div className='flex justify-center gap-4 select-none flex-col'>
          <div className='flex justify-start flex-col lg:flex-row gap-4 select-none'>
            <div className='p-5 bg-transparent border-solid border-4 border-[#e8e8e8] rounded-[20px]'>
              <img src={event.eventDetails.poster} draggable="false" alt='hello' className='rounded-[10px] w-[800px] h-auto p-[0px] object-cover bg-black'/>
            </div>
            
            <div className='bg-transparent border-solid border-4 border-[#e8e8e8] lg:max-w-[385px] max-w-[100%] flex items-left justify-center flex-col gap-1  p-8 rounded-[20px] '>
              <h1 className='text-3xl pb-4 font-bold'>
                Event Starts
              </h1>
              <div className='flex justify-normal gap-3 items-center flex-row pb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-calendar2-week-fill" viewBox="0 0 16 16"> <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"/> </svg>
                <p className='text-xl'>
                  {formatDate(event.eventDetails.date)}
                </p>
              </div>
              <div className='flex justify-normal gap-3 items-center flex-row'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16"> <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> </svg>
                <p className='text-xl'>
                  {formatTime(event.eventDetails.timing)}
                </p>
                
              </div>
              <h1 className='text-3xl pb-4 pt-6 font-bold'>
                Happening In
              </h1>
              <div className='flex justify-normal gap-3 items-center flex-row pb-4'>
                <svg xmlns="http://www.w3.org/2000/svg"  className='min-w-[34px] min-h-[34px]' width="32" height="32" viewBox="0 0 576 512"><path d="M408 120C408 174.6 334.9 271.9 302.8 311.1C295.1 321.6 280.9 321.6 273.2 311.1C241.1 271.9 168 174.6 168 120C168 53.73 221.7 0 288 0C354.3 0 408 53.73 408 120zM288 152C310.1 152 328 134.1 328 112C328 89.91 310.1 72 288 72C265.9 72 248 89.91 248 112C248 134.1 265.9 152 288 152zM425.6 179.8C426.1 178.6 426.6 177.4 427.1 176.1L543.1 129.7C558.9 123.4 576 135 576 152V422.8C576 432.6 570 441.4 560.9 445.1L416 503V200.4C419.5 193.5 422.7 186.7 425.6 179.8zM150.4 179.8C153.3 186.7 156.5 193.5 160 200.4V451.8L32.91 502.7C17.15 508.1 0 497.4 0 480.4V209.6C0 199.8 5.975 190.1 15.09 187.3L137.6 138.3C140 152.5 144.9 166.6 150.4 179.8H150.4zM327.8 331.1C341.7 314.6 363.5 286.3 384 255V504.3L192 449.4V255C212.5 286.3 234.3 314.6 248.2 331.1C268.7 357.6 307.3 357.6 327.8 331.1L327.8 331.1z"/></svg>
                <p className='text-xl break-words'>
                  {event.eventDetails.venue}
                </p>
              </div>
              <div className='flex items-center justify-center pt-10'>
                <button className='lg:py-4 lg:px-10 py-2 px-5 lg:text-xl text-lg bg-gradient-to-l from-[#ff9a7b] to-[#ff6739]  bottom-0 right-0 rounded-[40px] text-white font-medium'>
                  Register For Event
                </button>
              </div>
            </div>
            
          </div>
          <div key={event._id} className='border-[#e8e8e8] border-4 border-solid rounded-[30px] max-w-[1250px] h-auto overflow-hidden'>
                            
                    
                    <div className=' flex relative flex-col'>

                        
                        <div className='p-10 break-words flex justify-normal items-left flex-col gap-1'>
                          <h1 className='lg:text-4xl text-3xl pt-3 pb-3 font-bold'>{event.eventDetails.title}</h1>
                              <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Date:</span> {formatDate(event.eventDetails.date)}</p>
                              <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Timing:</span> {formatTime(event.eventDetails.timing)}</p>
                              <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Fees:</span>  {event.eventDetails.fees === 0 ? "Free" : "INR " + event.eventDetails.fees}</p>
                              <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Venue:</span> {event.eventDetails.venue}</p>
                              <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Description:</span> {

                                <>
                                  {event.eventDetails.description.split("\n").map((line, index) => (
                                    
                                    <React.Fragment key={index}>
                                      {index === 0 && <br/>}
                                      {line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                                </>
                              }</p>
                              
                              {/* <p>Completed: {event.eventDetails.completed ? 'Yes' : 'No'}</p> */}
                              <div className='flex flex-col gap-4 justify-start pt-3'>
                                <div className='flex flex-col gap-1 justify-start pt-3'>
                                  <h2 className='lg:text-[30px] text-xl pt-3 pb-3 font-bold'>Organizer</h2>
                                  <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Society:</span>
                                        {event.organizer.society}
                                  </p>
                                  <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Social Media:</span> <a href={event.organizer.socialmedia} className='hover:underline' target='_blank' rel='noreferrer'>Social Media Link </a> </p>
                                  <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Website:</span><a href={event.organizer.website} className='hover:underline' target='_blank' rel='noreferrer'>Website Link </a> </p>
                                </div>
                                
                                <div className='flex flex-col gap-1 justify-start pt-3'>
                                  <h2 className='lg:text-[30px] text-xl pt-3 pb-3 font-bold'>Management</h2>
                                  <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Email:</span> {event.management.email}</p>
                                  <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Contact:</span> {event.management.contact}</p>
                                </div>

                                </div>
                                
                              
                              
                              {/* <h3>Uploaded By</h3>
                              <p>Username: {event.uploadedBy.username}</p> */}
                          </div>
                    </div>   

              </div>
          </div>

        </div>
        <div className='flex justify-center items-center flex-col p-12'>
          <h1 className='lg:text-6xl text-4xl font-bold  select-none pb-16 pt-6'>
              Similar Events
          </h1>
          <div className='grid 2xl:grid-cols-2 grid-cols-1 gap-6'>
          {events && events.slice(events.indexOf(event) + 1, events.indexOf(event) + 5).map((event) => {
            
            return (
                <div key={event._id} className='bg-gradient-to-l hover:border-[#ff936f] border-[#ffe4de] border-4 border-solid from-[#fff8f5] to-[#ffe8e0] rounded-[40px] max-w-[800px] max-h-[600px] overflow-hidden hover:scale-[1.015] transition-all duration-[0.4s]'>
                    
                    
                    
                      <div className='group flex relative lg:flex-row flex-col'>
                      
                          <img src={event.eventDetails.poster} draggable="false" alt='hello' className='lg:w-[400px] p-[0px] rounded-l-[30px] object-cover bg-black'/>
                          <div className='lg:p-6 p-2 break-words flex justify-normal items-left flex-col gap-1'>
                                <Link to={`/events/${encodeURI(event.eventDetails.title)}`}>
                                  <h1 className='lg:text-3xl text-2xl pt-3 pb-3 font-bold hover:underline group-hover:text-[#ff6739]'>{event.eventDetails.title}</h1>
                                </Link>
                                <p className='lg:text-[18px] text-[14px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Date:</span> {formatDate(event.eventDetails.date)}</p>
                                <p className='lg:text-[18px] text-[14px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Timing:</span> {formatTime(event.eventDetails.timing)}</p>
                                <p className='lg:text-[18px] text-[14px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Fees:</span>  {event.eventDetails.fees === 0 ? "Free" : "INR " + event.eventDetails.fees}</p>
                                <p className='lg:text-[18px] text-[14px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Venue:</span> {event.eventDetails.venue}</p>
                                {/* <p className='lg:text-[18px] text-[14px] text-justify'><span className='lg:text-[20px] text=[14px] font-semibold pr-1 '>Description:</span> {
                                event.eventDetails.description.length > 50
                                  ? event.eventDetails.description.slice(0, 50) + "..."
                                  : event.eventDetails.description
                                }</p> */}
                                
                                {/* <p>Completed: {event.eventDetails.completed ? 'Yes' : 'No'}</p> */}
                                
                                  
                                
                                
                                {/* <h3>Uploaded By</h3>
                                <p>Username: {event.uploadedBy.username}</p> */}
                                <Link to={`/events/${encodeURI(event.eventDetails.title)}`} className='pt-4'>
                                    <div className='flex items-center justify-center'>
                                      <button className='lg:py-4 lg:px-10 py-2 px-5 lg:text-xl text-lg bg-gradient-to-l from-[#ff9a7b] to-[#ff6739]  bottom-0 right-0 rounded-[30px] text-white'>
                                        Show More
                                      </button>
                                    </div>
                                    
                                </Link>
                            </div>
                      </div>
                      
                    
                    

                </div>
            )
        })}
        
        </div>
        <Link to={`/events`} className='pt-20'>
              <div className='flex items-center justify-center pb-24'>
                <button className='lg:py-6 lg:px-12 py-3 px-6 lg:text-3xl text-lg bg-gradient-to-l from-[#ff9a7b] to-[#ff6739]  bottom-0 right-0 rounded-[45px] text-white'>
                  Browse More Events
                </button>
              </div>
        </Link>
        </div>
      <Footer/>
    </>
    
  );
};

export default EventDetailsPage;