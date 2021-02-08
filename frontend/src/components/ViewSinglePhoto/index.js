import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EXIF from "exif-js";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import EditButton from "./EditButton.js"


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

return (
  <>
    <div key={location.id} className="ImageThumb__photo">
    
        <img src={location.photoThumbUrl} alt="nature" onClick={handleClickOpen}/>
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