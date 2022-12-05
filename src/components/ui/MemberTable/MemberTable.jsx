import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { Input, TextField } from '@mui/material';
import './member-table.css'
import img from "../../../assets/employee.png"
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import axios from '../../../lib/axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';


const MemberTable = ({ showModal, id, setUser }) => {

    const [showEditBtns, setShowEditBtns] = useState(false)
    const [memberSelected, setMemberSelected] = useState()
    const [members, setMembers] = useState([])
    const [email, setEmail] = useState("")
    const handleSelectMember = (id) => {
        if (memberSelected !== id) {
            setUser(id)
            setMemberSelected(id)
        } else {
            setMemberSelected()
        }
    }

    const navigate = useNavigate();

    const handleGetUsers = async () => {
        const res = await axios.get(`/users/belong-to-department/${id}`)
        setMembers(res.data.data)
    }
    const handleSearchUserByEmail = async (e) => {
        if (e.target.value === "") {
            return handleGetUsers()
        }
        const res = await axios.get(`/users/search-has-department/${id}/${e.target.value}`)
        setMembers(res.data.data)
    }
    useEffect(() => {
        if (id) {
            handleGetUsers()
        }

    }, [id])

    const handleRedirectPage = () => {
        navigate(`/list-work/${id}`);
    }

    return (

        <Col lg="5" className="mb-5">
            <div className="member-section">
                <div className="header-title-wrapper">
                    <div className="header-title d-flex align-items-center ">
                        <div className="title">
                            Thành viên
                        </div>
                        <div className="edit d-flex align-items-center">
                        <button type="button" className="btn btn-primary" onClick={handleRedirectPage}> Đi đến dự án</button>
                        </div>
                    </div>

                </div>
                <div className="input-section">
                    <TextField id="outlined-search" label="Vui lòng nhập email nhân viên" type="search" onChange={handleSearchUserByEmail} />
                </div>
                <div className="list-employees">
                    {members?.map((employee, index) => (
                        <div key={index} className={`emplopyee d-flex ${index % 2 === 0 ? "active" : ""} ${memberSelected === employee._id ? "selected" : ""}`} onClick={() => handleSelectMember(employee._id)} >
                            <div className="title-profile d-flex">
                                <div className="avt">
                                    <img src={employee.avatar} alt="" />
                                </div>
                                <div className="detail">
                                    <div className="name-email">
                                        {`${employee.name} - ${employee.email}`}
                                    </div>
                                    <div className="postion">
                                        {`${employee.position}`}
                                    </div>
                                </div>
                            </div>
                            {memberSelected === employee._id && <div className="action-icons">
                                <SettingsIcon />
                                <CloseIcon onClick={() => showModal(true)} style={{ cursor: 'pointer' }} />
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        </Col>



    )
}

export default MemberTable