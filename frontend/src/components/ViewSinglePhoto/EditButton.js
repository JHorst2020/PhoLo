import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {updatePhoto} from "../../store/photo"




export default function EditButton({location}) {
    // let stringDate = location.dateTime.toString()
    const currUser = useSelector((state) => state.session.user )
    let stringDate = location.dateTime
    if (location.dateTime.indexOf("T") > 0) {
        stringDate = location.dateTime.slice(0,location.dateTime.indexOf("T"))
    }
    const id = location.id;
    const user_id = location.user_id
    const locationName = location.locationName
    const streetNumber = location.streetNumber 
    const streetName = location.streetName
    const city = location.city
    const state = location.state
    const zipcode = location.zipcode;
    const photoUrl = location.photoUrl
    const photoThumbUrl = location.photoThumbUrl

    const [updateDate, setDate] = useState(stringDate);
    const [open, setOpen] = useState(false)
    const [updateLat, setLat] = useState(location.latitude)
    const [updateLng, setLng] = useState(location.longitude)
    const [updateTitle, setTitle] = useState(location.photoTitle)
    const [updateDescription, setDescription] = useState(location.description)
    // const [updateDate, setDate] = useState(location.dateTime)
    // console.log(currUser)
    const dispatch = useDispatch()
    if(currUser !== undefined){

        if(currUser.id && currUser.id === location.user_id){
            const handleClickOpen = () => {
                setOpen(true)
            }
            const handleClose = ()=> {
                setOpen(false)
            }
            const handleSubmit = (e) => {
                e.preventDefault()
                const payload = {id, user_id, locationName, streetNumber, streetName, city, state, zipcode, updateDate, updateLat, updateLng, updateTitle, updateDescription, photoUrl, photoThumbUrl}
                setOpen(false)
                dispatch(updatePhoto(payload))
            }
           
            
            
            return (
                <>
        <Button onClick={handleClickOpen} variant="contained" color="primary" >Update </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-text">
            <DialogTitle id="form-dialog-title">Update Photo Information</DialogTitle>
                <DialogContent>
                    <TextField margin="dense" id="photoTitle" label="Title" fullWidth  variant="outlined" value={updateTitle} onChange={(e) => setTitle(e.target.value)} />
                    <TextField margin="dense" id="description" label="Description" fullWidth multiline rowsMax={6} variant="outlined" value={updateDescription} onChange={(e) => setDescription(e.target.value)} />
                    <TextField margin="dense" id="latitude" label="Latitude" fullWidth variant="outlined" value={updateLat} onChange={(e) => setLat(e.target.value)} />
                    <TextField margin="dense" id="longitude" label="Longitude" fullWidth variant="outlined" value={updateLng} onChange={(e) => setLng(e.target.value)} />
                    <TextField margin="dense" id="dateTime"  fullWidth variant="outlined" type="date" value={updateDate} onChange={(e) => setDate(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit} variant="outlined">Update</ Button>
                </DialogActions>
        </Dialog>
        </>
    )
}
    }
    return (
        <></>
    )
}