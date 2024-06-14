import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  Typography,
  Modal,
  Box,
  Button,
  Chip,
  Autocomplete,
  Tooltip,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  CreateRole,
  DeleteRole,
  GetAccessList,
  GetRole,
  UpdateRole,
} from "../../services";
import dayjs from "dayjs";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [accessMenusOptions, setAccessMenusOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAccess, setLoadingAccess] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleAccessMenus, setNewRoleAccessMenus] = useState([]);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const fetchRole = async (page, pageSize, keyword = "", resetPage = false) => {
    setLoading(resetPage);
    await GetRole(page - 1, pageSize, keyword)
      .then((r) => {
        setLoading(false);
        setRoles(r.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err.response);
      });
  };

  const fetchAccessList = async (keyword = "") => {
    setLoadingAccess(true);
    await GetAccessList(keyword)
      .then((r) => {
        setLoadingAccess(false);
        setAccessMenusOptions(r.data);
      })
      .catch((err) => {
        setLoadingAccess(false);
        console.error(err.response);
      });
  };

  const handleCreateRole = async () => {
    const payload = {
      name: newRoleName,
      accessMenus: newRoleAccessMenus.map((menu) => menu.id),
    };

    await CreateRole(payload)
      .then((r) => {
        if (r.status === 200) {
          fetchRole(page, rowsPerPage);
          setCreateModalOpen(false);
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const handleUpdateRole = async () => {
    const payload = {
      id: selectedRole.id,
      name: selectedRole.name,
      accessMenus: selectedRole.access_menus.map((menu) => menu.id),
    };

    await UpdateRole(payload)
      .then((r) => {
        if (r.status === 200) {
          fetchRole(page, rowsPerPage);
          setModalOpen(false);
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const handleDeleteRole = async (id) => {
    await DeleteRole(id)
      .then((r) => {
        if (r.status === 200) {
          fetchRole(page, rowsPerPage);
          setDeleteModalOpen(false);
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  useEffect(() => {
    fetchRole(page, rowsPerPage, "", true);
    fetchAccessList();
  }, [page, rowsPerPage]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    fetchRole(page, rowsPerPage, event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleOpenModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRole(null);
    setModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewRoleName("");
    setNewRoleAccessMenus([]);
  };

  const handleOpenDeleteModal = (role) => {
    setRoleToDelete(role);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setRoleToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleSave = () => {
    handleUpdateRole();
  };

  const handleAccessMenusChange = (event, newValue) => {
    setSelectedRole({
      ...selectedRole,
      access_menus: newValue,
    });
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Role Management
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
            onClick={handleOpenCreateModal}
          >
            <AddIcon />
          </Button>
        </Tooltip>

        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
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
                <TableCell>Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <Tooltip title="View Role" placement="top">
                      <IconButton onClick={() => handleOpenModal(role)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Role" placement="top">
                      <IconButton
                        onClick={() => handleOpenDeleteModal(role)}
                        disabled={role.name === "SA" || role.name === "Guest"}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    {dayjs(role.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {dayjs(role.updated_at).format("YYYY-MM-DD HH:mm:ss")}
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
        count={roles.length}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
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
            Edit Role
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedRole ? selectedRole.name : ""}
            onChange={(e) =>
              setSelectedRole({ ...selectedRole, name: e.target.value })
            }
          />
          {loadingAccess ? (
            <Skeleton width="100%" height={56} />
          ) : (
            <Autocomplete
              multiple
              id="access-menus"
              options={accessMenusOptions}
              getOptionLabel={(option) => option.title}
              value={selectedRole ? selectedRole.access_menus : []}
              onChange={handleAccessMenusChange}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip label={option.title} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Access Menus"
                  placeholder="Select Access Menus"
                />
              )}
            />
          )}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleCloseModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal open={createModalOpen} onClose={handleCloseCreateModal}>
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
            Create New Role
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
          {loadingAccess ? (
            <Skeleton width="100%" height={56} />
          ) : (
            <Autocomplete
              multiple
              id="access-menus"
              options={accessMenusOptions}
              getOptionLabel={(option) => option.title}
              value={newRoleAccessMenus}
              onChange={(event, newValue) => setNewRoleAccessMenus(newValue)}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip label={option.title} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Access Menus"
                  placeholder="Select Access Menus"
                />
              )}
            />
          )}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleCloseCreateModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleCreateRole} variant="contained">
              Create
            </Button>
          </Box>
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
            Are you sure you want to delete the role{" "}
            {roleToDelete ? roleToDelete.name : ""}?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleCloseDeleteModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteRole(roleToDelete.id)}
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

export default RoleManagement;
