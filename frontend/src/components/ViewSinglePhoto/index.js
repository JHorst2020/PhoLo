import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import EditButton from "./EditButton.js";
import { updateLocationModal, updateSearchCoord } from "../../store/photo";
import CancelSharpIcon from "@material-ui/icons/CancelSharp";

const photoStyle = {
  maxWidth: "50vw",
  maxHeight: "60vh",
  objectFit: "scale-down",
};

const ViewSinglePhoto = ({ location, isOpen = false }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(isOpen);
  const modalLocation = useSelector((state) => state.photo.locationModal);
  let stringDate = modalLocation.dateTime;
  if (modalLocation.dateTime) {
    stringDate = modalLocation.dateTime.slice(
      0,
      modalLocation.dateTime.indexOf("T")
    );
  }
  const handleClickOpen = () => {
    const payload = {
      id,
      photoTitle,
      user_id,
      description,
      dateTime,
      locationName,
      streetNumber,
      streetName,
      city,
      state,
      zipcode,
      photoUrl,
      photoThumbUrl,
      latitude,
      longitude,
    };
    dispatch(updateLocationModal(payload));
    setOpen(true);
    dispatch(
      updateSearchCoord({
        searchLocation: [location.latitude, location.longitude, 5],
      })
    );
  };

  const handleClose = () => {
    setOpen(false);
    mouseOut();
  };

  const id = location.id;
  const user_id = location.user_id;
  const locationName = location.locationName;
  const streetNumber = location.streetNumber;
  const streetName = location.streetName;
  const city = location.city;
  const state = location.state;
  const zipcode = location.zipcode;
  const dateTime = location.dateTime;
  const photoTitle = location.photoTitle;
  const photoUrl = location.photoUrl;
  const photoThumbUrl = location.photoThumbUrl;
  const description = location.description;
  const latitude = location.latitude;
  const longitude = location.longitude;

  const mouseOver = () => {
    document
      .getElementById(`map-pin-${location.id}`)
      .setAttribute("highlighted", true);
  };
  const mouseOut = () => {
    document
      .getElementById(`map-pin-${location.id}`)
      .removeAttribute("highlighted");
  };

  return (
    <>
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
      <div
        style={{
          display: "flex",
          backgroundColor: "red",
          justifyContent: "center",
        }}
      >
        <Dialog
          maxWidth={"lg"}
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-text"
        >
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div style={{ position: "absolute", top: "0%", right: "0%" }}>
                <IconButton onClick={handleClose} color="secondary">
                  <CancelSharpIcon />
                </IconButton>
              </div>

              <img
                src={modalLocation.photoUrl}
                style={photoStyle}
                className="modal-image"
                alt="selected location"
              />
              <div className="photo-title-text">{modalLocation.photoTitle}</div>
              <div className="photo-description-text">
                {modalLocation.description}
              </div>
              <div className="photo-date-text">{stringDate}</div>
              <div>
                <EditButton />
              </div>
            </div>
          </>
        </Dialog>
      </div>
    </>
  );
};
export default ViewSinglePhoto;
