export const MAP_BOUNDS = './map/MAP_BOUNDS'
export const PIN_CLICK = "./map/pinClick"

const loadMapBounds = (mapBounds, mapFocus) => ({
    type: MAP_BOUNDS,
    mapBounds, 
    mapFocus
})

const pinId = (id) => ({
    type: PIN_CLICK,
    id
})

export const updateMapBounds = (payload) => async(dispatch)=>{
    const {mapBounds, mapFocus} = payload
    dispatch(loadMapBounds(mapBounds, mapFocus))
}
export const clickPinId = (id) =>async(dispatch) => {
    dispatch(pinId(id))
}


const initialState = {
    mapBounds: [],
    mapFocus: {},
    id: 0
}

const mapReducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case MAP_BOUNDS: {
            return {
                ...state,
                mapBounds: action.mapBounds,
                mapFocus: action.mapFocus
            }
        }
        default: 
            return state;
    }


}

export default mapReducer