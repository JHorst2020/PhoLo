import "./MapPin.css"


const MapPin = ({id, photoUrl}) => {
    const showInfoBox = (e) => {
        document.getElementById(`info-box-${id}`).removeAttribute('hidden')
        document.getElementById(`photothumb-${id}`).setAttribute('highlighted-blue', true)
        console.log(e.target.id)
    }
    const hideInfoBox = () => {
        document.getElementById(`info-box-${id}`).setAttribute("hidden", "")
        document.getElementById(`photothumb-${id}`).removeAttribute('highlighted-blue')
    }
    const pinClick = () => {
        document.getElementById(`photothumb-${id}`).scrollIntoView(false)
    }
    return (
      <>
        <div
          id={`map-pin-${id}`}
          className="mapPin"
          onMouseOver={showInfoBox}
          onMouseOut={hideInfoBox}
          onClick={pinClick}
        >
        </div>
        <div id={`info-box-${id}`} hidden>
          <img className="map-info-box" src={photoUrl} alt="noPhoto"></img>
        </div>
      </>
    );

}
export default MapPin;