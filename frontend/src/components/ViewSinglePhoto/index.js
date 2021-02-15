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
import { updateLocationModal, updateSearchCoord } from "../../store/photo";


const photoStyle = {
    maxWidth: "1200px"
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
    <div id={`photothumb-${location.id}`} key={location.id} className="ImageThumb__photo pointer" onMouseOver={mouseOver} onMouseOut={mouseOut} >
    <div className="ImageContainer">
        {location.photoThumbUrl !== null ? <img src={location.photoThumbUrl} alt="Thumbnail1" onClick={handleClickOpen} id={`photothumb-${location.id}`} className="thumb-image"/> : <img src={location.photoUrl} alt="Thumbnail 2" onClick={handleClickOpen} id={`photothumb-${modalLocation.id}`}className="thumb-image"/>}
    </div>
    </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-text">
            {/* <Button onClick={handleClose}>Modal: {modalLocation.id}</Button> */}
            <div className="modal-photo-container">
            <img src={modalLocation.photoUrl} style={photoStyle} className="modal-image" />
            </div>
            <div className="photo-title-text">{modalLocation.photoTitle}</div>
            <div className="photo-description-text">{modalLocation.description}</div>
            <div className="photo-date-text">{stringDate}</div>
            {/* <DialogContentText>
                Date: 
            </DialogContentText> */}
                {/* <DialogContentText > 
                    Location: {modalLocation.city}, {modalLocation.state}
                    </DialogContentText> */}
                    <EditButton />
        </Dialog>
    {/* </div> */}
  </>
);



}
export default ViewSinglePhoto