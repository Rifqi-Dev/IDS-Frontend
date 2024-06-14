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
  Tooltip,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import {
  Getlocation,
  Createlocation,
  Updatelocation,
  Deletelocation,
} from "../../services";
import dayjs from "dayjs";

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newLocationName, setNewLocationName] = useState("");

  useEffect(() => {
    fetchLocations(page, rowsPerPage, "", true);
  }, [page, rowsPerPage]);

  const fetchLocations = async (
    page,
    pageSize,
    keyword = "",
    resetPage = false
  ) => {
    setLoading(true);
    try {
      const response = await Getlocation(page - 1, pageSize, keyword);
      setLoading(false);
      setLocations(response.data.data);
    } catch (error) {
      setLoading(false);
      console.error(error.response);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    fetchLocations(page, rowsPerPage, event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleOpenModal = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
    setModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setCreateModalOpen(false);
    setNewLocationName("");
  };

  const handleOpenDeleteModal = (location) => {
    setSelectedLocation(location);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedLocation(null);
    setDeleteModalOpen(false);
  };

  const handleSave = async () => {
    const payload = {
      id: selectedLocation.id,
      name: selectedLocation.name,
    };

    try {
      const response = await Updatelocation(payload);
      if (response.status === 200) {
        fetchLocations(page, rowsPerPage);
        setModalOpen(false);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleCreateLocation = async () => {
    const payload = {
      name: newLocationName,
    };

    try {
      const response = await Createlocation(payload);
      if (response.status === 200) {
        fetchLocations(page, rowsPerPage);
        setCreateModalOpen(false);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      const response = await Deletelocation(id);
      if (response.status === 200) {
        fetchLocations(page, rowsPerPage);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Location Management
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Tooltip title="Add Location" placement="top">
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
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <Tooltip title="View Detail" placement="top">
                      <IconButton onClick={() => handleOpenModal(location)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Location" placement="top">
                      <IconButton
                        onClick={() => handleOpenDeleteModal(location)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    {dayjs(location.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {dayjs(location.created_at).format("YYYY-MM-DD HH:mm:ss")}
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
        count={locations.length}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      />
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
            Create New Location
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newLocationName}
            onChange={(e) => setNewLocationName(e.target.value)}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleCloseCreateModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleCreateLocation} variant="contained">
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
            Are you sure you want to delete the location{" "}
            {selectedLocation ? selectedLocation.name : ""}?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleCloseDeleteModal} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteLocation(selectedLocation.id)}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
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
            Edit Location
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedLocation ? selectedLocation.name : ""}
            onChange={(e) =>
              setSelectedLocation({ ...selectedLocation, name: e.target.value })
            }
          />
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
    </Paper>
  );
};

export default Location;
