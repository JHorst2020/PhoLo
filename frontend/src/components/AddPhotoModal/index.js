import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {addNewPhoto} from "../../store/photo"
import ImageMeta from "./ExifExtract"
import ImagePreview from "./ImagePreview"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const AddPhotoModal = (button) => {
  const currentUser = useSelector((state) => state.session)
  const photoData = useSelector((state) => state.photo.uploadedPhotoExif)
  const photoAddress = useSelector((state) => state.photo.photoLocationName)
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [photoTitle, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [locationName, setAddress] = useState(photoAddress)

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
