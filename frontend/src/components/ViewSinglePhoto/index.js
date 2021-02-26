import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EXIF from "exif-js";
import Modal from "@material-ui/core/Modal";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Box from '@material-ui/core/Box'
import EditButton from "./EditButton.js"
import { updateLocationModal, updateSearchCoord } from "../../store/photo";
import CloseIcon from "@material-ui/icons/Close";
import CancelSharpIcon from '@material-ui/icons/CancelSharp';


const photoStyle = {
    maxWidth: "50vw",
    maxHeight: "60vh",
    objectFit:"scale-down"
    
}

const ViewSinglePhoto = ({location, isOpen=false}) => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(isOpen);
      const locations = useSelector((state) => state.photo.locations);
      let locIndex = locations.findIndex((obj) => obj.id === location.id);
    const modalLocation = useSelector((state) => state.photo.locationModal)
    const searchLocation = useSelector((state) => state.photo.searchLocation)
let stringDate = modalLocation.dateTime;
 if (modalLocation.dateTime) {
    stringDate = modalLocation.dateTime.slice(0, modalLocation.dateTime.indexOf("T"));
  }
     const handleClickOpen = () => {
       const payload = {id, photoTitle, user_id, description, dateTime, locationName, streetNumber, streetName,city, state, zipcode, photoUrl, photoThumbUrl, latitude, longitude}
    dispatch(updateLocationModal(payload))
    setOpen(true);
    dispatch(updateSearchCoord({searchLocation: [location.latitude,location.longitude,5]}))

  };
  const handleClose = () => {
    setOpen(false);
    mouseOut()
  }
   const id = location.id;
   const user_id = location.user_id;
   const locationName = location.locationName;
   const streetNumber = location.streetNumber;
   const streetName = location.streetName;
   const city = location.city;
   const state = location.state;
   const zipcode = location.zipcode;
   const dateTime = location.dateTime;
   const photoTitle = location.photoTitle
   const photoUrl = location.photoUrl;
   const photoThumbUrl = location.photoThumbUrl;
   const description = location.description
   const latitude = location.latitude
   const longitude = location.longitude

const mouseOver = () => {
  document.getElementById(`map-pin-${location.id}`).setAttribute("highlighted", true)
}
const mouseOut = () => {
  document.getElementById(`map-pin-${location.id}`).removeAttribute("highlighted")
}

// console.log("location photothumb     ", location.photoThumbUrl, location.photoUrl)


return (
  <>
    {/* <div key={location.id} className="ImageThumb__photo" onMouseOver={mouseOver} onMouseOut={mouseOut}> */}
    <div
      id={`photothumb-${location.id}`}
      key={location.id}
      className="ImageThumb__photo pointer"
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
    >
      <div className="ImageContainer">
        {location.photoThumbUrl !== null ? (
          <img
            src={location.photoThumbUrl}
            alt="Thumbnail1"
            onClick={handleClickOpen}
            id={`photothumb-${location.id}`}
            className="thumb-image"
          />
        ) : (
          <img
            src={location.photoUrl}
            alt="Thumbnail 2"
            onClick={handleClickOpen}
            id={`photothumb-${modalLocation.id}`}
            className="thumb-image"
          />
        )}
      </div>
    </div>
    <div style={{display:"flex", backgroundColor:"red", justifyContent:"center"}}>
      <Dialog
        // fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-text"
        >
        <>
<div style={{display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems: "flex-start"}}>
        <div style={{position:"absolute", top:"0%", right:"0%"}}>
        <IconButton onClick={handleClose} color="secondary">
          {/* <CloseIcon /> */}
          <CancelSharpIcon />
        </IconButton>
        </div>
      
       <img src={modalLocation.photoUrl} style={photoStyle} className="modal-image" />
        {/* <Box width={10} height="5%" style={{ backgroundSize: "contain" }}>
          <img src={modalLocation.photoUrl} className="modal-image" />
        </Box> */}
        <div className="photo-title-text">{modalLocation.photoTitle}</div>
        <div className="photo-description-text">
          {modalLocation.description}
        </div>
        <div className="photo-date-text">{stringDate}</div>
        {/* <DialogContentText>
                Date: 
              </DialogContentText> */}
        {/* <DialogContentText > 
                    Location: {modalLocation.city}, {modalLocation.state}
                  </DialogContentText> */}

           <div>
        <EditButton />
             </div>       
                  
                  
                  </div>
                  {/* <span>Hello</span> */}
                  </>
      </Dialog>
    
                  </div>
  </>
);



}
export default ViewSinglePhoto