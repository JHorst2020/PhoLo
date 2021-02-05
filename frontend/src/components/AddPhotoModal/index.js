import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EXIF from "exif-js"
import {addNewPhoto} from "../../store/photo"
import ImageMeta from "./ExifExtract"
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddPhotoModal = () => {
  // const user_id = useSelector((state) => state.session.user.id)
  const currentUser = useSelector((state) => state.session)
  const photoData = useSelector((state) => state.photo.uploadedPhotoExif)
  // console.log("this is the user_ID:     ", user_id)

  
  const [open, setOpen] = useState(false);


  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);


  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      setOpen(false)
      console.log("this is photoData:   ", photoData)
      const user_id = currentUser.user.id
      const latitude = photoData.latitude
      const longitude = photoData.longitude;
      const dateTime = photoData.photoDate
      const image = photoData.image
              
      dispatch(addNewPhoto({latitude, longitude, dateTime, image, user_id}))

  }

  return (
      <>
    <Button
      variant="outlined"
      color="primary"
      onClick={handleClickOpen}
    >Add Photo</Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-text">
        <DialogTitle id="form-dialog-title">Add Your Photo</DialogTitle>
        <DialogActions>
          {/* <Button variant="contained" component="label" onclick={handleSubmit} color="primary">Upload Photo<input type="file" id="file" accept=".jpg, .png, .heif, .heic" hidden /></Button> */}
          <Button  id="file" component="label" color="primary">Upload Photo<ImageMeta /></Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
    </Dialog>
</>
  );
};

export default AddPhotoModal;
