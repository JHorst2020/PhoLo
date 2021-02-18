import React, {useState} from "react"
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    size: "large",
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));

const About = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
return (
  <>
    <Button
      classes={{ root: classes.root }}
      color="primary"
      variant="contained"
      onClick={handleClickOpen}
    >
      About
    </Button>
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-text"
      >
        <div
          style={{
            backgroundColor: "#29648A",
            color: "white",
            fontSize: "24px",
            padding: "10px",
          }}
        >
          {" "}
          What's in the sauce?{" "}
        </div>
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            margin: "15px",
          }}
        >
          <DialogContentText> Under the Hood</DialogContentText>
          <ul>
            <li>Google geocoding API</li>
            <li>Google reverse geocoding API</li>
            <li>Google Maps API</li>
            <li>Amazon S3 - AWS</li>
            <li>Telesign SMS Verify API</li>
            <li>React/Redux</li>
            <li>Express</li>
            <li>Sequelize</li>
            <li>BCrypt</li>
            <li>Material-UI (modals and buttons)</li>
            <li>Hosting via Heroku</li>
          </ul>
          <div style={{dispaly:"flex", flexDirection:"row", justifyContent:"center"}}>

          <a href="https://github.com/JHorst2020">
            <i class="fab fa-github" style={{ fontSize: "xx-large", margin:"15px" }}></i>
          </a>
          <a href="https://www.linkedin.com/in/jerzy-horst-027396181/">
            <i class="fab fa-linkedin-in" style={{ fontSize: "xx-large" }}></i>
          </a>
          </div>
        </div>
      </Dialog>
    </div>
  </>
);
}

export default About