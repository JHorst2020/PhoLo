import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory} from "react-router-dom";
import EXIF from "exif-js"
import {addNewPhoto} from "../../store/photo"
import ImageMeta from "./ExifExtract"
import ImagePreview from "./ImagePreview"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const AddPhotoModal = () => {
  const testselect = useSelector((state) => state.photo.testit)
  const user_id = useSelector((state) => state.session.user.id)
  const currentUser = useSelector((state) => state.session)
  const photoData = useSelector((state) => state.photo.uploadedPhotoExif)
  const photoAddress = useSelector((state) => state.photo.photoLocationName)
  const photoLatitude = useSelector((state) => state.photo.uploadedPhotoExif.latitude)
  const photoLongitude = useSelector((state) => state.photo.uploadedPhotoExif.longitude)
  const photoDate = useSelector((state) => state.photo.uploadedPhotoExif.photoDate)
  const classes = useStyles();

  // console.log("this is in the addphoto:      ",photoData)
  const [open, setOpen] = useState(false);
  const [photoTitle, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [locationName, setAddress] = useState(photoAddress)
  const [dateTime, setDateTime] = useState(photoDate)
  const [latitude, setLatitude] = useState(photoLatitude)
  const [longitude, setLongitude] = useState(photoLongitude)
  const untouchedLocationName = photoAddress

  console.log(typeof locationName)
  useEffect(() => {
    setAddress(locationName)
  }, [photoData])


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
      const latitude = photoData.latitude
      const longitude = photoData.longitude;
      const dateTime = photoData.photoDate
      const image = photoData.image
      console.log("this is the title and description:     ", photoTitle, description)
              
      dispatch(addNewPhoto({latitude, longitude, dateTime, image, user_id, photoTitle, description}))
      setTitle("")
      setDescription("")

  }

  return (
    <div>
      
      <Button classes={{ root: classes.root }} color="primary" variant="contained" onClick={handleClickOpen}>
        Add Photo
      </Button>
      <div >
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-text">
        <div style={{backgroundColor:"#29648A", color:"white", fontSize:"24px", padding:"10px"}}> ADD YOUR PHOTO
          {/* <DialogTitle id="form-dialog-title">Add Your Photo</DialogTitle> */}
        </div>
       <div style={{display:"flex", flexFlow:"column", justifyContent:"center", margin:"15px"}}>
        <DialogActions>
          <div style={{display:"flex", flexFlow:"column", justifyContent:"center"}}>
          <ImagePreview />
        {photoData.image ? 
        <div style={{display:"flex", flexFlow:"column"}}>
          <div style={{margin:"10px"}}></div>
          
          <TextField id="photoTitle" label="Title" fullwidth variant="outlined" value={photoTitle} onChange={(e) => setTitle(e.target.value)} />
          <div style={{margin:"10px"}}></div>
            <TextField id="photoTitle" label="Description" fullwidth variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div style={{margin:"10px"}}></div>
            {/* <TextField id="photoTitle" label="Location/Address" fullwidth variant="outlined" value={locationName} onChange={(e) => setAddress(e.target.value)} /> */}
          {/* <div style={{margin:"10px"}}></div> */}
            {/* <TextField id="photoTitle" label="Latitude" fullwidth variant="outlined" value={latitude} onChange={(e) => setLatitude(e.target.value)} /> */}
          {/* <div style={{margin:"10px"}}></div> */}
            {/* <TextField id="dateTime" variant="outlined" type="date" value={dateTime} onChange={setDateTime} /> */}
          {/* <div style={{margin:"10px"}}></div> */}
    
        </div> : <></>}
          <div style={{justifyContent:"center", display:"flex"}}>

          <Button id="file" component="label" color="primary">
            Upload Photo
            <ImageMeta />
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary" classes={{ root: classes.root }}>
            Submit
          </Button>
          </div>
          </div>
        </DialogActions>
        </div>
      </Dialog>
      </div>
    </div>
  );
};

export default AddPhotoModal;
