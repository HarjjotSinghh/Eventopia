import React from 'react'

export const Heading = ({HeadingText}) => {
  return (
    <div className='xl:text-8xl text-6xl text-transparent font-bold pt-2 bg-clip-text bg-gradient-to-bl from-[#ffa387] to-[#ff6739]'>
        { HeadingText }
    </div>
  )
}
