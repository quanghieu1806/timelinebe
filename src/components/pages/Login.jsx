import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/login.css'
import loginImg from "../../assets/Image-login.png"
import logo from "../../assets/logo.png"
import { Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import google from "../../assets/google-logo.webp"
import facebook from "../../assets/facebook-logo.webp"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../ui/LoginForm/LoginForm'
import ForgotPass from '../ui/LoginForm/ForgotPass'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(true)
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }
 


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="half">
      <ToastContainer
      />
      <div className="contents">
        <div className="container">
          <div className="row align-items-center justify-content-center left-side">
            <div className="col-md-5">
              <div className="wrapper-left-side">
                <img src={loginImg} alt="" className='w-100' />
              </div>
            </div>
            {showLoginForm ? <LoginForm setShowLoginForm={setShowLoginForm} /> : <ForgotPass setShowLoginForm={setShowLoginForm} />}

          </div>
        </div>
      </div>
    </div>

  )
}

export default Login