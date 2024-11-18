import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
// import './src/assets/notes.jpg'

function Login({signUp,setSignUp}) {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const setFunc = () =>{
    console.log();
    if(signUp===true){
      setSignUp(false)
      navigate('/login')
    } else {
      setSignUp(true)
      navigate('/signup')
    }
  }


  const submitHandler = (event) =>{
    event.preventDefault()
  }

  return (
    <>
     <div className='flex h-[100%] flex-col md:flex-row my-0 '>
      <div className='hidden md:block w-[60%]'>
        <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?t=st=1731857958~exp=1731861558~hmac=e83459447075b8805c2d6724672809fc17052a3d1c5d7995d2646b4ffaf42b98&w=740" alt="" />
      </div>
      <div className='w-[100%] md:w-[40%] my-10 md:my-1 flex flex-col justify-center items-center'>
        <div className='flex flex-col '>
          <h2 className='text-blue-700 font-bold text-4xl mb-5'>{signUp?"Sign Up": "Login"}</h2>
          <form onSubmit={submitHandler}>
            <div className='flex flex-col gap-3 '>
              {signUp?
              <div className='flex flex-col gap-3'>
                <label htmlFor="username" className='font-bold'>UserName</label>
                <input type="text" id='username' placeholder='username' className='w-[100%] md:w-[20vw] border-2 border-solid border-blue-700 text-blue-700 py-1 px-2 rounded-md outline-none' required/>
                <label htmlFor="phonenumber" className='font-bold'>Phone Number</label>
                <input type="tel" placeholder='Enter Phone Number' className='w-[100%] md:w-[20vw] border-2 border-solid border-blue-700 text-blue-700 py-1 px-2 rounded-md outline-none' required/>
              </div>
              :<></>}
              <label htmlFor="email" className='font-bold'>Email</label>
              <input type={signUp?'email':'text'} id='email' placeholder={signUp?"Enter Email":"Enter Email or Phone Number"} className='w-[100%] md:w-[20vw] border-2 border-solid border-blue-700 text-blue-700 py-1 px-2 rounded-md outline-none' required />
              <label htmlFor="password" className='font-bold'>Password</label>

              <div className='flex gap-[5rem] items-center w-[100%] md:w-[20vw] border-2 border-solid border-blue-700 text-blue-700 py-1 px-2 rounded-md outline-none'>

              <input type={showPassword?'text':'password'} id='password' placeholder='Enter Password' className='outline-none'  />
              
              {showPassword?<FaEyeSlash className='cursor-pointer' onClick={()=>{setShowPassword(showPassword?false:true)}}/>:<FaEye className='cursor-pointer' onClick={()=>{setShowPassword(showPassword?false:true)}}/>}
              

              </div>
              <button className='border-2 border-solid border-blue-700 text-white py-1 px-3 bg-blue-700 hover:bg-blue-800 hover:text-[#b2caef] transition-all rounded-md' type='submit'>Submit</button>
            </div>
          </form>
          <p>{signUp?"have an account?":"don't have a account?"}   <span className='text-blue-700 cursor-pointer' onClick={setFunc}>{signUp?"login":"signup"}</span></p>
        </div>
      </div>
     </div>
    </>
  )
}

export default Login