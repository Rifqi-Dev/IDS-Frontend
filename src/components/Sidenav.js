import React, { useEffect, useState } from "react";
import { AccessMenus } from "../services";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";
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
  useEffect(() => {
    const getAccessMenus = async () => {
      setLoading(true);
      await AccessMenus()
        .then((r) => {
          setMenus(r.data);
          setLoading(false);
        })
        .catch((err) => {});
    };

    getAccessMenus();
  }, []);

  useEffect(() => {
    document.title =
      Menus.filter((data) => {
        return data.url === pathname;
      })[0]?.title || "Loading...";
  }, [pathname, Menus]);

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
          : Menus.map((item) => (
              <ListItem
                button
                key={item.id}
                component="a"
                onClick={() => {
                  navigate(item.url);
                }}
                selected={pathname === item.url}
                sx={{ "&:hover": { backgroundColor: "#334155" } }}
              >
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
      </List>
    </DrawerContainer>
  );
}

export default Sidenav;
