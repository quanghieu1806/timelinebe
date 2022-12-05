import React, { useState } from "react";
import { Button, Col, Container, Row } from "reactstrap";
import { Input, TextField } from "@mui/material";
import "../../../styles/manager-user.css";
import "./modal-add.css"
import SaveIcon from "@mui/icons-material/Save";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from "react";
import axios from "../../../lib/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ModalAddUserToRoom = ({ showModal, idDepartment }) => {
  const [memberSelected, setMemberSelected] = useState([]);
  const [users, setUsers] = useState([])

  const notifySuccess = () => toast.success("Thêm người dùng vào phòng ban thành công !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const notifyError = () => toast.error(`Thêm người dùng vào phòng ban thất bại`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const handleSelectMember = (id) => {
    console.log(id);
    if (!memberSelected.includes(id)) {
      setMemberSelected([...memberSelected, id]);
    } else {
      const arr = memberSelected.filter(item => item !== id)
      setMemberSelected(arr);
    }
  };

  const handleGetUserNotDepartment = async () => {
    const res = await axios.get("/users/not-department")
    setUsers(res.data)
  }

  const handleSearchByEmail = async (e) => {
    if (e.target.value === "") {
      return handleGetUserNotDepartment()
    }
    const res = await axios.get(`/users/search-has-not-department/${e.target.value}`)
    setUsers(res.data)
  }

  const handleAddUserToDepartment = () => {
    try {
      memberSelected.map(async (member) => {
        await axios.put(`/users/update-department/${member}`, {
          idDepartment
        })
      })
      notifySuccess()
      showModal(false)
    } catch (error) {
      notifyError()
    }


  }

  const closeApp = () => {
    console.log('====================================');
    console.log('click');
    console.log('====================================');
  }

  useEffect(() => {
    handleGetUserNotDepartment()
  }, [])

  return (
    <div className="modal-add-user">
      <div className="pop-up-add-user">
        <div className="member-section">
          <div className="header-title-wrapper">
            <div className="header-title d-flex align-items-center ">
              <div className="title">Thành viên</div>
              <div className="edit add d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddUserToDepartment}
                >
                  Thêm thành viên
                </button>
              </div>
            </div>
          </div>
          <div className="input-section">
            <TextField
              id="outlined-search"
              label="Vui lòng nhập email nhân viên"
              type="search"
              onChange={handleSearchByEmail}
            />
          </div>
          <div className="list-employees">
            {users.map((employee, index) => (
              <div
                key={index}
                className={`emplopyee d-flex ${index % 2 === 0 ? "active" : ""}`}
                onClick={() => handleSelectMember(employee._id)}
              >
                <div className="title-profile d-flex">
                  <Checkbox checked={memberSelected.includes(employee._id)} />
                  <div className="avt">
                    <img src={employee.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <div className="name-email">
                      {`${employee.name} - ${employee.email}`}
                    </div>
                    <div className="postion">{`${employee.position}`}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ModalAddUserToRoom;
