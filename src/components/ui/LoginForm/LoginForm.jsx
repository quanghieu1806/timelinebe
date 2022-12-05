import { Checkbox, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../assets/logo.png"
import google from "../../../assets/google-logo.webp"
import facebook from "../../../assets/facebook-logo.webp"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { toast } from 'react-toastify'
import { GoogleLogin } from "react-google-login"
import axios from '../../../lib/axios'
import { useNavigate } from 'react-router-dom'
// import { useGoogleAuth } from '../../context/GoogleAuthContext'

// import { GoogleLogin } from '@react-oauth/google';

const LoginForm = ({ setShowLoginForm }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // const { signIn } = useGoogleAuth();
    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const clientId = "1040584853647-fc7vghvfpdjnilc9bi39nt3ltes56el8.apps.googleusercontent.com"

    const onSuccess = (res) => {
        console.log(res);
    }

    const onFailure = (res) => {
        console.log(res)
    }

    const notify = (msg) => toast.error(msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifySuccess = () => toast.success("Đăng nhập thành công", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })

    const handleLogin = async () => {
        try {
            const res = await axios.post("/users/sign-in", {
                email,
                password
            })
            if (!res.data.msg) {
                notifySuccess()
                localStorage.setItem('currentUser', JSON.stringify(res.data.user));
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
        } catch (error) {
            if (error.response.data.msg === 1) {
                notify("Email chưa được đăng ký trong hệ thống")
            } else {
                notify("Sai mật khẩu!")
            }

        }
    }

    return (
        <div className="col-md-7 right-side">
            <div className="wrapper-right-side">
                <div className="form-block mx-auto">
                    <div className="text-center mb-2 d-flex title-login">
                        <img src={logo} alt="" />
                        <h4>Đăng nhập </h4>
                    </div>
                    <form action="#" method="post">
                        <div className="form-group first mb-3">
                            <TextField id="outlined-search" label="Nhập email" type="search" style={{ width: "100%" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group last mb-3">
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div className="d-sm-flex mb-3 align-items-center forgot-savelog">

                            <label className="control control--checkbox mb-3 mb-sm-0">
                                <Checkbox {..."Lưu đăng nhập"} />
                                <span className="caption">Lưu đăng nhập</span>
                            </label>

                            <span className="ml-auto"><Link to="#" className="forgot-pass">Bạn quên mật khẩu, <span style={{ color: "#1683e8" }} onClick={() => setShowLoginForm(false)}>nhấn tại đây </span></Link></span>
                        </div>
                        <input type="button" value="Đăng nhập" className="btn btn-block py-2 btn-primary w-100" style={{ boxShadow: "0px 0px 20px rgba(17, 17, 17, 0.15)" }} onClick={handleLogin} />
                        <span className="text-center my-3 d-block">Hoặc đăng nhập bằng</span>
                        <div className="login-by" >
                            {/* <Link to="#" className="btn btn-block py-2 w-100 mb-3 google-btn d-flex align-items-center justify-content-center" >
                                <img src={google} alt="" /> <div className="login-google">
                                    Tiếp tục với google
                                </div>
                            </Link> */}
                            <GoogleLogin clientId={clientId} onSuccess={onSuccess} onFailure={onFailure} buttonText="Tiếp tục với google" cookiePolicy={'single_host_origin'} className="w-100 google-btn btn" />

                            {/* <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            /> */}
                            <Link to="#" className="btn btn-block py-2 w-100 mb-3 google-btn d-flex align-items-center justify-content-center ">
                                <img src={facebook} alt="" /> <div className="login-google">
                                    Tiếp tục với facebook
                                </div>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm