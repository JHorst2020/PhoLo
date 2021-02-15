import styled from "styled-components";
import {makeStyles} from "@material-ui/core/styles"
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";
import SearchBar from "./SearchBar"
import Login from "./Login";
import Button from "@material-ui/core/Button";
import AddPhotoModal from "../components/AddPhotoModal";
import ProfileAvatar from "../components/ProfileAvatar";
import logo from "../assets/logo.png"


// styled components are great. I recommend you looking into them!
// const NavWrapper = styled.div`
 
  
//   background-color: red;
// `;
const useStyles = makeStyles(theme => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  }
}))

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const classes = useStyles()
  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      history.push("/");
    } else {
      history.push("/signup");
    }
  };
  

  return (
    // <NavWrapper>
    <div className="outterNavContainer">
      <div className="navContainer">
        <NavLink to="/">
          <img src={logo} className="logo-image" />
        </NavLink>
          <div style={{display:"flex", flexDirection:"row", alignItems:"center", flexWrap:"wrap", marginRight:"50px"}}>
        <div className="navBarWrapper">
            <NavLink to="/" className="navBarCssButton">
              <Button
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
                  Create User
                </Button>
              </NavLink>
            )}
            {/* <NavLink to="/users" className="navBarCssButton">
              <Button
                classes={{ root: classes.root }}
                variant="contained"
                color="primary"
              >
                All Users
              </Button>
            </NavLink> */}
            {/* <button onClick={handleLogout}>{user ? "Logout" : "Login"}</button> */}
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
                <AddPhotoModal margin="50px" />{" "}
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
          </div>
          <div className="navBarCssButton">
            <SearchBar />
          </div>
        </div>
      </div>
      <div className="avatarContainer">
        <ProfileAvatar />
      </div>
    </div>

    // </NavWrapper>
  );
};

export default Navbar;
