export const LOAD_NEARBY_PHOTOS = './photo/LOAD_NEARBY_PHOTOS'
export const LOAD_SEARCH_DATES = './photo/LOAD_SEARCH_DATES'

const loadNearbyPhotos = (locations) => ({
    type: LOAD_NEARBY_PHOTOS,
    locations
})

const loadSearchDates = (searchDateRange) => ({
    type: LOAD_SEARCH_DATES,
    searchDateRange
})


export const getNearbyPhotos = (payload) => async (dispatch) => {
    const {searchLat, searchLng, radius, dateRangeStart, dateRangeEnd} = payload;
    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadNearbyPhotos(locations))
    }
}

export const searchByLocation = (payload) => async (dispatch) => {
    const {address, radius, dateRangeStart, dateRangeEnd} = payload;
    let spaceRemover = address.split(" ").join("+")
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${spaceRemover}&key=${process.env.REACT_APP_GOOGLE_API}`);
    const googleResponse = await res.json()
    let searchLat = await googleResponse.results[0].geometry.location.lat;
    let searchLng = await googleResponse.results[0].geometry.location.lng;

    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadNearbyPhotos(locations))
    }
}

export const changeSearchDateRange = (payload) => async (dispatch) => {
    const {dateRangeStart, dateRangeEnd} = payload;
    if (dateRangeStart && dateRangeEnd) {
        dispatch(loadSearchDates(payload))
    }
}



const initialState = {
    locations: [],
    searchLocation: [87, -84, 2000],
    searchDateRange:["1950-01-01", "2029-01-01"]
}

const photoReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_NEARBY_PHOTOS: {
            return {
                ...state, 
                locations: action.locations
            }
        }
        case LOAD_SEARCH_DATES: {
            return {
                ...state,
                searchDateRange: action.searchDateRange
            }
        }
        default: 
        return state
    }
}

export default photoReducer