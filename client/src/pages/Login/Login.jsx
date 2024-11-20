import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
// import './src/assets/notes.jpg'

function Login({ signUp, setSignUp }) {

  const navigate = useNavigate()
  const {URL,setToken} = useContext(StoreContext)
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    let newUrl = "";
    if (!signUp) {
      newUrl = URL + "/api/user/login"
    } else {
      newUrl = URL + "/api/user/register"
    }


    const response = await axios.post(newUrl, data)
    if (response.data.success) {
      console.log(response.data.message)
      setToken(response.data.token)
      setData({
        name: "",
        email: "",
        password: "",
      })
      navigate("/")
      // setShowLogin(false)
      localStorage.setItem("token", response.data.token)
    } else {
      // toast.error(response.data.message)
      console.log(response.data.message);
    }

  }


  const setFunc = () => {
    console.log();
    if (signUp === true) {
      setSignUp(false)
      navigate('/login')
    } else {
      setSignUp(true)
      navigate('/signup')
    }
  }


  const submitHandler = (event) => {
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
            <h2 className='text-primary font-bold text-4xl mb-5'>{signUp ? "Sign Up" : "Login"}</h2>
            <form onSubmit={onSubmitHandler}>
              <div className='flex flex-col gap-3 '>
                {signUp ?
                  <div className='flex flex-col gap-3'>
                    <label htmlFor="username" className='font-bold'>UserName</label>
                    <input type="text" id='username' name='name' value={data.name} placeholder='username' className='w-[100%] md:w-[20vw] border-2 border-solid border-primary text-primary py-1 px-2 rounded-md outline-none' required onChange={onChangeHandler} />
                    {/* <label htmlFor="phonenumber" className='font-bold'>Phone Number</label>
                <input type="tel" placeholder='Enter Phone Number' className='w-[100%] md:w-[20vw] border-2 border-solid border-primary text-primary py-1 px-2 rounded-md outline-none' required/> */}
                  </div>
                  : <></>}
                <label htmlFor="email" className='font-bold'>Email</label>
                <input type={signUp ? 'email' : 'text'} id='email' name='email' value={data.email} placeholder={signUp ? "Enter Email" : "Enter Email"} className='w-[100%] md:w-[20vw] border-2 border-solid border-primary text-primary py-1 px-2 rounded-md outline-none' required onChange={onChangeHandler} />
                <label htmlFor="password" className='font-bold'>Password</label>

                <div className='flex gap-[5rem] items-center w-[100%] md:w-[20vw] border-2 border-solid border-primary text-primary py-1 px-2 rounded-md outline-none'>

                  <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Password' className='outline-none' onChange={onChangeHandler} name='password' value={data.password} />

                  {showPassword ? <FaEyeSlash className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} /> : <FaEye className='cursor-pointer' onClick={() => { setShowPassword(showPassword ? false : true) }} />}


                </div>
                <button className='border-2 border-solid border-primary text-white py-1 px-3 bg-primary hover:bg-primary hover:text-[#b2caef] transition-all rounded-md' type='submit'>Submit</button>
              </div>
            </form>
            <p>{signUp ? "have an account?" : "don't have a account?"}   <span className='text-primary cursor-pointer' onClick={setFunc}>{signUp ? "login" : "signup"}</span></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login