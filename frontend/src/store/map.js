export const MAP_BOUNDS = './photo/MAP_BOUNDS'

const loadMapBounds = (mapBounds, mapFocus) => ({
    type: MAP_BOUNDS,
    mapBounds, 
    mapFocus
})

export const updateMapBounds = (payload) => async(dispatch)=>{
    const {mapBounds, mapFocus} = payload
    dispatch(loadMapBounds(mapBounds, mapFocus))
}


const initialState = {
    mapBounds: [],
    mapFocus: {}
}

const mapReducer = (state = initialState, action) => {
    console.log(action)
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