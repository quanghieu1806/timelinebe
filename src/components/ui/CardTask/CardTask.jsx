import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import owner from '../../../assets/avatar.png'
import user1 from "../../../assets/user-1.png"
import user2 from "../../../assets/user-2.png"
import user3 from "../../../assets/user-3.png"
import user4 from "../../../assets/user-4.png"
import "./card-task.css"

const taskRecipe = [
    {
        id: 1,
        avt: user1
    },
    {
        id: 2,
        avt: user2
    },
    {
        id: 3,
        avt: user3
    },
    {
        id: 4,
        avt: user4
    },
    {
        id: 5,
        avt: user4
    },
]

const CardTask = () => {
    return (
        <div className="card-task">
            <div className="card">
                <div className="card-title">
                    <h5>Thiết kế app food</h5>
                </div>
                <div className="card-description">
                    Ứng dụng cho người ăn thuần chay, lấy gam màu trắng chủ đạo. Có sẵn trên cả hai kho ứng dụng Apple Store và Play Store.
                </div>
                <div className="card-time d-flex align-items-center">
                    <AccessTimeIcon fontSize='12'/>
                    <div className="start-end-time d-flex align-items-center">
                        <div className="start-time">12:30 01/09/2022</div>
                        <div className="middle-point"></div>
                        <div className="end-time">15:30 08/09/2022</div>
                    </div>
                </div>
                <div className="owner-card d-flex align-items-center">
                    <div className="avt">
                        <img src={owner} alt="" className='w-100' />
                    </div>
                    <div className="owner d-flex">
                        Owner: <div className="name">Lê Thị Hoa</div>
                    </div>
                </div>
                <div className="task-recipient d-flex">
                    {taskRecipe.map((user, index) => {
                        return (index < 4 && (
                            <div key={index} className="user-task" style={{ marginLeft: -10, zIndex: index }}>
                                <img src={user.avt} alt="" className='w-100' />
                            </div>))
                    })}
                    <div className="user-more">
                        + {taskRecipe.length - 4}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTask