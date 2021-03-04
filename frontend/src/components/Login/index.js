import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import NumberFormat from "react-number-format";
import { getRandomDigits } from "../../store/verification";
import { FormControl } from "@material-ui/core";
import SuccessModal from "../Success"

const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const LoginModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openUserName, setOpenUserName] = useState(false);
  const [openPhoneNumber, setOpenPhoneNumber] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [phoneNumber, setPhoneNumberString] = useState("");
  const dispatch = useDispatch();
  const randomDigits = useSelector((state) => state.digits);
  const [enterDigits, setEnterDigits] = useState("");
  const [boolean, setBoolean] = useState(false)

  useEffect(()=> {
  }, [boolean])
  const lazyphone = (e) => {
    setPhoneNumberString(
      e[1].concat(
        e[4],
        e[5],
        e[6],
        e[9],
        e[10],
        e[11],
        e[13],
        e[14],
        e[15],
        e[16]
      )
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenPhoneNumber(false);
    setOpenUserName(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then((res) => {
        if (res.data && !res.data.errors) setBoolean(true);
        let user = res.data.user;
        setTimeout(() => {
          dispatch(sessionActions.updateLoggedInUser(user));
        }, 500);
      })
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  };
  const handleClickUser = () => {
    setOpenUserName(!openUserName);
    setOpenPhoneNumber(false);
  };
  const handleClickPhone = () => {
    setOpenPhoneNumber(!openPhoneNumber);
    setOpenUserName(false);
  };
  const cancelUsernameLogin = () => {
    setOpenUserName(false);
  };
  const cancelPhoneLogin = () => {
    setOpenPhoneNumber(false);
  };
  const generateDigits = () => {
    if (phoneNumber !== "0008675309") {
      dispatch(getRandomDigits(phoneNumber));
    }
  };
  const demoAccount = () => {
    setCredential("DemoUser");
    setPassword("password");
    setPhoneNumberString("0008675309");
    setEnterDigits("0000");
    document
      .getElementById("mainPhoneNumberInputArea")
      .setAttribute("hidden", "");
    document
      .getElementById("demoPhoneNumberInputArea")
      .removeAttribute("hidden");
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (
      randomDigits.digits === parseInt(enterDigits) ||
      phoneNumber === "0008675309"
    ) {
      return dispatch(sessionActions.loginPhone({ phoneNumber })).then(
        (res) => {
          if (res.data && !res.data.errors) setBoolean(true)
          let user = res.data.user
          setTimeout(()=>{
            dispatch(sessionActions.updateLoggedInUser(user))
          },500)
        }
      )
      .catch(
        (res) => {
          if (res.data && res.data.errors) setErrors(res.data.errors);
        }
      );
    } else {

      setErrors(["Incorrect Verification"]);
    }
  };
  const currUser = useSelector((state) => state.session.user);
  if (currUser === undefined || currUser === null) {
    return (
      <a className="navBarCssButton">
        <Button
          classes={{ root: classes.root }}
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Login
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle> Select an Option to Login</DialogTitle>
          <div
            style={{ display: "flex", flexDirection: "column", margin: "15px" }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickUser}
            >
              Username/Password
            </Button>
            <div style={{ margin: "5px" }}></div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClickPhone}
            >
              Phone Number
            </Button>
          </div>
          <Dialog
            open={openUserName}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogTitle id="form-dialog-title">
                Username/Email Login
              </DialogTitle>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <FormControl>
                <TextField
                  margin="dense"
                  id="username"
                  label="Username/Email"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={demoAccount} color="Primary">
                Demo-login
              </Button>
              <Button onClick={cancelUsernameLogin} color="Primary">
                {" "}
                Cancel{" "}
              </Button>
              <Button onClick={handleSubmit} color="Primary">
                {" "}
                Login{" "}
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openPhoneNumber}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <DialogTitle id="form-dialog-title">
                Phone Number Login
              </DialogTitle>
              <ul>
                {errors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
              <span>
                <span id="mainPhoneNumberInputArea">
                  <NumberFormat
                    variant="outlined"
                    format="+1 (###) ###-####"
                    allowEmptyFormatting
                    mask="_"
                    onChange={(e) => lazyphone(e.target.value)}
                    style={{ padding: "10px" }}
                  />
                </span>
                <span id="demoPhoneNumberInputArea" hidden>
                  <NumberFormat
                    variant="outlined"
                    format="+1 (###) ###-####"
                    allowEmptyFormatting
                    mask="_"
                    value="0008675309"
                    style={{ padding: "10px" }}
                    disabled
                  />
                </span>

                <Button
                  id="sendVerificationButton"
                  onClick={generateDigits}
                  color="Primary"
                >
                  {" "}
                  Send Verification{" "}
                </Button>
              </span>

              <TextField
                margin="dense"
                id="digits"
                label="4 Digit Code"
                type="number"
                max="4"
                fullWidth
                variant="outlined"
                value={enterDigits}
                onChange={(e) => setEnterDigits(e.target.value)}
              />
              <SuccessModal boolean={boolean} />
            </DialogContent>
            <DialogActions>
              <Button onClick={demoAccount} color="Primary">
                Demo-login
              </Button>
              <Button onClick={cancelPhoneLogin} color="Primary">
                {" "}
                Cancel{" "}
              </Button>
              <Button onClick={handlePhoneSubmit} color="Primary">
                {" "}
                Login{" "}
              </Button>
            </DialogActions>
          </Dialog>
        </Dialog>
      </a>
    );
  } else {
    return <></>;
  }
};
export default LoginModal;