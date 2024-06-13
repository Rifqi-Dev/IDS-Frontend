import { useEffect, useState } from "react";
import { GetProfile } from "../services";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Topnav() {
  const [user, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  const now = dayjs();
  const currentHour = now.hour();

  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }
  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await GetProfile()
        .then((r) => {
          setUserInfo(r.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err.response);
        });
    };

    fetchInfo();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    auth.isAuthenticated = false;
    auth.token = null;
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fefefe" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {loading ? (
            <Skeleton width={100} />
          ) : (
            <Typography sx={{ color: "#000" }} variant="h6">
              {`${greeting}, ${user.full_name}`}
            </Typography>
          )}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            {loading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <Avatar src={user.picture_profile} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 250,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <Box sx={{ ml: 2 }}>
            <Typography variant="h6" className=" text-[16px]">
              {loading ? <Skeleton width={100} /> : user.full_name}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2">
            <strong>Role:</strong>{" "}
            {loading ? <Skeleton width={60} /> : user.role}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong>{" "}
            {loading ? <Skeleton width={60} /> : user.email}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong>{" "}
            {loading ? <Skeleton width={60} /> : user.phone}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => console.log("Edit Profile")}>
          Edit Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default Topnav;
