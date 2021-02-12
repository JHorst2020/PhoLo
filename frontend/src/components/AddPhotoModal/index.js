import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EXIF from "exif-js"
import {addNewPhoto} from "../../store/photo"
import ImageMeta from "./ExifExtract"
import ImagePreview from "./ImagePreview"
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const AddPhotoModal = () => {
  // const user_id = useSelector((state) => state.session.user.id)
  const currentUser = useSelector((state) => state.session)
  const photoData = useSelector((state) => state.photo.uploadedPhotoExif)
  const currentLocations = useSelector((state) => state.photo.locations)
  const photoAddress = useSelector((state) => state.photo.photoLocationName)
  // console.log("this is the user_ID:     ", user_id)
  const classes = useStyles();

  
  // console.log("this is in the addphoto:      ",photoData)
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [address, setAddress] = useState(photoAddress)
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [dateTime, setDateTime] = useState("")

  if(photoData.image !== undefined){
    // console.log(photoData)
    setTitle()
  }

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
      const user_id = currentUser.user.id
      // const latitude = photoData.latitude
      // const longitude = photoData.longitude;
      // const dateTime = photoData.photoDate
      const image = photoData.image
              
      dispatch(addNewPhoto({latitude, longitude, dateTime, image, user_id, currentLocations}))

  }

  return (
    <>
        
      <Button classes={{ root: classes.root }} color="primary" variant="contained" onClick={handleClickOpen}>
        Add Photo
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-text">
        {photoData.image ? <div>Look, photodata, yaya</div> : <></>}
        <DialogTitle id="form-dialog-title">Add Your Photo</DialogTitle>
        <DialogActions>
          <ImagePreview />
          <Button id="file" component="label" color="primary">
            Upload Photo
            <ImageMeta />
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary" classes={{ root: classes.root }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPhotoModal;
