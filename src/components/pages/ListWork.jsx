import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import Header from "../Header/Header";
import user1 from "../../assets/user-1.png";
import user2 from "../../assets/user-2.png";
import user3 from "../../assets/user-3.png";
import user4 from "../../assets/user-4.png";
import "../../styles/list-work.css";
import { useState } from "react";
import MenuBar from "../ui/MenuBar/MenuBar";
import CardTask from "../ui/CardTask/CardTask";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddWork from "../ui/AddWork/AddWork";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "../../lib/axios";
import { useParams } from "react-router";
import parse from "html-react-parser";
import CircularProgress from '@mui/material/CircularProgress';
import "./col-task.css";

import {
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Col } from "reactstrap";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoopIcon from "@mui/icons-material/Loop";
import { createStyles, makeStyles } from "@material-ui/core";
import { converstTimeDate } from "../../utils/ImageUpload";
import { useNavigate } from "react-router";

const ListWork = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [userOnline, setUserOnline] = useState([]);
  const [listDepartment, setListDepartment] = useState();
  const [listTask, setListTask] = useState([]);
  const [loading, setLoading] = useState("");
  const [fetch, setFetch] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    new Promise(async () => {
      await initSelectData();
      await initTask();
    });
  }, [id, fetch]);

  useEffect(() => {
    new Promise(async () => {
      const res = await axios.get(`/department/show`);
      if (res.status === 200) {
        setListDepartment(res.data.data);
      }
    });
  }, []);

  const handleChange = (event) => {
    navigate(`/list-work/${event.target.value}`);
  };

  const initSelectData = async () => {
    try {
      const res = await axios.get(`/users/belong-to-department/${id}`);
      if (res) {
        setUserOnline(res.data.data);
      }
    } catch (error) {
      console.log("error init Select Data");
    }
  };

  const initTask = async () => {
    try {
      const res = await axios.get(`/timeline/list-all-tasks/all/${id}`);
      
      setLoading("done");
      if (res.status === 200) {
        setListTask(res.data.data);
        setLoading("")
      }
    } catch (error) { }
    finally {
    }
  };

  const redirectPageListCalendar = (status) => {
    navigate(`/list-work-calendar/${id}/${status}`);
  }

  const renderString = (string) => {
    // if (string.length > 100) {
    //   return string.slice(0, 50) + "...";
    // } else {
    //   return string;
    // }
    return " Click để xem chi tiết"
  };
  const handleRedirectPage = (idTask) => {
    navigate(`/list-work-detail/${id}/${idTask}`);
  };

  const taskRequest = (listTask, status) => {
    return (
      <>
        {listTask
          .filter((item) => item.status === status)
          .map((i) => (
            <div className="card-task">
              <div className="card" style={{ overflow: "hidden" }}>
                <div className="card-title">
                  <h5
                    className="title-main-list-work"
                    onClick={() => handleRedirectPage(i._id)}
                  >
                    {i.nameCard}
                  </h5>
                </div>
                <div className="card-description">
                  {renderString(parse(i.descriptionCard))}
                </div>
                <div className="card-time d-flex align-items-center">
                  <AccessTimeIcon fontSize="12" />
                  <div className="start-end-time d-flex align-items-center">
                    <div className="start-time">
                      {converstTimeDate(i.startDate)}-
                    </div>
                    <div className="end-time">
                      {converstTimeDate(i.endDate)}
                    </div>
                  </div>
                </div>
                <div className="owner-card d-flex align-items-center">
                  <div className="avt">
                    <img
                      src={i?.owner?.avatar}
                      alt=""
                      style={{
                        height: "30px",
                        width: " 30px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="owner d-flex">
                    Owner: <div className="name">{i?.owner?.name}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      {showModalAdd && (
        <AddWork
          userOnline={userOnline}
          idDepartment={id}
          showModal={setShowModalAdd}
          setFetch={setFetch}
          fetch={fetch}
        />
      )}
      <Header />
      <Container fluid>
        <Row className="align-items-center row-menubar">
          <Col lg="4">
            <div className="left-side d-flex">
              <div className="select-side">
                <FormControl sx={{ m: 1 }} className="form-control">
                  <Select
                    onChange={handleChange}
                    value={id}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {listDepartment?.map((e) => (
                      <MenuItem key={e._id} value={e._id}>
                        {e.nameDepartment}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="users-online d-flex align-items-center">
                {userOnline?.map((user, index) => {
                  return index < 4 ? (
                    <div
                      key={index}
                      className="user-online"
                      style={{ zIndex: index, marginLeft: -10 }}
                    >
                      <img src={user.avatar} alt="" />
                    </div>
                  ) : (
                    ""
                  );
                })}
                <div
                  className="user-more"
                  style={{ zIndex: 1, marginLeft: -10 }}
                >
                  {" "}
                  ...
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6" className="share-search action-col d-flex">
            <Button variant="outlined">Chia sẻ</Button>

            <FormControl style={{ width: 200 }}>
              <TextField
                size="small"
                variant="outlined"
                onChange={handleChange}
                placeholder="Tìm kiếm"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  // endAdornment: (
                  //     <InputAdornment
                  //         position="end"
                  //         style={{ display: showClearIcon }}
                  //         onClick={handleClick}
                  //     >
                  //         <ClearIcon />
                  //     </InputAdornment>
                  // )
                }}
              />
            </FormControl>
            <div className="filter d-flex align-items-center">
              <FilterAltOutlinedIcon /> <div>Lọc</div>
            </div>
            <div className="sort d-flex align-items-center">
              <SwapVertOutlinedIcon />
              <div>Sắp xếp</div>
            </div>
            <div className="template d-flex align-items-center">
              <ViewQuiltIcon />
              <div>Giao diện </div>
              <ExpandMoreIcon />
            </div>
            <div className="synchronized d-flex align-items-center">
              <LoopIcon />
              <div>Đồng bộ </div>
            </div>
          </Col>
          <Col lg="2">
            <Button
              variant="contained"
              className="add-new"
              onClick={() => setShowModalAdd(true)}
            >
              Thêm mới
            </Button>
          </Col>
        </Row>
        <Row>
          <div className="col-card">
            <div className="title-header d-flex">
              <div className="title-add d-flex align-items-center">
                <div
                  className="title"
                  style={{ borderLeft: ` 3px solid #1890ff` }}
                >
                  Yêu cầu
                </div>
                {/* <div className="add">
            <Button variant="outlined" style={{ border: "1px solid #91caff" }}>Thêm</Button>
          </div> */}
              </div>
              <div className="title-more">
                <Button variant="outlined" onClick={()=>redirectPageListCalendar('request')}>TimeLine</Button>
              </div>
            </div>
            <div className="card-task-list">
              {loading === 'done' ? (
                
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems :'center'
                 }}>
                  <CircularProgress />
                  </div>
                
              ) : (
                listTask && taskRequest(listTask, "request")
              )}

            </div>
          </div>

          <div className="col-card">
            <div className="title-header d-flex">
              <div className="title-add d-flex align-items-center">
                <div
                  className="title"
                  style={{ borderLeft: ` 3px solid #ff9600` }}
                >
                  Đang làm
                </div>
                {/* <div className="add">
            <Button variant="outlined" style={{ border: "1px solid #91caff" }}>Thêm</Button>
          </div> */}
              </div>
              <div className="title-more">
                <Button variant="outlined" style={{ 
                    border: "1px solid #ff9600",
                    color: "#ff9600"
               }} onClick={()=>redirectPageListCalendar('progress')}>TimeLine</Button>
              </div>
            </div>
            <div className="card-task-list">
              {listTask && taskRequest(listTask, "progress")}
            </div>
          </div>

          <div className="col-card">
            <div className="title-header d-flex">
              <div className="title-add d-flex align-items-center">
                <div
                  className="title"
                  style={{ borderLeft: ` 3px solid #ff9600` }}
                >
                  Chờ duyệt
                </div>
                {/* <div className="add">
            <Button variant="outlined" style={{ border: "1px solid #91caff" }}>Thêm</Button>
          </div> */}
              </div>
              <div className="title-more">
              <Button variant="outlined" style={{ 
                    border: "1px solid #ff9600",
                    color: "#ff9600"
                }}
                onClick={()=>redirectPageListCalendar('pending')}
                >TimeLine</Button>
              </div>
            </div>
            <div className="card-task-list">
              {listTask && taskRequest(listTask, "pending")}
            </div>
          </div>

          <div className="col-card">
            <div className="title-header d-flex">
              <div className="title-add d-flex align-items-center">
                <div
                  className="title"
                  style={{ borderLeft: ` 3px solid #ff4842` }}
                >
                  Sửa
                </div>
                {/* <div className="add">
            <Button variant="outlined" style={{ border: "1px solid #91caff" }}>Thêm</Button>
          </div> */}
              </div>
              <div className="title-more">
              <Button variant="outlined" style={{ 
                    border: "1px solid rgb(255, 72, 66)",
                    color: "rgb(255, 72, 66)"
                }}
                onClick={()=>redirectPageListCalendar('update')}
                >TimeLine</Button>
              </div>
            </div>
            <div className="card-task-list">
              {listTask && taskRequest(listTask, "update")}
            </div>
          </div>

          <div className="col-card">
            <div className="title-header d-flex">
              <div className="title-add d-flex align-items-center">
                <div
                  className="title"
                  style={{ borderLeft: ` 3px solid ##1890ff` }}
                >
                  Hoàn Thành
                </div>
                {/* <div className="add">
            <Button variant="outlined" style={{ border: "1px solid #91caff" }}>Thêm</Button>
          </div> */}
              </div>
              <div className="title-more">
                <Button variant="outlined"
                  onClick={()=>redirectPageListCalendar('done')}
              >TimeLine</Button>
              </div>
            </div>
            <div className="card-task-list">
              {listTask && taskRequest(listTask, "done")}
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ListWork;
