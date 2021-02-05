import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import "./MapPin.css"
import {updateSearchCoord} from "../../store/photo"


// const PinContainer = styled.div`
//   background-color: #3f51b5;
//   width: 15px;
//   height: 15px;
//   border-radius: 100%;
//   border: 3px solid #fff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: #fff;
// `;


const MapPin = ({id, photoUrl, lat, lng}) => {
    const dispatch = useDispatch()
    const showInfoBox = () => document.getElementById(`info-box-${id}`).removeAttribute('hidden')
    // const showInfoBox = () => console.log(document.getElementById(`info-box-${id}`))
    // const hideInfoBox = () => console.log("hide info box")
    const hideInfoBox = () => document.getElementById(`info-box-${id}`).setAttribute("hidden", "")
    // const pinClick = () => {
    //     const payload = {location: [lat, lng]}
    //     dispatch(updateSearchCoord(payload))
    // }
    
    return (
        <>
                
            <div className="mapPin" onMouseOver={showInfoBox} onMouseOut={hideInfoBox} >
                
            </div>
            <div id={`info-box-${id}`} hidden >
                <img className="map-info-box" src={photoUrl} alt="noPhoto"></img>
            </div>
        </>
    )

}

export default MapPin;