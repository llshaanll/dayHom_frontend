import React, { useState } from 'react'
import Input from '../components/Input'

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [contact, setContact] = useState('')
  const [role, setRole] = useState('')
  const [otp, setOTP] = useState('');

function handleSend(e) {
  e.preventDefault(); // ✅ prevent the form from reloading the page
  console.log(contact);
  console.log(role)
  setOtpSent(true);
}

function handleVerify(e){
    e.preventDefault();
    console.log('Otp verified')
}


  return (
    <div 
    className='flex items-center justify-center
              min-h-screen w-screen bg-orange-500
              '>
        <div className='border-4 h-[300px] w-[400px] m-5
                        rounded-[50px] bg-white
                        hover:shadow-xl/20 duration-300 group
                        relative
                       '>
            <div>
                <form className='absolute p-5 rounded-[45px] inset-1 flex flex-col gap-5 items-center justify-center'>
                    <div className='flex absolute top-[-50px] w-full justify-around'>
                    {['Admin', 'Manager', 'Employee'].map((r)=>{
                        return (
                                <label key={r} className='flex items-center gap-1'>
                                <input
                                type="radio"
                                name="role"
                                checked={role === r}
                                value={r}
                                onChange={(e)=> setRole(e.target.value)}
                                />
                                {r}
                                </label>
                        )
                    })}
                    </div>

                    <Input placeholder={'Enter Contact Number'} maxLength={10}  value={contact} onChange={(e)=>setContact(e.target.value)}/>
                    {otpSent ? <Input placeholder={'Enter OTP'} maxLength={6}  value={otp} onChange={(e)=>setOTP(e.target.value)}/> : null}
                    {!otpSent ? 
                    <button onClick={handleSend} type="submit" className='border-1 rounded-full bg-white text-black hover:bg-black hover:text-white duration-200 w-full h-10'>Send OTP</button>:
                    <button onClick={handleVerify} type="submit" className='border-1 rounded-full bg-white text-black hover:bg-black hover:text-white duration-200 w-full h-10'>Verify OTP</button>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login