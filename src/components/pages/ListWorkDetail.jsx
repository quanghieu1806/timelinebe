import React, { useEffect, useRef } from "react";
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
import { useParams, useNavigate } from "react-router";
import parse from "html-react-parser";
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
import { converstTimeDate, getDataLocalStorage } from "../../utils/ImageUpload";

import ColTask from "../ui/ColTask/ColTask";
import PopTooltip from "../PopToolTip";
import Menu from "@mui/material/Menu";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditorText from "../EditorText";
import "../../styles/list-work.css";
import ButtonCopy from "../ButtonCopy";
import { toast } from "react-toastify";

const ListWorkDetail = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  const [task, setTask] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const editor = useRef(null);
  const { idDepart, idTask } = useParams();
  const [comment, setComment] = useState("");
  const [statusTask, setStatusTask] = useState("");
  const navigate = useNavigate();
  const [idUpdate, setIdUpdate] = useState(-1);
  const [isUpdate, setIsUpdate] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    new Promise(async () => {
      await initTask();
    });
  }, []);

  // useEffect(() => {
  //     new Promise(async() => {
  //         const res = await axios.get(`/department/show`);
  //         if (res.status === 200) {
  //             setListDepartment(res.data.data);
  //         }
  //     })
  // }, [])

  //   const initSelectData = async() => {
  //       try {
  //           const res = await axios.get(`/users/belong-to-department/${id}`);
  //           if (res) {
  //               setUserOnline(res.data.data);
  //           }
  //       } catch (error) {
  //           console.log('error init Select Data');
  //       }
  // }

  const initTask = async () => {
    try {
      const res = await axios.get(`/timeline/list-all-tasks/${idTask}`);
      if (res.status === 200) {
        setTask(res.data.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmitComment = async () => {
    try {
      const user = getDataLocalStorage();
      const res = await axios.post(`/timeline/comment-here`, {
        idTask : idTask,
        comment: comment,
        linkImg: user.avatar,
        idUserComment: user._id,
        nameUserComment: user.name,
      });

      if (res.status === 200) {
        setIsShowButton(false);
        await initTask();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const updateComment = async() => {
    try {
      const user = getDataLocalStorage();
      const res = await axios.put(`/timeline/comment-here`, {
        idTask: idTask,
        idComment: idUpdate ,
        comment: comment,
        linkImg: user.avatar,
        idUserComment: user._id,
        nameUserComment: user.userName,
      });

      if (res.status === 200) {
        setIsShowButton(false);
        setIsUpdate(false);
        setAnchorEl(null);
        await initTask();
      }
    } catch (error) {
      console.log("error");
    }
  }

  const componentComment = ({ editor }) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EditorText
          ref={editor}
          setContent={(e) => setComment(e)}
          content={comment}
        />
        {!isUpdate ? (
          <Button variant="outlined" onClick={handleSubmitComment}>
          Bình Luận
        </Button>
        ) : (
          <Button variant="outlined" onClick={updateComment}>
          Cập Nhật
        </Button>
        )}
      </div>
    );
  };

  const handleChangeStatus = async (e) => {
    try {
      const res = await axios.put(
        `/timeline/update-tasks/${idTask}/${e.target.value}`
      );
      if (res.status === 200) {
        setStatusTask(e.target.value);
        toast.success("Cập Nhật Trạng Thái Thành Công");
        navigate(`/list-work/${idDepart}`);
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleRemoveComment = async(idRemove) => {
    try {
      const res = await axios.put(`/timeline/remove-comment/${idTask}/${idRemove}`);
      if (res.status === 200) {
        toast.success('Xóa Thành Công');
        setAnchorEl(null);
        await initTask();
      }
    } catch (error) {
      console.log('====================================');
      console.log('error');
      console.log('====================================');
    }
  }

  const handleUpdateComment = async(idComment) => {
    try {
      setIsShowButton(true);
      setIsUpdate(true);
      const res = await axios.get(`/timeline/get-comment/${idTask}/${idComment}`);
      if (res.status === 200) {
        setComment(res?.data?.data?.comment);
        setIdUpdate(res?.data?.data?._id)
      }
    } catch (error) {
      console.log('error');
    }
  }


  return (
    <>
      <Header />
      <Container fluid>
        <Row className="card-new">
          <div className="title-work">
            <select
              className="btn status-title color-work"
              value={task.status}
              onChange={(e) => handleChangeStatus(e)}
            >
              <option value="request">Yêu Cầu</option>
              <option value="progress">Đang Làm</option>
              <option value="pending">Chờ Duyệt</option>
              <option value="update">Sửa</option>
              <option value="done">Hoàn Thành</option>
            </select>
            <PopTooltip description={task.nameCard}>
              <h3 className="main-title-work three-dot">{task.nameCard}</h3>
            </PopTooltip>
          </div>
          <div className="card-word">
            <div className="introduce-card">
              <div className="avatar-left">
                <div>
                  <img
                    className="img-avatar"
                    src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg"
                    alt=""
                  />
                </div>
                <div className="name-avatar">
                  <b>{task?.owner?.name}</b>
                  <div className="date-avatar">
                    {converstTimeDate(task.startDate)}
                  </div>
                </div>
              </div>
              <div className="avatar-right">
                <ButtonCopy />
              </div>
            </div>
            <div className="description-data">
              <img src={task.img} alt="hinh anh demo" className="img-demo" />
              {task.descriptionCard && parse(task.descriptionCard)}
            </div>
          </div>
          <div className="card-word width-card-100 mt-2">
            <i class="fa-solid fa-paperclip" style={{ color: "gray" }}></i>{" "}
            <a
              className="title-attack"
              href={task.attackFile}
              target={"_blank"}
            >
              Attack(1)
            </a>
          </div>
          <div className="title-comment">Comments(7)</div>
          <div className="card-word">
            {
              task?.review?.map((item) => (
                <div className="comment">
              <div className="introduce-card">
                <div className="avatar-left">
                  <div>
                    <img
                      className="img-avatar"
                      src={item.linkImg}
                      alt=""
                    />
                  </div>
                  <div className="name-avatar">
                        <b>{item.name}</b>
                    <div className="date-avatar">
                      {converstTimeDate(item.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="avatar-right">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <i class="fa-solid fa-bars"></i>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={()=>handleUpdateComment(item._id)}>
                      <ListItemIcon >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </ListItemIcon>
                      <ListItemText>Sửa</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={()=>handleRemoveComment(item._id)}>
                      <ListItemIcon>
                        <i class="fa-solid fa-trash"></i>
                      </ListItemIcon>
                      <ListItemText>Xóa</ListItemText>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="text-description">
                    {
                      parse(item.comment)
                }
              </div>
            </div>
              ))
            }
          </div>
        </Row>
      </Container>
      <div
        className="bottom-comment"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isShowButton ? (
          componentComment(editor)
        ) : (
          <Button variant="outlined" onClick={() => setIsShowButton(true)}>
            Bình Luận
          </Button>
        )}
      </div>
    </>
  );
};

export default ListWorkDetail;
