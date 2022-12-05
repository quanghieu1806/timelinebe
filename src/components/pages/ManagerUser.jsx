import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../../styles/manager-user.css";
import AddIcon from "@mui/icons-material/Add";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { Container } from "reactstrap";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import ModalDelete from "../ui/ModalDelete/ModalDelete";
import AddUser from "../ui/AddUser/AddUser";
import axios from "../../lib/axios";
import { CSVLink, CSVDownload } from "react-csv";

const columns = [
  { id: "number", label: "STT", maxWidth: 60 },
  { id: "fullname", label: "Họ và tên", minWidth: 90 },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    // align: 'center',
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "position",
    label: "Chức vụ",
    minWidth: 80,
    // align: 'center',
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "department",
    label: "Phòng ban",
    minWidth: 80,
    // align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: "typeuser",
    label: "Kiểu người dùng",
    minWidth: 80,
    // align: 'center',
    format: (value) => value.toFixed(2),
  },
];

function createData(
  number,
  fullname,
  email,
  position,
  department,
  typeuser,
  id
) {
  return { number, fullname, email, position, department, typeuser, id };
}

const ManagerUser = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState();
  const rows = users.map((user, index) =>
    createData(
      index + 1,
      user.name,
      user.email,
      user.position,
      user.idDepartment?.nameDepartment,
      user.role,
      user._id
    )
  );

  const handleGetAllUser = async () => {
    const response = await axios.get("/users/all-user");
    setUsers(response.data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/${userSelected}`);
      handleGetAllUser();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllUser();
  }, []);

  return (
    <>
      {openModalDelete && (
        <ModalDelete
          title={"Bạn muốn xoá thông tin người dùng"}
          showModal={setOpenModalDelete}
          deleteUser={handleDeleteUser}
        />
      )}
      {typeModal && (
        <AddUser
          type={typeModal}
          setType={setTypeModal}
          user={userSelected}
          setUser={setUserSelected}
          getAllUser={handleGetAllUser}
        />
      )}
      <Header />
      <div className="manager-user pt-5">
        <Container>
          <div className="action-btns d-flex">
            <div className="add-user">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => setTypeModal("add")}
              >
                <AddIcon />
                Thêm mới
              </button>
            </div>
            <div className="add-from-file">
              <CSVLink data={rows} className="btn btn-outline-primary">
                Xuất File CSV <FileUploadOutlinedIcon />
              </CSVLink>
            </div>
          </div>
          <div className="table-manager pt-5">
            <Paper
              sx={{ width: "100%", overflow: "hidden" }}
              className="table-container"
            >
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "#F4F6F8",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell
                        style={{ minWidth: 90, backgroundColor: "#F4F6F8" }}
                      >
                        Thao tác
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                            className={
                              index % 2 === 0 ? "table-row-active" : ""
                            }
                          >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                            <TableCell
                              key={"actions"}
                              style={{ color: "#919EAB" }}
                              className="actions"
                            >
                              <ModeEditOutlineRoundedIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setTypeModal("edit");
                                  setUserSelected(row.id);
                                }}
                              />
                              <CloseIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setOpenModalDelete(true);
                                  setUserSelected(row.id);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ManagerUser;
