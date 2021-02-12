import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { searchByLocation, photoExifData } from "../../store/photo";
import {useDispatch, useSelector} from "react-redux"

import  AddPhotoModal from "../AddPhotoModal";
// import  ImageMeta from "../AddPhotoModal/ExifExtract";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./SearchBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2e9cca",
    variant: "contained",
  },
}));



const SearchBar = () => {
  const classes = useStyles();
    const radius = useSelector((state) => state.photo.searchLocation[2])
    const dispatch = useDispatch()
    const [location, setLocation] = useState("")
    const [dateRangeStart, setDateRangeStart] = useState("1990-05-25")
    const [dateRangeEnd, setDateRangeEnd] = useState("2021-02-11")
    const mapBounds = useSelector((state) => state.map.mapBounds);
    const mapCenter = useSelector((state) => state.map.mapFocus);
    const user = useSelector((state) => state.session.user)
 

    const submitForm = async(e) => {
        e.preventDefault()
        const payload = {location, radius, searchDateRange: [dateRangeStart, dateRangeEnd],latBounds: mapBounds[0], lngBounds: mapBounds[1] }
        setLocation("")
        setDateRangeStart("")
        setDateRangeEnd("")
        
        dispatch(searchByLocation(payload))
 
        
        
    }

    return (
        <div className="search-bar">
            <form onSubmit={submitForm}>
                
                <TextField margin="dense" variant="filled" label="Where?" className="search-bar-text-field" value={location} onChange={(e) => setLocation(e.target.value)} boxShadow={0}/>
                <TextField margin="dense" variant="filled" type="date" className="search-bar-text-field" label="Start Date" value={dateRangeStart} onChange={(e)=> setDateRangeStart(e.target.value)} />
                <TextField margin="dense" variant="filled" type="date" className="search-bar-text-field" label="End Date" value={dateRangeEnd} onChange={(e)=> setDateRangeEnd(e.target.value)} />
                    <Button variant="contained" color="primary" classes={{ root: classes.root }} type="submit" size="large"><i class="fas fa-search"></i></Button>
                
            </form>
            <div>
                {/* <button>Choose File<ImageMeta /></button> */}
                {/* <ImageMeta /> */}
            </div>
            {/* <div className="custom-search-button-container">
            {user ? <AddPhotoModal /> : ""}
            </div> */}
        </div>
    )





}
export default SearchBar