import '../App.css';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import EventDetailsPage from './EventDetailsPage';
import Footer from '../components/Footer';


function Events() {
  const [events, setEvents] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  
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
    
    window.scrollTo(0,0);
  }

  const handleForwardPagination = () => {
    const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
    
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    window.scrollTo(0,0);
  }

  return (
    <>
      <Navbar/>
      <div className='flex justify-start items-center px-2 xl:px-10 flex-col'>
        <h1 className='lg:text-8xl text-4xl pt-[180px] pb-[100px] text-transparent font-bold bg-clip-text xl:bg-gradient-to-l bg-gradient-to-br from-[#ff9a7b] to-[#ff6739] select-none'>
          Upcoming Events
        </h1>
        <div className='main flex flex-wrap justify-center items-center w-[100%] select-none px-1 xl:px-10 pb-[100px] pt-16 overflow-x-hidden gap-10'>
        {events && events.slice(indexOfFirstItem, indexOfLastItem).map((event) => {
            
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
      <div className="pagination flex items-center justify-center">
      {events && events.length > 0 && (
        <ul className="pagination-list flex items-center justify-center">
          <li className="pagination-item xl:px-4 px-2 pb-[200px] lg:text-2xl text-lg">
            <button className='bg-[#ff7d55] text-white select-none rounded-[15px] border-green-600 lg:px-8 lg:py-4 px-6 py-2' onClick={handleBackwardPagination} disabled={currentPage === 1}>Back</button>
          </li>
          {Array.from(Array(Math.ceil(events.length / ITEMS_PER_PAGE)).slice(-2), (item, index) => (
            <li key={index} className={`pagination-item xl:px-4 px-2 pb-[200px] lg:text-2xl text-lg ${currentPage === index + 1 ? 'active' : ''}`}>
              <div className='bg-[#ffac92] text-white select-none rounded-[15px] border-green-600 lg:px-8 lg:py-4 px-6 py-2'>{index + currentPage }</div>
            </li>
          ))}
          <li className="pagination-item xl:px-4 px-2 pb-[200px] lg:text-2xl text-lg">
            <button className='bg-[#ff7d55] text-white select-none rounded-[15px] border-green-600 lg:px-8 lg:py-4 px-6 py-2' onClick={handleForwardPagination} disabled={currentPage === Math.ceil(events.length / ITEMS_PER_PAGE)}>Next</button>
          </li>
        </ul>
      )}
      </div>
      </div>
      
      <Footer/>
    </>
    
  );
}

export default Events;
