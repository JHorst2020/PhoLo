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
import { updateLocationModal } from "../../store/photo";


const photoStyle = {
    maxWidth: "1200px"
}

const ViewSinglePhoto = ({location}) => {
  const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
      const locations = useSelector((state) => state.photo.locations);
      let locIndex = locations.findIndex((obj) => obj.id === location.id);
    const singlelocation = useSelector((state) => state.photo.locations[locIndex])

    const modalLocation = useSelector((state) => state.photo.locationModal)
  console.log("is this the correct location?:     ",singlelocation)

     const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);
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
   console.log("this is the locationtitle:    ",photoTitle)
   useEffect(() => {
    const payload = {id, photoTitle, user_id, description, dateTime, locationName, streetNumber, streetName,city, state, zipcode, photoUrl, photoThumbUrl}
    dispatch(updateLocationModal(payload))
   },[open])
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
            <Button onClick={handleClose}>{modalLocation.id}</Button>
            <img src={modalLocation.photoUrl} style={photoStyle}/>
            <h3>{modalLocation.photoTitle}</h3>
            {modalLocation.description}
            <DialogContentText>
                Date: {modalLocation.dateTime}
            </DialogContentText>
                <DialogContentText > 
                    Location: {modalLocation.city}, {modalLocation.state}
                    </DialogContentText>
                    <EditButton location={location} />
        </Dialog>
    </div>
  </>
);



}
export default ViewSinglePhoto