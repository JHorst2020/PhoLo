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
    const [dateRangeStart, setDateRangeStart] = useState("")
    const [dateRangeEnd, setDateRangeEnd] = useState("")
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
        <div className="search-bar" >
            <form onSubmit={submitForm} style={{display:"flex", flexDirection:"row", justifyContent: "space-around"}}>
                
                <div>
                  <TextField margin="dense" variant="filled" label="Where?" className="search-bar-text-field" value={location} onChange={(e) => setLocation(e.target.value)} boxShadow={0} required/>
                </div>
                <div>
                  <TextField InputLabelProps={{ shrink: true }} margin="dense" variant="filled" type="date" className="search-bar-text-field" label="Start Date" value={dateRangeStart} onChange={(e)=> setDateRangeStart(e.target.value)} required/>
                </div>
                <div style={{fontSize:"small"}}>
                  <TextField InputLabelProps={{ shrink: true }}margin="dense" variant="filled" type="date" className="search-bar-text-field" label="End Date" value={dateRangeEnd} onChange={(e)=> setDateRangeEnd(e.target.value)} required/>
                </div>
                <div>
                  <Button variant="contained" color="primary" classes={{ root: classes.root }} type="submit" size="large"><i class="fas fa-search"></i></Button>
                </div>
                
            </form>
            
        </div>
    )





}
export default SearchBar