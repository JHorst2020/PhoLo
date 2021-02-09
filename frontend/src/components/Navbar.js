import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/session";
import Login from "./Login"

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
    } else {
      history.push("/signup");
    }
  };


  return (
    <NavWrapper>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Create User</NavLink>
      <NavLink to="/users">All Users</NavLink>
      {user ? <button onClick={handleLogout}>Logout</button> : <Login />}
      {/* <button onClick={handleLogout}>{user ? "Logout" : "Login"}</button> */}
      {user ? <NavLink to="/myPhotos">My Photos</NavLink> : ""}
    </NavWrapper>
  );
};

export default Navbar;
