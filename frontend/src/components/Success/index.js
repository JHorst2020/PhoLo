import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SuccessModal(boolean) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(boolean.boolean);

const handleClose = () => {
    setOpen(false)
}

  useEffect(()=>{
      setOpen(boolean.boolean)
    setTimeout(()=>{
        setOpen(false)
    },500)
  },[boolean])

  return (
    <div >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
        
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h4 style={{color:"green"}} id="transition-modal-title">SUCCESS!</h4>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
