import React from 'react'

const Heading = ({text}) => {
  return (
    <h1 className='text-[24px] font-bold text-black'>{text ? text : "Heading"}</h1>
  )
}

export {Heading}