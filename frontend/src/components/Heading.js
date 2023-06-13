import React from 'react'

export const Heading = ({HeadingText}) => {
  return (
    <div className='xl:text-8xl text-6xl text-transparent font-medium bg-clip-text bg-gradient-to-bl from-[#ff9a7b] to-[#ff6739]'>
        { HeadingText }
    </div>
  )
}
