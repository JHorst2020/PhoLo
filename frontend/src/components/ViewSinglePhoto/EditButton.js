import React, { useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { updatePhoto, deletePhoto} from "../../store/photo";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import UpdateIcon from '@material-ui/icons/Update';

export default function EditButton() {
  // let stringDate = location.dateTime.toString()
  const currUser = useSelector((state) => state.session.user);
  // const locations = useSelector((state) => state.photo.locations);
  // const singlelocation = useSelector((state) => state.photo.locations[locIndex])
  const modalLocation= useSelector((state) => state.photo.locationModal)
  let stringDate = modalLocation.dateTime;
  // let locIndex = locations.findIndex((obj) => obj.id === modalLocation.id);
  if (modalLocation.dateTime.indexOf("T") > 0) {
    stringDate = modalLocation.dateTime.slice(0, modalLocation.dateTime.indexOf("T"));
  }
  const id = modalLocation.id;
  const user_id = modalLocation.user_id;
  const locationName = modalLocation.locationName;
  const streetNumber = modalLocation.streetNumber;
  const streetName = modalLocation.streetName;
  const city = modalLocation.city;
  const state = modalLocation.state;
  const zipcode = modalLocation.zipcode;
  const photoUrl = modalLocation.photoUrl;
  const photoThumbUrl = modalLocation.photoThumbUrl;
  const [updateDate, setDate] = useState(stringDate);
  const [open, setOpen] = useState(false);
  const [updateLat, setLat] = useState(modalLocation.latitude);
  const [updateLng, setLng] = useState(modalLocation.longitude);
  const [updateLoc, setLoc] = useState(locationName)
  const [updateTitle, setTitle] = useState(modalLocation.photoTitle);
  const [updateDescription, setDescription] = useState(
    modalLocation.description
  );
  // const [updateDate, setDate] = useState(location.dateTime)
  // console.log(currUser)
  const dispatch = useDispatch();
// console.log(updateLat, "       is update lat")
// console.log("This is the location:     ", location)
  if (currUser !== undefined && currUser!== null) {
    if (currUser.id && currUser.id === modalLocation.user_id) {
      const handleClickOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
          id,
          user_id,
          locationName,
          streetNumber,
          streetName,
          city,
          state,
          zipcode,
          updateDate,
          updateLat,
          updateLng,
          updateTitle,
          updateDescription,
          photoUrl,
          photoThumbUrl,
          updateLoc
        };
        // console.log("updateTitle in editButton.js:     ", updateTitle)
        setOpen(false);
        dispatch(updatePhoto(payload));
        
    };
    const handleDelete = (e) => {
        e.preventDefault();
        
        const payload = {id, searchLocation: [updateLat, updateLng, 3]}
        
        dispatch(deletePhoto(payload))
      }

      return (
        <div>
          <Button onClick={handleClickOpen} variant="contained" color="primary" startIcon={<UpdateIcon />} style={{ "margin": "10px" }}>
            Update
          </Button>
          <Dialog
          className="helloworld"
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-text"
          >
            <DialogTitle id="form-dialog-title">
              Update Photo Information
            </DialogTitle>
            <DialogContent>
              <TextField
                margin="dense"
                id="photoTitle"
                label="Title"
                fullWidth
                variant="outlined"
                value={updateTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                fullWidth
                multiline
                rowsMax={6}
                variant="outlined"
                value={updateDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                margin="dense"
                id="location"
                label="Location"
                fullWidth
                variant="outlined"
                value={updateLoc}
                onChange={(e) => setLoc(e.target.value)}
              />

              <TextField
                margin="dense"
                id="dateTime"
                fullWidth
                variant="outlined"
                type="date"
                value={updateDate}
                onChange={(e) => setDate(e.target.value)}
              />
            </DialogContent>
            

            <DialogActions>
              
              <Button onClick={handleSubmit} variant="outlined">
                Update
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            style={{ "margin": "10px" }}
            type="submit"
            startIcon={<DeleteSharpIcon />}
            >
              Delete
          </Button>
        </div>
      );
    }
  }
  return <></>;
}
