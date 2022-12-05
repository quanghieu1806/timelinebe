import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import './table-content.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Department from './Department';
import axios from "../../../lib/axios";


const contentArray =
    [
        {
            id: "HN",
            branchName: "Chi nhánh Hà Nội",
            departments: [
                // { id: 1, name: "Phòng nhân sự" },
                // { id: 2, name: "Phòng kế toán" },
                // { id: 3, name: "Phòng kinh doanh" },

            ]
        },
        {
            id: "DN",
            branchName: "Chi nhánh Đà Nẵng",
            departments: [
                // { id: 4, name: "Phòng nhân sự" },
                // { id: 5, name: "Phòng kế toán" },
                // { id: 6, name: "Phòng kinh doanh" },

            ]
        },
        {
            id: "HCM",
            branchName: "Chi nhánh Hồ Chí Minh",
            departments: [
                // { id: 7, name: "Phòng nhân sự" },
                // { id: 8, name: "Phòng kế toán" },
                // { id: 9, name: "Phòng kinh doanh" },

            ]
        },
    ]



const TableContent = ({ showMembers, showModal, setIdDepartment }) => {

    const [isOpenArray, setIsOpenArray] = useState([0, 1, 2])
    const [isActive, setIsActive] = useState()
    const [branchArray, setBranchArray] = useState(contentArray)
    const handleSetOpenTab = (index) => {
        if (!isOpenArray.includes(index)) {
            setIsOpenArray((prev) => prev.concat(index))
        } else {
            let aray = []
            setIsOpenArray((prev => {
                aray = prev.filter(item => item !== index)
                return aray
            }))

        }

    }

    const handleGetBranch = async () => {
        const response = await axios.get("/department/show")
        const data = response.data.data
        branchArray.map((content, index) => (
            data.map((d) => (
                content.id === d.idBranch && setBranchArray(content.departments.push({ id: d._id, name: d.nameDepartment }))
            ))
        ))
    }

    useEffect(() => {
        handleGetBranch()

    }, [])



    return (
        <Col lg="3" className="mb-5">
            <div className="search-section">
                <div className="search-bar">
                    <input type="text" placeholder='Vui lòng nhập nội dung tìm kiếm' />
                </div>
                <div className="branch">
                    {contentArray.map((item, index) => (
                        <div className="branch-item" key={index}>
                            <div className="branch-name d-flex align-items-center" onClick={() => handleSetOpenTab(index)}>
                                <ExpandMoreIcon className={isOpenArray.includes(index) && 'active'} />
                                <div className="name">{item.branchName}</div>
                            </div>
                            {isOpenArray.includes(index) && <div className="department-list">
                                {item.departments.map((i, id) => {

                                    return <Department key={id} item={i} setIsActive={setIsActive} isActive={isActive} showModal={showModal} setIdDepartment={setIdDepartment} />
                                })}
                            </div>}

                        </div>
                    ))}


                </div>
            </div>
        </Col>



    )
}

export default TableContent