import React from 'react'

const Input = (props) => {
  function handleChange(e){
    const input = e.target.value;

    // Only allow numbers, up to 10 digits
    if (/^\d{0,10}$/.test(input)) {
      props.onChange(e); // Pass event back to parent
    }
  }

  return (
     <input 
     type="text" 
    //  style={{ boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.5)' }}
     className='border-2 rounded-full w-full h-10 text-center input-inner-shadow duration-300 transition-all'
     placeholder={props.placeholder}
     value={props.value}
     onChange={handleChange}
     maxLength={props.maxLength}
     />
  )
}

export default Input