import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from '../../../lib/axios';

const Department = ({ item, setIsActive, isActive, showModal, setIdDepartment }) => {
    // const [btnState, setBtnState] = useState(false)
    // let toggleClass = btnState ? "active" : ""



    const handleToggle = () => {
        setIsActive(item.id)
      
        setIdDepartment(item.id)
    }



    return (

        <div className={`department-item d-flex align-items-center ${isActive === item.id ? "active" : ""}`} onClick={handleToggle}>
            <div >{item.name}</div>
            <div className="action-icons d-flex">
                <AddIcon onClick={() => showModal(true)} />
                <EditOutlinedIcon />
                <DeleteIcon />
            </div>
        </div>
    )
}

export default Department