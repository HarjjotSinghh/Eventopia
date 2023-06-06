import React from 'react'

export const Heading = ({HeadingText}) => {
  return (
    <div className='xl:text-8xl text-6xl text-transparent font-medium bg-clip-text bg-gradient-to-b from-[#00ff9e] to-[#2cf6e6]'>
        { HeadingText }
    </div>
  )
}
