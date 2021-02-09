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
    const showInfoBox = (e) => {
        document.getElementById(`info-box-${id}`).removeAttribute('hidden')
        document.getElementById(`photothumb-${id}`).setAttribute('highlighted', true)
        console.log(e.target.id)
    }
    // const showInfoBox = () => console.log(document.getElementById(`info-box-${id}`))
    // const hideInfoBox = () => console.log("hide info box")
    const hideInfoBox = () => {
        document.getElementById(`info-box-${id}`).setAttribute("hidden", "")
        document.getElementById(`photothumb-${id}`).removeAttribute('highlighted')

    }
    // const pinClick = () => {
    //     const payload = {location: [lat, lng]}
    //     dispatch(updateSearchCoord(payload))
    // }
    
    return (
        <>
                
            <div id={`map-pin-${id}`} className="mapPin" onMouseOver={showInfoBox} onMouseOut={hideInfoBox} >
                
            </div>
            <div id={`info-box-${id}`} hidden >
                <img className="map-info-box" src={photoUrl} alt="noPhoto"></img>
            </div>
        </>
    )

}

export default MapPin;