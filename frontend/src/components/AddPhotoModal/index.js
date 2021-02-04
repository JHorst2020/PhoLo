import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const AddPhotoModal = () => {
  const [image, setImage] = useState(null)
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
          <Button onclick={handleClose} color="primary">Cancel</Button>
          <Button variant="contained" component="label" onclick={handleSubmit} color="primary">Upload Photo<input type="file" hidden /></Button>
        </DialogActions>
    </Dialog>
</>
  );
};

export default AddPhotoModal;
