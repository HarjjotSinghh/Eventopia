import React from 'react'

export const Heading = ({HeadingText}) => {
  return (
    <div className='text-8xl text-transparent font-medium bg-clip-text bg-gradient-to-b from-[#00ff9e] to-[#2cf6e6]'>
        { HeadingText }
    </div>
  )
}
