import React, {useState} from "react";
import {searchByLocation, changeSearchDateRange} from "../../store/photo"
import {useDispatch, useSelector} from "react-redux"
import search from "./search.svg"
import  AddPhotoModal  from "../AddPhotoModal";





const SearchBar = () => {
    const radius = useSelector((state) => state.photo.searchLocation[2])
    const dispatch = useDispatch()
    const [location, setLocation] = useState("")
    const [dateRangeStart, setDateRangeStart] = useState("")
    const [dateRangeEnd, setDateRangeEnd] = useState("")
    
    const submitForm = async(e) => {
        e.preventDefault()
        const payload = {location, radius, searchDateRange: [dateRangeStart, dateRangeEnd] }
        setLocation("")
        setDateRangeStart("")
        setDateRangeEnd("")
        
        dispatch(searchByLocation(payload))
        
    }

    return (
        <div className="search-bar">
            <form onSubmit={submitForm}>
                
                <input className="search-bar" placeholder="Where?" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="date" className="search-bar" placeholder="Start Date" value={dateRangeStart} onChange={(e)=> setDateRangeStart(e.target.value)} />
                <input type="date" className="search-bar" placeholder="End Date" value={dateRangeEnd} onChange={(e)=> setDateRangeEnd(e.target.value)} />
                <button className="search-button"><img src={search} alt="search" className="search" /></button>
            </form>
            <div className="custom-search-button-container">
                <button className="add-photo-button">Add Photo</button>
            </div>
            <AddPhotoModal />
        </div>
    )





}
export default SearchBar