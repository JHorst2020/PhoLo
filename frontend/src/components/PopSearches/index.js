import React from 'react';
import { searchByLocation} from "../../store/photo";
import {useDispatch, useSelector} from 'react-redux'
import Button from "@material-ui/core/Button";

export default function PopSearches(){
    const dispatch = useDispatch();
    const radius = useSelector((state) => state.photo.searchLocation[2]);
    const currLocation = useSelector((state)=> state.photo.searchLocation)
    
    const vintageLasVegas = async(e,location) =>{
        dispatch(
          searchByLocation({
            location,
            radius,
            searchDateRange: e,
          })
        );
    }
    const updateSearchRange = async(startDate,endDate) => {
        dispatch(
            searchByLocation({
                location:`${currLocation[0]}, ${currLocation[1]}`,
                radius: currLocation[2], 
                searchDateRange: [startDate, endDate]
            }))
    }
return (
    <div className="popularSearches" style={{display:"flex", flexDirection:"column", backgroundColor:"#f8f8ff", width:"100vw"}}>
        <h2>Popular Searches</h2>
    <div style={{display:"flex"}}>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Date Ranges</h3>
            <Button color="primary" onClick={() => updateSearchRange("1990-01-01", "2021-12-31")}>1990 - 2021</Button>
            <Button color="primary" onClick={() => updateSearchRange("1940-01-01", "1980-12-31")}>1940 - 1980</Button>
        </div>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Las Vegas</h3>
            <Button color="primary" onClick={() => vintageLasVegas(["1940-01-01", "1975-01-01"],"Las Vegas")}>1940 - 1975</Button>
            <Button color="primary" onClick={() => vintageLasVegas(["1975-01-01", "2020-12-31"],"Las Vegas")}>1975 - 2020</Button>
        </div>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Disneyland</h3>
            <Button color="primary" onClick={() => vintageLasVegas(["1955-01-01", "1970-01-01"],"Disneyland")}>1955 - 1970</Button>
            <Button color="primary" onClick={() => vintageLasVegas(["2019-01-01", "2021-01-01"],"Disneyland")}>2019 - 2021</Button>
        </div>
    </div>
    </div>
)

    
}