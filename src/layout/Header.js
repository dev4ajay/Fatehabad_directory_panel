import React, { useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

import HelpIcon from "@mui/icons-material/HelpOutlineOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import UserIcon from "@mui/icons-material/Person";
import { alpha, useTheme } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

// Font Awesome Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faCoins);

import ColorModeContext from "../components/ColorModeContext";
import CustomButton from "../components/CustomButton";

const Header = ({ onSidebarOpen }) => {
  const token = localStorage.getItem("accessToken");
  console.log("token", token);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const anchorRef = useRef(null);
  const colorMode = useContext(ColorModeContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        elevation={5}
        sx={{
          top: 0,
          border: 0,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.secondary,
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          <Box
            alignItems="center"
            sx={{ display: { md: "block", lg: "none" } }}
          >
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => onSidebarOpen()}
              aria-label="Menu"
              sx={{
                borderRadius: 2,
                minWidth: "auto",
                padding: 1,
                color: theme.palette.text.secondary,
                borderColor: alpha(theme.palette.text.secondary, 0.2),
              }}
            >
              <MenuIcon fontSize="medium" />
            </Button>
          </Box>
          <Link to="/Dashboard" style={{ textDecoration: "none" }}>
            <Box>
              <IconButton size="large" disabled>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    color: theme.palette.text.primary,
                    fontWeight: "bold",
                    display: {
                      md: "inline",
                      xs: "none",
                    },
                  }}
                >
                  Digital Fatehabad
                </Typography>
              </IconButton>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {token === null ? (
            <>
              <Box
                sx={{
                  alignItems: "center",
                  display: { lg: "flex", md: "none", xs: "none" },
                }}
              >
                <Link
                  href="/"
                  text="Login"
                  className="text-decoration-none text-black"
                >
                  Login
                </Link>
              </Box>
            </>
          ) : (
            <>
              {" "}
              <Box
                sx={{
                  alignItems: "center",
                  display: { lg: "flex", md: "none", xs: "none" },
                }}
              >
                <CustomButton
                  href="/Dashboard"
                  icon={<DashboardIcon />}
                  text="Dashboard"
                />
                <CustomButton
                  href="/CategoryList"
                  icon={<CategoryIcon />}
                  text="Categories"
                />
                <CustomButton href="/business" icon={<NotificationsActiveIcon />} text="Notification" />
              </Box>
              <Divider
                orientation="vertical"
                sx={{
                  height: 32,
                  mx: 2,
                  display: { lg: "flex", md: "none", xs: "none" },
                }}
              />
              <Box sx={{ display: "flex" }}>
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  aria-label="Theme Mode"
                  color={theme.palette.mode === "dark" ? "warning" : "inherit"}
                >
                  {theme.palette.mode === "dark" ? (
                    <LightModeIcon fontSize="medium" />
                  ) : (
                    <DarkModeIcon fontSize="medium" />
                  )}
                </IconButton>
              </Box>
              <Divider
                orientation="vertical"
                sx={{
                  height: 32,
                  mx: 2,
                  display: { lg: "flex", md: "none", xs: "none" },
                }}
              />
              <Box sx={{ display: { lg: "flex", md: "none", xs: "none" } }}>
                <Box
                  component={ButtonBase}
                  onClick={handleOpen}
                  ref={anchorRef}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Tooltip title="User Account">
                    <Avatar
                      sx={{
                        height: 32,
                        width: 32,
                        backgroundColor: theme.palette.primary.main,
                      }}
                    />
                  </Tooltip>
                </Box>
                <Popover
                  anchorEl={anchorRef.current}
                  anchorOrigin={{
                    horizontal: "center",
                    vertical: "bottom",
                  }}
                  keepMounted
                  onClose={handleClose}
                  open={open}
                  PaperProps={{
                    sx: { width: 240 },
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography
                      color={theme.palette.text.primary}
                      variant="subtitle2"
                    >
                      Bob
                    </Typography>
                    <Typography
                      color={theme.palette.text.secondary}
                      variant="subtitle2"
                    >
                      Your plan: Free
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <MenuItem component={Link} to="https://admin.digitalfatehabad.com/Dashboard">
                      <ListItemIcon>
                        <UserIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            color={theme.palette.text.primary}
                            variant="subtitle2"
                          >
                            Profile
                          </Typography>
                        }
                      />
                    </MenuItem>
                    <MenuItem component={Link} to="#">
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            color={theme.palette.text.primary}
                            variant="subtitle2"
                          >
                            Settings
                          </Typography>
                        }
                      />
                    </MenuItem>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Button
                      color="primary"
                      fullWidth
                      variant="outlined"
                      href="https://admin.digitalfatehabad.com"
                    >
                      Logout
                    </Button>
                  </Box>
                </Popover>
              </Box>
              {theme.palette.mode === "dark" && <Divider />}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Header;
