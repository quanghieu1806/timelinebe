import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import Header from '../Header/Header'
import AddWork from '../ui/AddWork/AddWork'
import MemberTable from '../ui/MemberTable/MemberTable'
import ModalAddUserToRoom from '../ui/ModalAddUserToRoom/ModalAddUserToRoom'
import ModalDelete from '../ui/ModalDelete/ModalDelete'
import Profile from '../ui/Profile/Profile'
import TableContent from '../ui/TableContent/TableContent'



const Home = () => {
    const [showMemberTable, setShowMemberTable] = useState(false)
    const [showModalMember, setShowModalMember] = useState(false)
    const [showModalAddUserRoom, setShowModalAddUserRoom] = useState(false)
    const [idDepartment, setIdDepartment] = useState()
    const [userSelected, setUserSelected] = useState()
    const handleShowMembers = () => {
        setShowMemberTable((prev) => !prev)
    }

    
    return (
        <>
            {showModalMember && <ModalDelete title="Bạn có chắc muốn xóa thành viên này không?" showModal={setShowModalMember} />}
            {showModalAddUserRoom && <ModalAddUserToRoom showModal={setShowModalAddUserRoom} idDepartment={idDepartment}/>}
            <Header />
            <Container fluid className='mt-5'>
                <Row>
                    <TableContent showMembers={handleShowMembers} showModal={setShowModalAddUserRoom} setIdDepartment={setIdDepartment} />
                    {idDepartment && <MemberTable showModal={setShowModalMember} id={idDepartment} setUser={setUserSelected} />}
                    {userSelected && <Profile idUser={userSelected} />}
                </Row>
            </Container>
        </>
    )
}

export default Home