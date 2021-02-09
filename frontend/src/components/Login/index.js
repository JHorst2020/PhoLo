import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import NumberFormat from "react-number-format";
import {getRandomDigits} from "../../store/verification"


const LoginModal = () => {
    const [open, setOpen] = useState(false)
    const [openUserName, setOpenUserName] = useState(false)
    const [openPhoneNumber, setOpenPhoneNumber] = useState(false)

    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [phoneNumber, setPhoneNumberString] = useState("")
    const dispatch = useDispatch()
    const randomDigits = useSelector((state) => state.digits)
    const [enterDigits, setEnterDigits] = useState("")
    
    const lazyphone = (e) => {
  setPhoneNumberString(e[1].concat(e[4],e[5],e[6],e[9],e[10],e[11],e[13],e[14],e[15],e[16]))
}

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        setOpenPhoneNumber(false);
        setOpenUserName(false);

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password})).catch((res) => {
            if(res.data && res.data.errors) setErrors(res.data.errors)
        })
    }
    const handleClickUser = () => {
        setOpenUserName(!openUserName)
        setOpenPhoneNumber(false)
    }
    const handleClickPhone = () => {
        setOpenPhoneNumber(!openPhoneNumber)
        setOpenUserName(false)
    }
    const cancelUsernameLogin = () => {
        setOpenUserName(false);
    }
    const cancelPhoneLogin = () => {
        setOpenPhoneNumber(false)
    }
    const generateDigits = () => {
        dispatch(getRandomDigits(phoneNumber))
    }
    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        console.log(randomDigits.digits, enterDigits, typeof randomDigits.digits, typeof enterDigits)
        setErrors([])
        if(randomDigits.digits === parseInt(enterDigits)){
            return dispatch(sessionActions.loginPhone({phoneNumber})).catch((res) => {
                if(res.data && res.data.errors) setErrors(res.data.errors)
            })
        } else {
            setErrors(["Incorrect Verification"])
        }
    }
    const currUser = useSelector((state) => state.session.user)
    if (currUser=== undefined){
        return (
        <div> 
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Login
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle > Select an Option to Login</DialogTitle>
                <Button variant="outlined" color="primary" onClick={handleClickUser}>Username/Password</Button>
                <Button variant="outlined" color="primary" onClick={handleClickPhone}>Phone Number</Button>
                <Dialog open={openUserName} onClose={handleClose} aria-labelledby="form-dialog-title">

                    <DialogContent>
                    <DialogTitle id="form-dialog-title" >Login</DialogTitle>
                    <ul>
                        {errors.map((error, idx)=> (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                    <TextField  margin="dense" id="username" label="Phone Number" type="tel" fullWidth variant="outlined" value={credential} onChange={(e) => setCredential(e.target.value)}/>
                    <TextField  margin="dense" id="password" label="Password" type="password" fullWidth variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={cancelUsernameLogin} color="Primary"> Cancel </Button>
                        <Button  onClick={handleSubmit} color="Primary"> Login </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openPhoneNumber} onClose={handleClose} aria-labelledby="form-dialog-title">

                    <DialogContent>
                    <DialogTitle id="form-dialog-title" >Login</DialogTitle>
                    <ul>
                        {errors.map((error, idx)=> (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                    <span>
                        <NumberFormat format="+1 (###) ###-####" allowEmptyFormatting mask="_" onChange={(e) => lazyphone(e.target.value)}/>
                        <Button  onClick={generateDigits} color="Primary"> Send Verification </Button>
                        
                    </span>

                    <TextField  margin="dense" id="password" label="Password" type="number" max="4" fullWidth variant="outlined" value={enterDigits} onChange={(e) => setEnterDigits(e.target.value)}/>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={cancelPhoneLogin} color="Primary"> Cancel </Button>
                        <Button  onClick={handlePhoneSubmit} color="Primary"> Login </Button>
                    </DialogActions>
                </Dialog>

            </Dialog>
            
        </div>
        )
    }




}
export default LoginModal