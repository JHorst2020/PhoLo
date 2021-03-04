import React, {useState} from "react"
import {makeStyles} from "@material-ui/core/styles"
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";
import SearchBar from "./SearchBar"
import Login from "./Login";
import LoginMobileModal from "./Login/loginMobile";
import Button from "@material-ui/core/Button";
import AddPhotoModal from "../components/AddPhotoModal";
import AddPhotoMobileModal from "../components/AddPhotoModal/mobileVersion";
import ProfileAvatar from "../components/ProfileAvatar";
import logo from "../assets/logo.png"
import About from "../components/About"
import AppBar from '@material-ui/core/AppBar';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    size: "small",
    backgroundColor: "#2e9cca",
    variant: "contained",
  }
}))

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const classes = useStyles()
 const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      history.push("/");
    } else {
      history.push("/signup");
    }
  };

  return (
    <div>
      <AppBar position="sticky">
        <div className="outterNavContainer">
          <div style={{display:"flex", alignItems:"center"}}>
            <div style={{ display: "flex", flexDirection:"column", alignItems: "center" }}>
              <NavLink to="/">
                <img src={logo} className="logo-image" alt="logo"/>
              </NavLink>
              <div className="mobile-nav-bar" style={{ marginLeft: "5px", marginBottom:"5px" }}>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  classes={{ root: classes.root }}
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                >
                  <i class="fas fa-bars"></i>
                </Button>
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <NavLink to="/">
                    <Button>HOME</Button>
                  </NavLink>
                </MenuItem>

                {user ? (
                  ""
                ) : (<>
                  <MenuItem>
                    <NavLink to="/signup"><Button>signup</Button></NavLink>
                  </MenuItem>
                  </>
                )}
                {user ? (
                  <MenuItem>
                    <NavLink to="/myPhotos"><Button>My Photos</Button></NavLink>
                  </MenuItem>
                ) : (
                  ""
                )}
                {user ? (
                  <MenuItem>
                  <AddPhotoMobileModal />
                  </MenuItem>
                ) : (
                  ""
                )}
                {user ? (
                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      
                    >
                      LOGOUT
                    </Button>
                  </MenuItem>
                ) : (
                  <MenuItem>
                  <LoginMobileModal />
                  </MenuItem>
                )}
                <MenuItem>
                  <About />
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div className="navContainer">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                marginRight: "50px",
              }}
            >
              <div className="navBarWrapper">
                <NavLink to="/" className="navBarCssButton">
                  <Button
                    id="home-nav-button"
                    classes={{ root: classes.root }}
                    variant="contained"
                    color="primary"
                  >
                    Home
                  </Button>
                </NavLink>
                {user ? (
                  ""
                ) : (
                  <NavLink to="/signup" className="navBarCssButton">
                    <Button
                      classes={{ root: classes.root }}
                      variant="contained"
                      color="primary"
                    >
                      signup
                    </Button>
                  </NavLink>
                )}
                {user ? (
                  <NavLink to="/myPhotos" className="navBarCssButton">
                    <Button
                      classes={{ root: classes.root }}
                      variant="contained"
                      color="primary"
                    >
                      My Photos
                    </Button>
                  </NavLink>
                ) : (
                  ""
                )}

                {user ? (
                  <div className="navBarCssButton">
                    <AddPhotoModal />{" "}
                  </div>
                ) : (
                  ""
                )}

                {user ? (
                  <div className="navBarCssButton">
                    <Button
                      onClick={handleLogout}
                      classes={{ root: classes.root }}
                      variant="contained"
                      color="primary"
                    >
                      Logout
                    </Button>{" "}
                  </div>
                ) : (
                  <Login className="navBarCssButton" />
                )}
                <div className="navBarCssButton">
                  <About />
                </div>
              </div>
              <div className="nav" style={{ flex: "1" }}>
                <SearchBar />
              </div>
            </div>
          </div>
          <div style={{ flex: "1" }}>
            <ProfileAvatar />
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Navbar;
