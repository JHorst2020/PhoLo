import { useState } from "react";
import { createUser } from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from "react-router-dom"
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SuccessModal from "../components/Success"
import * as sessionActions from "../store/session"

const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const CreateUser = () => {
  const classes = useStyles();
const history = useHistory()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumberString, setPhoneNumberString] = useState("")
  const [errors, setErrors] = useState([]);
  const [boolean, setBoolean] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    let phoneNumber = parseInt(phoneNumberString)
    let newErrors = [];
    dispatch(createUser({ username, email, image, password, firstName, lastName, phoneNumber}))
      .then((res) => {
        setUsername("");
        setEmail("");
        setPassword("");
        setImage(null);
        setFirstName("");
        setLastName("");
        setPhoneNumberString("");
        if (res.data) setBoolean(true);
        let user = res.data.user;
        setTimeout(()=>{
          dispatch(sessionActions.updateLoggedInUser(user))
          history.push("/")
        }, 500)
      })
      .catch((res) => {
        if (res.data && res.data.errors) {
          newErrors = res.data.errors;
          setErrors(newErrors);
        }
      });
  };

// Picks out specific values from the formatted phone number
// "+1 (###) ###-####"
const lazyphone = (e) => {
  setPhoneNumberString(e[1].concat(e[4],e[5],e[6],e[9],e[10],e[11],e[13],e[14],e[15],e[16]))
}

  // const updateFile = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setImage(file);
  // };

  // for multiple file upload
  //   const updateFiles = (e) => {
  //     const files = e.target.files;
  //     setImages(files);
  //   };

  return (
    <div>
      <h1 style={{margin:"5px"}}>Create New User</h1>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form
        style={{
          display: "flex",
          flexFlow: "column",
          width: "50vw",
          margin: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <label>
          <TextField
            label="First Name"
            type="text"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <TextField
            type="text"
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <TextField
            type="text"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <TextField
            type="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <TextField
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>{" "}
        <span style={{ display: "flex", flexFlow: "row", margin: "5px", alignItems: "center"}}>
          <div style={{ marginRight: "5px", color: "gray" }}>
            Phone Number:
          </div>
          <NumberFormat
            style={{padding:"5px"}}
            format="+1 (###) ###-####"
            allowEmptyFormatting
            mask="_"
            onChange={(e) => lazyphone(e.target.value)}
            />
        </span>
        <div style={{ width: "200px" , margin:"5px"}}>
          <Button
            classes={{ root: classes.root }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create User
          </Button>
        </div>
      </form>
      <div>
        {user && (
          <div>
            <SuccessModal boolean={boolean} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
