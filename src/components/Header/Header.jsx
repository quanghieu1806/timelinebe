import React, { useRef, useEffect, useState, useContext } from "react";
import "./header.css";
import { Container } from "reactstrap";
import Skeleton from '@mui/material/Skeleton';
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import avt from '../../assets/avatar.png'
import { useNavigate } from "react-router-dom";

const NAV__LINKS = [
    {
        display: "Dashboard",
        url: "/home",
    },
    {
        display: "Cơ cấu tổ chức",
        url: "/market",
    },
    {
        display: "Công việc",
        url: "/create",
    },
    {
        display: "Báo cáo",
        url: "/contact",
    },
    {
        display: "Quản lý kiểu người dùng",
        url: "/manager-user",
    },

];



const Header = () => {

    const navigate = useNavigate()
    const [currentUsers, setCurrentUsers] = useState([]);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('currentUser'));
        if (items) {
            setCurrentUsers(items);
        }
    }, []);

    return (
        <header className="header" >
            <Container fluid>
                <div className="navigation">
                    <div className="logo">
                        <h2 className=" d-flex gap-2 align-items-center ">
                            <div className="logo-img"> <img src={logo} alt=""   /></div>
                            <div style={{ fontFamily: 'Roboto' }}> Fine Team</div>
                        </h2>
                    </div>
                    <div className="nav__menu" >
                        <ul className="nav__list">
                            {NAV__LINKS?.map((item, index) => (
                                <li className="nav__item" key={index}>
                                    <NavLink
                                        to={item.url}
                                        className={(navClass) =>
                                            navClass.isActive ? "active" : ""
                                        }
                                    >
                                        <div className="link">{item.display}</div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="nav__right d-flex align-items-center gap-5 " onClick={() => navigate("/login")}>
                        <div className="btn d-flex gap-2 align-items-center button">
                            <button className="btn d-flex gap-2 align-items-center" >
                                <div className="img">
                                    <img src={currentUsers.avatar} className="img-avatar" alt="" />
                                </div>
                                <div className="right-side d-flex">
                                    <div className="name">{currentUsers.name}</div>
                                    <div className="postition">{currentUsers.position}</div>
                                </div>
                            </button>
                        </div>

                        <span className="mobile__menu">
                            <i className="ri-menu-line"></i>
                        </span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
