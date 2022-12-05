import React, { useEffect, useState } from 'react'
import "./add-user.css"
import profile from '../../../assets/profile.png'
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { InputLabel, MenuItem, Select } from '@mui/material';
import axios from '../../../lib/axios';
import { imageUpload } from '../../../utils/ImageUpload';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios"


const AddUser = ({ type, setType, user, setUser, getAllUser }) => {
    const [value, setValue] = React.useState(dayjs(Date.now()));
    const [departments, setDepartments] = useState([])
    const [departmentSelected, setDepartmentSelected] = useState()
    const [role, setRole] = useState("Coder")
    const [urlImg, setUrlImg] = useState()
    const [imgPreview, setImgPreview] = useState()
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [position, setPosition] = useState()
    const [gender, setGender] = useState("Nam")
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const notifyError = () => toast.error(`${type === "add" ? "Tạo người dùng mới thất bại!" : "Cập nhật thông tin người dùng thất bại"} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifySuccess = () => toast.success(`${type === "add" ? "Tạo người dùng mới thành công" : "Cập nhật người dùng thành công"}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    useEffect(() => {
        if (urlImg) {
            new Promise(async () => {
                const image = await imageUpload(urlImg)
                setImgPreview(image)
            })
        }
    }, [urlImg])


    const handleChangeDepartment = (e) => {
        setDepartmentSelected(e.target.value)
    }

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleChangePreview = (e) => {
        const file = e.target.files[0]
        setUrlImg(file)
    }

    const handleCreateUser = async () => {

        if (!fullName || !email || !position || !password || !role || !address || !imgPreview) {
            toast.error('Vui lòng nhập tất cả các trường', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        try {


            await axios.post(`/users/${type === "add" ? "create-user" : user}`, {
                name: fullName,
                position,
                email,
                password,
                role,
                avatar: imgPreview,
                gender,
                idDepartment: departmentSelected,
                address,
                birthday: value.format("YYYY-MM-DD")

            })
            notifySuccess()
            setTimeout(() => {
                setType()
            }, 3000)
            getAllUser()

        } catch (error) {
            notifyError()
        }
    }

    const getUserById = async () => {
        console.log("id", user);
        const data = await axios.get(`/users/${user}`)
        const response = data.data.data
        console.log(response);
        setFullName(response.name)
        setPosition(response.position)
        setPassword(response.password)
        setAddress(response.address)
        setEmail(response.email)
        setValue(dayjs(new Date(response.birthday)))
        setDepartmentSelected(response.idDepartment?._id)
        setRole(response.role)
        setImgPreview(response.avatar)

    }


    useEffect(() => {
        const fecthDepartment = async () => {
            const data = await axios.get("/department/show")
            setDepartments(data.data.data)

        }
        fecthDepartment()
        if (type === "edit") {
            console.log("edit");
            getUserById()

        }
    }, [])

    return (
        <div className="modal-add-user">
            <div className="pop-up-add d-flex">
                <div className="title">
                    Thông tin cá nhân
                </div>
                <div className="form-add-user d-flex">
                    <div className="form-avt d-flex text-center">
                        <div className="image-avt">
                            {imgPreview ? <img src={imgPreview} alt="" /> : <div className='img-upload'></div>}
                            <input type="file" onChange={handleChangePreview} />
                        </div>
                        <div className="support d-flex">
                            <div className="support-file">
                                *jeg,*jpg,*png
                            </div>
                            <div className="support-size">
                                Kích thước tối đa 4 MB
                            </div>
                        </div>
                    </div>
                    <div className="form-type">
                        <div className="form-input d-flex">
                            <div className="name-position d-flex">
                                <TextField id="outlined-basic" label="Họ và tên" variant="outlined" value={fullName} onChange={(e) => setFullName(e.target.value)} InputLabelProps={{ shrink: true }} />
                                <TextField id="outlined-basic" label="Chức vụ" variant="outlined" value={position} onChange={(e) => setPosition(e.target.value)} InputLabelProps={{ shrink: true }} />
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField id="outlined-basic" label="Địa chỉ" value={address} variant="outlined" onChange={(e) => setAddress(e.target.value)} InputLabelProps={{ shrink: true }} />
                            </div>
                            <div className="email-birthday d-flex">
                                <TextField id="outlined-basic" label="Email" variant="outlined" className='w-100' value={email} onChange={(e) => setEmail(e.target.value)} InputLabelProps={{ shrink: true }} />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Ngày tháng năm sinh"
                                        inputFormat="DD/MM/YYYY"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Phòng ban (Không bắt buộc)</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={departmentSelected}

                                        label="Phòng ban (Không bắt buộc)"
                                        onChange={handleChangeDepartment}
                                    >
                                        {departments?.map((department, index) => (
                                            <MenuItem value={department?._id} key={index}>{department?.nameDepartment}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>


                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Phân quyền</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Phân quyền"
                                        onChange={handleChangeRole}
                                    >
                                        {/* {departments?.map((department, index) => ( */}
                                        <MenuItem value={"Coder"}>Coder</MenuItem>
                                        <MenuItem value={"Project Manager"}>Project Manager</MenuItem>
                                        <MenuItem value={"Leader"}>Leader</MenuItem>
                                        <MenuItem value={"Admin"}>Admin</MenuItem>
                                        {/* ))} */}

                                    </Select>
                                </FormControl>
                            </div>

                        </div>
                        <div className="gender-form">
                            <FormControl className='flex-row align-items-center w-100 radio-form'>
                                <FormLabel id="demo-row-radio-buttons-group-label" >Giới tính:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    style={{ marginLeft: 10 }}

                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="submit-btns d-flex align-items-center" style={{ marginTop: 20, justifyContent: 'end' }}>
                    <div className="exit" style={{ marginRight: 30, color: "#919EAB", cursor: 'pointer' }} onClick={() => setType()}>
                        Hủy bỏ
                    </div>
                    <div className="add">
                        <button type="button" disabled={imgPreview ? false : true} class="btn btn-primary" onClick={handleCreateUser} >{type === "add" ? "Thêm mới" : "Lưu lại"}</button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default AddUser