import React, { useEffect, useState } from "react";
import { AccessMenus } from "../services";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Skeleton,
  Typography,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";

//load icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const icons = {
  "/": <HomeOutlinedIcon fontSize="small" />,
  "/human-resource": <EmojiPeopleOutlinedIcon fontSize="small" />,
  "/human-resource/employee-management": (
    <PeopleAltOutlinedIcon fontSize="small" />
  ),
  "/human-resource/employee-config": (
    <ManageAccountsOutlinedIcon fontSize="small" />
  ),
};

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
  },
}));

function Sidenav() {
  const navigate = useNavigate();
  const [Menus, setMenus] = useState([]);
  const location = useLocation();
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({});

  useEffect(() => {
    const getAccessMenus = async () => {
      setLoading(true);
      try {
        const response = await AccessMenus();
        setMenus(response.data);
      } catch (error) {
        console.error("Error fetching menus", error);
      } finally {
        setLoading(false);
      }
    };

    getAccessMenus();
  }, []);

  document.title = "Test ID Solutions";
  // useEffect(() => {
  //   document.title =
  //     Menus.filter((data) => data.url === pathname)?.title || "Loading...";
  // }, [pathname, Menus]);

  const handleToggle = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const renderMenuItems = (items, child = false) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <MenuItem
          button
          onClick={() => {
            if (item.child?.length > 0) {
              handleToggle(item.id);
            } else {
              navigate(item.url);
            }
          }}
          selected={pathname === item.url}
          sx={{
            "&:hover": {
              backgroundColor: "#334155",
            },
            marginTop: "5px",
            marginLeft: child ? "15px" : "0px",
            marginRight: child ? "15px" : "0px",
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}> {icons[item.url]}</ListItemIcon>
          <ListItemText>
            <Typography variant="body2">{item.title}</Typography>
          </ListItemText>
          {item.child?.length > 0 ? (
            open[item.id] ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : null}
        </MenuItem>
        {item.child?.length > 0 && (
          <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenuItems(item.child, true)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <DrawerContainer variant="permanent">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="h6">ID Solutions</Typography>
      </Box>
      <List>
        {loading
          ? Array.from(new Array(5)).map((_, index) => (
              <ListItem key={index}>
                <Skeleton variant="rectangular" width={210} height={40} />
              </ListItem>
            ))
          : renderMenuItems(Menus)}
      </List>
    </DrawerContainer>
  );
}

export default Sidenav;
