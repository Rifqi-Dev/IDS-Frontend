import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  MenuItem,
  Button,
  TextField,
  Typography,
  Container,
  Modal,
  Avatar,
  Grid,
} from "@mui/material";
import { GetProfile, EditProfile } from "../services"; // Assuming you have services for fetching and updating profile
import dayjs from "dayjs";

function Profile() {
  const [profileData, setProfileData] = useState({
    full_name: "",
    date_birth: "",
    place_birth: "",
    address: "",
    gender: "",
    picture_profile: null,
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await GetProfile();
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Handle error fetching profile data
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
    setIsDirty(true); // Mark as dirty when any field changes
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setIsAvatarModalOpen(false);
      const imageUrl = reader.result;
      setProfileData({
        ...profileData,
        picture_profile: imageUrl,
        profileImage: file,
      });
      setIsDirty(true);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    setIsDirty(true); // Mark as dirty when image changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (profileData.profileImage)
      formData.append("file", profileData.profileImage);
    formData.append("full_name", profileData.full_name);
    formData.append("date_birth", profileData.date_birth);
    formData.append("place_birth", profileData.place_birth);
    formData.append("address", profileData.address);
    formData.append("gender", profileData.gender);

    try {
      await EditProfile(formData);
      window.location.reload();
      console.log("Profile updated successfully!");
      setIsDirty(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleAvatarModalClose = () => {
    setIsAvatarModalOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ padding: "30px" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Avatar
                  alt="Profile Picture"
                  src={
                    profileData.picture_profile
                      ? profileData.picture_profile
                      : undefined
                  }
                  sx={{ width: 150, height: 150, cursor: "pointer" }}
                  onClick={handleAvatarClick}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ marginTop: 1, cursor: "pointer" }}
                  onClick={handleAvatarClick}
                >
                  Change Picture
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="full_name"
                  value={profileData.full_name}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="date_birth"
                  value={dayjs(profileData.date_birth).format("YYYY-MM-DD")}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Place of Birth"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="place_birth"
                  value={profileData.place_birth}
                  onChange={handleInputChange}
                />
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                />
                <TextField
                  select
                  label="Gender"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </TextField>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isDirty}
                >
                  Save
                </Button>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Modal open={isAvatarModalOpen} onClose={handleAvatarModalClose}>
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
            Change Profile Picture
          </Typography>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            sx={{ mt: 2 }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button onClick={handleAvatarModalClose} sx={{ marginRight: 1 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default Profile;
