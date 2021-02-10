import React, {useState} from "react";
import { searchByLocation, photoExifData } from "../../store/photo";
import {useDispatch, useSelector} from "react-redux"
import search from "./search.svg"
import  AddPhotoModal from "../AddPhotoModal";
// import  ImageMeta from "../AddPhotoModal/ExifExtract";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";






const SearchBar = () => {
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
        //todo NEED TO DELETE THIS
        // dispatch(photoExifData())
        
        
    }

    return (
        <div className="search-bar">
            <form onSubmit={submitForm}>
                
                <TextField margin="dense" variant="outlined" className="search-bar" placeholder="Where?" value={location} onChange={(e) => setLocation(e.target.value)} />
                <TextField margin="dense" variant="outlined" type="date" className="search-bar" placeholder="Start Date" value={dateRangeStart} onChange={(e)=> setDateRangeStart(e.target.value)} />
                <TextField margin="dense" variant="outlined" type="date" className="search-bar" placeholder="End Date" value={dateRangeEnd} onChange={(e)=> setDateRangeEnd(e.target.value)} />
                <Button variant="outlined" color="primary"className="search-button" type="submit"><img src={search} alt="search" className="search" /></Button>
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