import { FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../assets/logo.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPass = ({ setShowLoginForm }) => {
  const [requested, setRequested] = useState(false)
  const [waitTime, setWaitTime] = useState(60)
  const id = React.useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  React.useEffect(() => {
    if (requested) {
      id.current = window.setInterval(() => {
        setWaitTime((time) => time - 1);
      }, 1000);
    }
    return () => clear();
  }, [requested, waitTime]);

  React.useEffect(() => {
    if (waitTime === 0) {
      clear();
      setWaitTime(60)
      setRequested(false)
    }
  }, [waitTime]);


  return (
    <div className="col-md-7 right-side align-items-center">
      <div className="back-btn d-flex" onClick={() => setShowLoginForm(true)}>
        <ArrowBackIcon />
        <div className="" style={{ color: "#1890FF" }}>Quay lại</div>
      </div>
      <div className="wrapper-right-side d-flex">

        <div className="form-block mx-auto">
          <div className="text-center mb-2 d-flex title-login">
            <img src={logo} alt="" />
            <h4>Quên mật khẩu</h4>
          </div>
          <p>Nhập email của bạn để tiến hành khôi phục mật khẩu.</p>
          <form action="#" method="post">
            <div className="form-group first mb-3">
              <TextField id="outlined-search" label="Nhập email" type="search" style={{ width: "100%" }} />
            </div>
            <input type="button" value="Gửi yêu cầu" className={`btn btn-block py-2 btn-primary w-100 ${requested ? "requested" : ""}`} style={{ boxShadow: "0px 0px 20px rgba(17, 17, 17, 0.15)" }} onClick={() => setRequested(true)} />
            {requested ? <div className='text-center'>Gửi yêu cầu lần tiếp theo:<span style={{ color: "#1890ff", marginLeft: 5 }}>{waitTime}s</span> </div> : ""}

            <div className="text-center w-100 mt-3"><Link to="#" className="forgot-pass" style={{ color: "#919EAB !important" }} >Bạn muốn tạo tài khoản mới? <span style={{ color: "#1683e8" }}>nhấn tại đây </span></Link></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPass