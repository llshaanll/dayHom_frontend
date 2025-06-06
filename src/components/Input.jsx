import React from 'react'

const Input = (props) => {

  return (
     <input 
     type="text" 
     className='border-2 rounded-full w-full h-10 text-center input-inner-shadow duration-300 transition-all'
     placeholder={props.placeholder}
     value={props.value}
     onChange={props.onChange}
     maxLength={props.maxLength}
     />
  )
}

export default Input