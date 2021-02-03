export const LOAD_NEARBY_PHOTOS = './photo/LOAD_NEARBY_PHOTOS'

const loadNearbyPhotos = (locations) => ({
    type: LOAD_NEARBY_PHOTOS,
    locations
})


export const getNearbyPhotos = (payload) => async (dispatch) => {
    const {searchLat, searchLng, radius, dateRangeStart, dateRangeEnd} = payload;
    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadNearbyPhotos(locations))
    }
}

export const searchLocation = (payload) => async (dispatch) => {
    const {searchLat, searchLng, dateRangeStart, dateRangeEnd} = payload
    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${dateRangeStart}/${dateRangeEnd}`);
    if (response.ok){
        const locations = await response.json();
        dispatch(loadNearbyPhotos(locations))
    }
}

const initialState = {
    locations: [],
    searchLocation: [87, -84, 2000],
    searchDateRange:[]
}

const photoReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_NEARBY_PHOTOS: {
            return {
                ...state, 
                locations: action.locations
            }
        }
        default: 
        return state
    }
}

export default photoReducer