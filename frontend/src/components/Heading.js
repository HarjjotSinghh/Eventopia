import React from 'react'

export const Heading = ({HeadingText}) => {
  return (
    <div className='text-5xl text-purple-600 hover:text-purple-600/80'>
        { HeadingText }
    </div>
  )
}
