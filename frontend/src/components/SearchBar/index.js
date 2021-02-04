import React, {useState} from "react";
import {searchByLocation, changeSearchDateRange} from "../../store/photo"
import {useDispatch} from "react-redux"
import search from "./search.svg"




const SearchBar = () => {
    const dispatch = useDispatch()
    const [location, setLocation] = useState("")
    const [dateRangeStart, setDateRangeStart] = useState("")
    const [dateRangeEnd, setDateRangeEnd] = useState("")
    
    const submitForm = async(e) => {
        e.preventDefault()

    }

    return (
        <div className="search-bar">
            <form onSubmit={submitForm}>
                
                <input className="search-bar" placeholder="Where?" value={location} onChange={(e) => setLocation(e.target.value)} />
                <input type="date" className="search-bar" placeHolder="Start Date" value={dateRangeStart} onChange={(e)=> setDateRangeStart(e.target.value)} />
                <input type="date" className="search-bar" placeHolder="End Date" value={dateRangeEnd} onChange={(e)=> setDateRangeEnd(e.target.value)} />
                <button className="search-button"><img src={search} alt="search" className="search" /></button>
            </form>
        </div>
    )





}
export default SearchBar