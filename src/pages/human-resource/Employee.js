import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Autocomplete,
  IconButton,
  Tooltip,
  Button,
  Typography,
  Skeleton,
  Modal,
  Box,
  Grid,
  Avatar,
  MenuItem,
} from "@mui/material";
import {
  CreateEmployee,
  DeleteEmployee,
  EditEmployee,
  GetEmployee,
  searchLocation,
  searchRole,
  searchUser,
} from "../../services";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";

const Employee = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState({ data: [], total: 0 });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteEmployee, setDeleteEmployee] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployee();
  }, [page, pageSize, keyword]);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await GetEmployee(page, pageSize, keyword);
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (e) => {
    console.log(e);
    e.preventDefault();
    const payload = new FormData();
    if (selectedEmployee.profileImage)
      payload.append("file", selectedEmployee.profileImage);
    payload.append("id", selectedEmployee.id);
    payload.append("place_birth", selectedEmployee.place_of_birth);
    payload.append("full_name", selectedEmployee.full_name);
    payload.append("date_birth", selectedEmployee.date_of_birth);
    payload.append("address", selectedEmployee.address);
    payload.append("date_joined", selectedEmployee.date_joined);
    payload.append("gender", selectedEmployee.gender);
    payload.append("position", selectedEmployee?.posisi?.id);
    payload.append("location", selectedEmployee.Location.id);

    await EditEmployee(payload)
      .then((r) => {
        fetchEmployee();
        setModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        fetchEmployee();
        setModalOpen(false);
      });
  };

  const addEmployee = async (e) => {
    // console.log(newEmployee);
    e.preventDefault();

    const payload = new FormData();
    if (newEmployee.profileImage)
      payload.append("file", newEmployee.profileImage);
    payload.append("user_id", newEmployee.user_id);
    payload.append("place_birth", newEmployee.place_of_birth);
    // payload.append("full_name", newEmployee.full_name);
    payload.append(
      "date_birth",
      dayjs(newEmployee.date_of_birth).toISOString()
    );
    payload.append("address", newEmployee.address);
    payload.append("date_joined", dayjs(newEmployee.date_joined).toISOString());
    payload.append("gender", newEmployee.gender);
    payload.append("position", newEmployee?.posisi?.id);
    payload.append("location", newEmployee.Location.id);

    await CreateEmployee(payload)
      .then((r) => {
        fetchEmployee();
        setAddModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        fetchEmployee();
        setAddModalOpen(false);
      });
  };

  const fetchRole = async (keyword = "") => {
    await searchRole(keyword).then((r) => {
      setRoleList(r.data);
    });
  };

  const fetchLocation = async (keyword = "") => {
    await searchLocation(keyword).then((r) => {
      setLocationList(r.data);
    });
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchInputChange = (event) => {
    setKeyword(event.target.value);
    setPage(0);
  };

  const handleOpenModal = async (employee) => {
    setSelectedEmployee(employee);
    await fetchRole();
    await fetchLocation();

    setModalOpen(true);
  };

  const handleCloseModal = () => {
    fetchEmployee();
    setSelectedEmployee(null);
    setModalOpen(false);
  };

  const handleOpenAddModal = async () => {
    await fetchRole();
    await fetchLocation();
    setAddModalOpen(true);
  };

  const handleCloseAddModal = async () => {
    setAddModalOpen(false);
    setSelectedUser(null); // Reset selected user on modal close
  };

  const handleAutoCompleteUser = async (event, value) => {
    console.log(event.type);
    if (event.type === "change") {
      setTimeout(async () => {
        await searchUser(event.target.value).then((r) => {
          setUserList(r.data);
        });
      }, 100);
    } else if (event.type === "click") {
      console.log(value);
      setNewEmployee({
        ...newEmployee,
        email: value?.email || null,
        full_name: value?.name || null,
        user_id: value?.id || null,
      });
      console.log(newEmployee);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee({ ...selectedEmployee, [name]: value });
    console.log(selectedEmployee);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
    // console.log(newEmployee);
  };

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsAvatarModalOpen(false);
      const imageUrl = reader.result;
      setSelectedEmployee({
        ...selectedEmployee,
        picture_profile: imageUrl,
        profileImage: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // setIsAvatarModalOpen(false);
      const imageUrl = reader.result;
      setNewEmployee({
        ...newEmployee,
        picture_profile: imageUrl,
        profileImage: file,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarModalClose = () => {
    setIsAvatarModalOpen(false);
  };

  const handleDeleteRole = async (id) => {
    await DeleteEmployee(id)
      .then((r) => {
        if (r.status === 200) {
          fetchEmployee();
          setDeleteModalOpen(false);
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const handleOpenDeleteModal = (emp) => {
    setDeleteEmployee(emp);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteEmployee(null);
    setDeleteModalOpen(false);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Employee Management
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Tooltip title="Add Role" placement="top">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              padding: "5px",
              width: "30px",
              "&:hover": {
                backgroundColor: "#fefefe",
              },
            }}
            onClick={handleOpenAddModal}
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={keyword}
          onChange={handleSearchInputChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>

      {loading ? (
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr 1fr 1fr"
          gap="10px"
          minHeight="200px"
          width="100%"
        >
          <div>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
          <div>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
          <div>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
          <div>
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
            <Skeleton width="100%" height={40} />
          </div>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.data.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <Tooltip title="View Employee" placement="top">
                      <IconButton onClick={() => handleOpenModal(emp)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Employee" placement="top">
                      <IconButton onClick={() => handleOpenDeleteModal(emp)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{emp.full_name}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>
                    {dayjs(emp.date_joined).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>{emp?.posisi?.name}</TableCell>
                  <TableCell>{emp?.Location?.name}</TableCell>
                  <TableCell>
                    {dayjs(emp.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    {dayjs(emp.updatedAt).format("YYYY-MM-DD")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employees.total}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={updateEmployee}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Employee
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                value={selectedEmployee?.full_name || ""}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={selectedEmployee?.user.email || ""}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={
                  selectedEmployee?.date_of_birth
                    ? dayjs(selectedEmployee?.date_of_birth).format(
                        "YYYY-MM-DD"
                      )
                    : ""
                }
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Place of Birth"
                name="place_of_birth"
                value={selectedEmployee?.place_of_birth || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={selectedEmployee?.address || ""}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Date Joined"
                name="date_joined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={
                  selectedEmployee?.date_joined
                    ? dayjs(selectedEmployee?.date_joined).format("YYYY-MM-DD")
                    : ""
                }
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                select
                value={selectedEmployee?.gender || ""}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Perempuan">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                fullWidth
                options={roleList}
                getOptionLabel={(option) => option?.name}
                value={selectedEmployee?.posisi}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  setSelectedEmployee({
                    ...selectedEmployee,
                    posisi: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Position" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                fullWidth
                options={locationList}
                getOptionLabel={(option) => option?.name}
                value={selectedEmployee?.Location}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  setSelectedEmployee({
                    ...selectedEmployee,
                    Location: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Location" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box display="flex" alignItems="center">
                <Avatar
                  src={selectedEmployee?.picture_profile}
                  sx={{ width: 100, height: 100, marginRight: 2 }}
                  onClick={handleAvatarClick}
                />
                <Button variant="contained" component="label">
                  Change Avatar
                  <input
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={addModalOpen}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={addEmployee}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" component="h2">
            Add Employee
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Autocomplete
                fullWidth
                options={userList}
                getOptionLabel={(option) => option?.email}
                onInputChange={handleAutoCompleteUser}
                onChange={handleAutoCompleteUser}
                renderInput={(params) => <TextField {...params} label="User" />}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="full_name"
                value={newEmployee?.full_name || ""}
                onChange={handleAddInputChange}
                required
                InputProps={{
                  readOnly: !!selectedUser,
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={newEmployee?.email || ""}
                onChange={handleAddInputChange}
                required
                InputProps={{
                  readOnly: !!selectedUser,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newEmployee?.date_of_birth || ""}
                onChange={handleAddInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Place of Birth"
                name="place_of_birth"
                value={newEmployee?.place_of_birth || ""}
                onChange={handleAddInputChange}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={newEmployee?.address || ""}
                onChange={handleAddInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Date Joined"
                name="date_joined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newEmployee?.date_joined || ""}
                onChange={handleAddInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                select
                value={newEmployee?.gender || ""}
                onChange={handleAddInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Male">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                fullWidth
                options={roleList}
                getOptionLabel={(option) => option?.name}
                onChange={(event, newValue) => {
                  setNewEmployee({
                    ...newEmployee,
                    posisi: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Position" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                fullWidth
                options={locationList}
                getOptionLabel={(option) => option?.name}
                onChange={(event, newValue) => {
                  setNewEmployee({
                    ...newEmployee,
                    Location: newValue,
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Location" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box display="flex" alignItems="center">
                <Avatar
                  src={newEmployee?.picture_profile}
                  sx={{ width: 100, height: 100, marginRight: 2 }}
                  onClick={handleAvatarClick}
                />
                <Button variant="contained" component="label">
                  Change Avatar
                  <input
                    type="file"
                    hidden
                    onChange={handleAddFileChange}
                    accept="image/*"
                  />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Box display="flex" justifyContent="flex-end">
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Confirm Delete
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            Are you sure you want to delete the employee{" "}
            {deleteEmployee ? deleteEmployee.full_name : ""}?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleCloseDeleteModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteRole(deleteEmployee.id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default Employee;
