import '../App.css';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EventDetailsPage from './EventDetailsPage';

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
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  
  const handleBackwardPagination = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleForwardPagination = () => {
    const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <>
      <Navbar/>
      <div className='flex justify-start items-center px-2 xl:px-10 flex-col'>
        <h1 className='lg:text-6xl text-3xl pt-[150px] text-transparent font-bold bg-clip-text bg-gradient-to-l from-[#00ff9e] to-[#2cf6e6] select-none'>
          Upcoming Events
        </h1>
        <div className='main flex flex-wrap justify-center items-center gap-10 w-[100%] select-none px-1 xl:px-10 pb-[100px] pt-16 xl:flex-row flex-col overflow-x-hidden'>
        {events && events.slice(indexOfFirstItem, indexOfLastItem).map((event) => {
            
            return (
                <div key={event._id} className='bg-[#eeeeee] rounded-[30px] xl:w-[750px] lg:w-[575px] w-[350px] sm:w-[350px] h-auto'>
                    <Link to={`/events/${encodeURI(event.eventDetails.title)}`}>
                    <img src={event.eventDetails.poster} draggable="false" alt='hello' className='w-[100%] lg:h-[400px] md:h-[300px] h-[200px] p-[0px] rounded-t-[30px] object-cover bg-black'/>
                    <div className='p-8 break-words'>
                    <h1 className='lg:text-4xl text-3xl pt-3 pb-3'>{event.eventDetails.title}</h1>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Date:</span> {formatDate(event.eventDetails.date)}</p>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Timing:</span> {formatTime(event.eventDetails.timing)}</p>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Venue:</span> {event.eventDetails.venue}</p>
                        
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Description:</span> {
                        event.eventDetails.description.length > 50
                          ? event.eventDetails.description.slice(0, 50) + "..."
                          : event.eventDetails.description
                        }</p>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Fees:</span>  {event.eventDetails.fees === 0 ? "Free" : "INR " + event.eventDetails.fees}</p>
                        {/* <p>Completed: {event.eventDetails.completed ? 'Yes' : 'No'}</p> */}
                        
                        <h2 className='lg:text-[30px] text-xl pt-3 pb-3'>Organizer</h2>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Society:</span> {event.organizer.society}</p>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Social Media:</span> {event.organizer.socialmedia}</p>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Website:</span> {event.organizer.website}</p>
                        
                        <h2 className='lg:text-[30px] text-xl pt-3 pb-3'>Management</h2>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Email:</span> {event.management.email}</p>
                        <p className='lg:text-[18px] text-[12px]'><span className='lg:text-[20px] text=[14px] font-semibold pr-1'>Contact:</span> {event.management.contact}</p>
                        
                        {/* <h3>Uploaded By</h3>
                        <p>Username: {event.uploadedBy.username}</p> */}
                    
                    </div>
                    </Link>

                </div>
            )
        })}
      </div>
      <div className="pagination flex items-center justify-center">
      {events && events.length > 0 && (
        <ul className="pagination-list flex items-center justify-center">
          <li className="pagination-item xl:px-4 px-2 pb-[200px] lg:text-2xl text-lg">
            <button className='bg-green-200 select-none rounded-[15px] border-green-600 lg:px-8 lg:py-4 px-6 py-2' onClick={handleBackwardPagination} disabled={currentPage === 1}>Back</button>
          </li>
          {Array.from(Array(Math.ceil(events.length / ITEMS_PER_PAGE)), (item, index) => (
            <li key={index} className={`pagination-item xl:px-4 px-2 pb-[200px] lg:text-2xl text-lg ${currentPage === index + 1 ? 'active' : ''}`}>
              <div className='bg-green-100 select-none rounded-[15px] border-green-600 lg:px-8 lg:py-4 px-6 py-2'>{index + currentPage }</div>
            </li>
          ))}
          <li className="pagination-item xl:px-4 px-2 pb-[200px] lg:text-2xl text-lg">
            <button className='bg-green-200 select-none rounded-[15px] border-green-600 lg:px-8 lg:py-4 px-6 py-2' onClick={handleForwardPagination} disabled={currentPage === Math.ceil(events.length / ITEMS_PER_PAGE)}>Next</button>
          </li>
        </ul>
      )}
      </div>
      </div>
      
      
    </>
    
  );
}

export default Events;
