import { useState } from "react";
import { createUser } from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import ImagePreview from "../components/AddPhotoModal/ImagePreview"
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const CreateUser = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumberString, setPhoneNumberString] = useState("")
  // for multuple file upload
  //   const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    let phoneNumber = parseInt(phoneNumberString)
    // console.log(phoneNumber)
    // console.log(typeof phoneNumber)
    
    let newErrors = [];
    dispatch(createUser({ username, email, password, image, firstName, lastName, phoneNumber}))
      .then(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setImage(null);
        setFirstName("");
        setLastName("");
        setPhoneNumberString("");
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


  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

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
            label="First Name"
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
        <label>
          <span style={{ display: "flex", flexFlow: "row", margin: "5px" }}>
            <div style={{ marginRight: "20px", color: "gray" }}>
              Profile Photo:
            </div>
            <input type="file" onChange={updateFile} required/>
          </span>
        </label>
        {/* <label>
            Multiple Upload
            <input 
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
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
            <h1>{user.username}</h1>
            <img
              style={{ width: "150px" }}
              src={user.profileImageUrl}
              alt="profile"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateUser;
