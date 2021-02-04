import { useState } from "react";
import { createUser } from "../store/session";
import { useDispatch, useSelector } from "react-redux";
import NumberFormat from "react-number-format";

const CreateUser = () => {
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
        setPhoneNumberString();
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
      <h1>AWS S3 Express-React Demo</h1>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}
      >
        <label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <NumberFormat format="+1 (###) ###-####" allowEmptyFormatting mask="_" onChange={(e) => lazyphone(e.target.value)}/>
        <label>
          <input type="file" onChange={updateFile} />
        </label>
        {/* <label>
            Multiple Upload
            <input 
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        <button type="submit">Create User</button>
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
