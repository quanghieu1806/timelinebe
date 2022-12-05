import React from "react";
import TextField from "@mui/material/TextField";
import "./add-work.css";
import CloseIcon from "@mui/icons-material/Close";
import EditorText from "../../EditorText";
import { useState, useEffect, useRef } from "react";
import { imageUpload } from "../../../utils/ImageUpload";
import { toast } from "react-toastify";
import axios from "../../../lib/axios";

const AddWork = ({ showModal, idDepartment, userOnline, setFetch,fetch }) => {
  const [form, setForm] = useState({
    nameCard: "",
    descriptionCard: "",
    startDate: "",
    img: "",
    endDate: "",
    owner: "",
    status: "request",
    isDone: "",
    idDepartment:idDepartment,
    attackFile: "",
  });
  const [listEmployee, setListEmployee] = useState([]);
  const editor = useRef(null);

  useEffect(() => {
    new Promise(async () => {
      await initSelectData();
    });
  }, []);

  const initSelectData = async () => {
    try {
      const res = await axios.get(
        `/users/belong-to-department/${idDepartment}`
      );
      if (res) {
        setListEmployee(res.data.data);
      }
    } catch (error) {
      console.log("error init Select Data");
    }
  };

  const setChangeData = (key, data) => {
    setForm({
      ...form,
      [key]: data,
    });
  };

  const handleUploadFile = async (file) => {
    const fl = file.target.files[0];

    if (fl) {
      const upload = await imageUpload(fl);
      if (upload) {
        setForm({
          ...form,
          img: upload,
        });
      }
    }
  };

  const cleanForm = () => {
    setForm({
      nameCard: "",
      descriptionCard: "",
      startDate: "",
      img: "",
      endDate: "",
      owner: "",
      status: "request",
      isDone: "",
      attackFile: "",
    })
  }

  const handleSubmitData = async () => {
    if (!form.nameCard || !form.descriptionCard || !form.endDate || !form.startDate || !form.img || !form.status || !form.owner) {
      toast.error("Vui lòng không để trống form");
    } else {
      const data = await axios.post("/timeline/create-time-line", form);
      if (data.status === 200) {
        toast.success("Task đã được upload thành công");
        cleanForm();
        showModal(false);
        setFetch(!fetch)
      }
    }
  };

  return (
    <div className="modal-add d-flex">
      <div className="pop-up-add">
        <div className="title-title-add">
          <div className="title d-flex">
            <div className="mini-title">
              <div className="final-title">Thêm list công việc</div>
              <div
                className="close-icon"
                onClick={() => showModal(false)}
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </div>
            </div>
          </div>
          <div className="title-title">
            <div className="title-tit mb-3">Tiêu đề</div>
            <TextField
              id="outlined-basic"
              onChange={(e) => setChangeData("nameCard", e.target.value)}
              value={form.nameCard}
              variant="outlined"
              className="w-100"
            />
          </div>
          <div className="title-title">
            <div className="title-tit mb-3">Đính Kèm Liên Kết (nếu có)</div>
            <TextField
              onChange={(e) => setChangeData("attackFile", e.target.value)}
              value={form.attackFile}
              id="outlined-basic"
              variant="outlined"
              className="w-100"
              placeholder="Link file"
            />
          </div>
          <div className="title-title">
            <div className="title-tit mb-3">Phân Công</div>
            <select className="w-100 select-form-mui" onChange={(e) => setChangeData("owner", e.target.value)}>
              <option value="">-- Vui lòng chọn option --</option>
              {userOnline?.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="title-title">
            <div className="title-tit mb-3">Upload File</div>
            <input
              type="file"
              accept="image/*"
              onChange={(file) => handleUploadFile(file)}
            />
            {form.img && (
              <div className="preview-img">
                <img
                  src={form.img}
                  className="set-img"
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="input-date">
            <div className="title-title form-date-here">
              <div className="title-tit mb-3">Bắt Đầu Ngày</div>
              <input
                type="datetime-local"
                className="w-100 select-form-mui date-form"
                onChange={(e) => setChangeData("startDate", e.target.value)}
              />
            </div>
            <div className="title-title form-date-here">
              <div className="title-tit mb-3">Kết Thúc Ngày</div>
              <input
                type="datetime-local"
                onChange={(e) => setChangeData("endDate", e.target.value)}
                className="w-100 select-form-mui date-form"
              />
            </div>
          </div>
          <div className="title-title">
            <div className="title-tit mb-3">Mô tả</div>
            <EditorText
              ref={editor}
              setContent={(e) => setChangeData("descriptionCard", e)}
              content={form.descriptionCard}
            />
          </div>
        </div>
        <div className="button-add d-flex">
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleSubmitData}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWork;
