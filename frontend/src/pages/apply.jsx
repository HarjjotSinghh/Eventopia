import React from 'react'
import Navbar from '../components/Navbar'

export default function Apply() {
  return (
    <>
    <Navbar/>
    <div className='flex items-center w-screen h-[110vh] xl:pt-[100px] lg:pt-[150px] md:pt-[150px] pt-[150px] flex-col justify-center'>
        <a href="https://forms.gle/c2VRaTCVcX98K5Sx6" target='_blank' rel='noreferrer'>
            <h1 className='text-4xl hover:underline font-bold pb-8'>Apply For Admin</h1>
        </a>
        <iframe title='admin-application' src="https://docs.google.com/forms/d/e/1FAIpQLSeb-J2NPNDseImqhAWr-vhgdIgbBZCY--9wNqXbR4zSV4Tb0w/viewform?embedded=true" className="text-black text-2xl xl:w-[850px] xl:h-[600px] w-[90%] h-[600px]" frameborder="0" marginheight="0"  marginwidth="0">Loading…</iframe>
    </div>
    </>
  )
}
