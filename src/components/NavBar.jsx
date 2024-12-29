import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import LogoImg from "../assets/logo2.png";

const pages = ["About", "Admin Login"];
//const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      style={{ color: "black", backgroundColor: "white" }}
    >
      {/* #dfe5f0  */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Left Side Logo */}
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Box style={{
              display: { xs: "none", sm: "none", md: "block", lg: "block" },
            }}>
          <Link to={"/"}>
          <img
            src={LogoImg}
            width="80px"
            height="100px"
          />
          </Link>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/" // Use `to` for navigation, redirecting to the homepage
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Kandy Garden Club
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none"},justifyContent:'end'}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Box>
              <Link
              to={`/about`}
              style={{
                margin: "16px",
                color: "black",
                fontWeight: 500,
                display: "block",
                textDecoration: "none",
                mx: 2,
              }}
            >
              <Typography textAlign="center">ABOUT US</Typography>
            </Link>
            <Link
              to={`/login`}
              style={{
                margin: "16px",
                color: "black",
                fontWeight: 500,
                display: "block",
                textDecoration: "none",
                mx: 2,
              }}
            >
              <Typography textAlign="center">ADMIN LOGIN</Typography>
            </Link>
              </Box>
            </Menu>
          </Box>

          {/* Pages (Products, Pricing, Blog) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Link
              to={`/about`}
              style={{
                marginLeft: "16px",
                color: "black",
                fontWeight: 500,
                display: "block",
                textDecoration: "none",
                mx: 2,
              }}
            >
              ABOUT US
            </Link>
            <Link
              to={`/login`}
              style={{
                marginLeft: "16px",
                color: "black",
                fontWeight: 500,
                display: "block",
                textDecoration: "none",
                mx: 2,
              }}
            >
              ADMIN LOGIN
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
