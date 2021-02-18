import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { searchByLocation, photoExifData } from "../../store/photo";
import {useDispatch, useSelector} from "react-redux"
import AppBar from '@material-ui/core/AppBar';
import  AddPhotoModal from "../AddPhotoModal";
// import  ImageMeta from "../AddPhotoModal/ExifExtract";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import ImageSearchIcon from "@material-ui/icons/ImageSearch";

import "./SearchBar.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2e9cca",
    variant: "contained",
    // width:"15px",
    height:"2em",
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
        
        
        dispatch(searchByLocation(payload))
 
        
        
    }

    return (
        <div className="search-bar" >
            <form onSubmit={submitForm} className="searchForm" style={{display:"flex", justifyContent: "space-around"}}>
                  
                <div style={{display:"flex", flexDirection:"row", justifyContent: "space-around"}}>

            
              
                  <TextField id="searchDateStart" InputLabelProps={{ shrink: true }} margin="dense" variant="filled" type="date" className="search-bar-text-field" label="Start Date" value={dateRangeStart} onChange={(e)=> setDateRangeStart(e.target.value)} required/>
                
             
                  <TextField id="searchDateEnd" InputLabelProps={{ shrink: true }}margin="dense" variant="filled" type="date" className="search-bar-text-field" label="End Date" value={dateRangeEnd} onChange={(e)=> setDateRangeEnd(e.target.value)} required/>         
                </div>
                

         

                  <TextField id="searchLocationInput" boxShadow={0} margin="dense" variant="filled" label="Where?" className="search-bar-text-field" value={location} onChange={(e) => setLocation(e.target.value)}  required />
                  

                  
               <div className="searchIcon" style={{alignSelf:"center", marginLeft:"15px", marginBottom:"5px"}}>
                  <Button variant="contained" color="primary" classes={{ root: classes.root }} type="submit" size="small"><i class="fas fa-search"></i></Button>
                 
                </div>
                
                
                
            </form>
            
        </div>
    )





}
export default SearchBar