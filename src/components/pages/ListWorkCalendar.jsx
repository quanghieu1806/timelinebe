import CalendarTimeLine from "../CalendarTimeLine"
import React from 'react'
import { Container, Row } from 'reactstrap';
import Header from '../Header/Header'
import '../../styles/list-work.css'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router";


import { showTitle } from "../../utils/ImageUpload";


const ListWorkCalendar = () => {
    const { idDepart, status } = useParams();


    return (
       
        <>
         <Header />
            <Container fluid>
                <Row>
                    <h4 style={{ margin: "10px 50px", textTransform: 'uppercase' }}>{showTitle(status)}</h4>
                <CalendarTimeLine/>
                </Row>
            </Container>
        </>

    )
}

export default ListWorkCalendar