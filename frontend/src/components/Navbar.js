import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";
import Login from "./Login"
import Button from "@material-ui/core/Button";
import AddPhotoModal from "../components/AddPhotoModal";

// styled components are great. I recommend you looking into them!
const NavWrapper = styled.div`
  a {
    margin: 5px;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const handleLogout = () => {
    if (user) {
      dispatch(logout());
      history.push("/")
    } else {
      history.push("/signup");
    }
  };
<Button variant="outlined" color="primary">Create User</Button>

  return (
    
    <NavWrapper>
      <NavLink to="/"><Button variant="outlined" color="primary">Home</Button></NavLink>
      {user ? "" : <NavLink to="/signup"><Button variant="outlined" color="primary">Create User</Button></NavLink>}
      <NavLink to="/users"><Button variant="outlined" color="primary">All Users</Button></NavLink>
      {/* <button onClick={handleLogout}>{user ? "Logout" : "Login"}</button> */}
      {user ? <NavLink to="/myPhotos"><Button variant="outlined" color="primary">My Photos</Button></NavLink> : ""}
    {user ? <AddPhotoModal /> : ""}
      {user ? <Button onClick={handleLogout} variant="outlined" color="primary">Logout</Button> : <Login />}
    </NavWrapper>
    
  );
};

export default Navbar;
