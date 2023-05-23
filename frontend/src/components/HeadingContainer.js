import React from 'react'
import { Heading } from './Heading.js'

export const HeadingContainer = ({HeadingText}) => {
  return (
    <div className="Heading-Container">
        <Heading HeadingText={HeadingText}/>
    </div>
  )
}
