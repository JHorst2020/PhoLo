import React from 'react';
import { searchByLocation} from "../../store/photo";
import {useDispatch, useSelector} from 'react-redux'
import Button from "@material-ui/core/Button";




export default function PopSearches(){
    const dispatch = useDispatch();
    const radius = useSelector((state) => state.photo.searchLocation[2]);
    const currLocation = useSelector((state)=> state.photo.searchLocation)
    
    const vintageLasVegas = async(e,location) =>{
        // e.preventDefault();
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
    <div style={{display:"flex", flexDirection:"column", backgroundColor:"#f8f8ff", width:"100vw"}}>
        <h2>Popular Searches</h2>
    <div style={{display:"flex"}}>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Date Ranges</h3>
            <Button color="primary" onClick={() => updateSearchRange("1990-01-01", "2021-12-31")}>1990 - 2021</Button>
            <Button color="primary" onClick={() => updateSearchRange("1940-01-01", "1980-12-31")}>1940 - 1980</Button>
        </div>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Las Vegas</h3>
            <Button color="primary" onClick={() => vintageLasVegas(["1940-01-01", "1975-01-01"],"Las Vegas")}>1940 to 1975</Button>
            <Button color="primary" onClick={() => vintageLasVegas(["1975-01-01", "2020-12-31"],"Las Vegas")}>1975 to 2020</Button>
        </div>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Tahrir Square</h3>
            <Button color="primary" onClick={() => vintageLasVegas(["1965-01-01", "1975-01-01"],"Tahrir Square, Baghdad, Iraq")}>1965 to 1975</Button>
            <Button color="primary" onClick={() => vintageLasVegas(["2019-01-01", "2021-01-01"],"Tahrir Square, Baghdad, Iraq")}>2019 to 2021</Button>
        </div>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Disneyland</h3>
            <Button color="primary" onClick={() => vintageLasVegas(["1955-01-01", "1970-01-01"],"Disneyland")}>1955 to 1970</Button>
            <Button color="primary" onClick={() => vintageLasVegas(["2019-01-01", "2021-01-01"],"Disneyland")}>2019 to 2021</Button>
        </div>
        <div style={{display:"flex", flexDirection:"column", marginLeft:"20px"}}>
            <h3>Fiji</h3>
            <Button color="primary" onClick={() => vintageLasVegas(["2019-08-01", "2019-08-30"],"Denarau Island South, Denarau Island, Fiji")}>Aug 2019</Button>
            {/* <Button color="primary" onClick={() => vintageLasVegas(["1999-01-01", "2070-01-01"],"amsterdam")}>1949 to 1970</Button> */}
        </div>
        
    </div>
    </div>
)

    
}