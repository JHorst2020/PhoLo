import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EXIF from "exif-js";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import EditButton from "./EditButton.js"
import { updatePhoto } from "../../store/photo";


const photoStyle = {
    maxWidth: "1200px"
}

const ViewSinglePhoto = ({location}) => {
    const [open, setOpen] = useState(false);
    
     const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }
  // const updatedPhoto = useSelector((state) => state.photo.locationModal)
  // const [title, setTitle] = useState(location.photoTitle)
  // const dispatch = useDispatch()
  // useEffect(()=> {
  //   const payload = {id:location.id, dateTime:location.dateTime, description:location.description, title:location.title}
  //   dispatch(updatePhoto(payload))
  // },[title])
const mouseOver = () => {
  document.getElementById(`map-pin-${location.id}`).setAttribute("highlighted", true)
}
const mouseOut = () => {
  document.getElementById(`map-pin-${location.id}`).removeAttribute("highlighted")
}


return (
  <>
    <div id={`photothumb-${location.id}`} key={location.id} className="ImageThumb__photo" onMouseOver={mouseOver} onMouseOut={mouseOut}>
    
        {location.photoThumbUrl ? <img src={location.photoThumbUrl} alt="nature" onClick={handleClickOpen}/> : <img src={location.photoUrl} alt="nature" onClick={handleClickOpen}/>}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-text">
            <Button onClick={handleClose}>{location.id}</Button>
            <img src={location.photoUrl} style={photoStyle}/>
            <h3>{location.photoTitle}</h3>
            {location.description}
            <DialogContentText>
                Date: {location.dateTime}
            </DialogContentText>
                <DialogContentText > 
                    Location: {location.city}, {location.state}
                    </DialogContentText>
                    <EditButton location={location} />
        </Dialog>
    </div>
  </>
);



}
export default ViewSinglePhoto