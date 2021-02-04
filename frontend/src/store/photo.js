export const LOAD_NEARBY_PHOTOS = './photo/LOAD_NEARBY_PHOTOS'
export const LOAD_SEARCH_INFO = './photo/LOAD_SEARCH_INFO'

const loadNearbyPhotos = (locations) => ({
    type: LOAD_NEARBY_PHOTOS,
    locations
})

const loadSearchInfo = (locations, searchDateRange) => ({
  type: LOAD_SEARCH_INFO,
  locations,
  searchDateRange
});


export const getNearbyPhotos = (payload) => async (dispatch) => {
    const {searchLat, searchLng, radius, dateRangeStart, dateRangeEnd} = payload;
    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadNearbyPhotos(locations))
    }
}

export const searchByLocation = (payload) => async (dispatch) => {
    const {location, radius, searchDateRange} = payload;
    let spaceRemover = location.split(" ").join("+")
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${spaceRemover}&key=${process.env.REACT_APP_GOOGLE_API}`);
    const googleResponse = await res.json()
    let searchLat = await googleResponse.results[0].geometry.location.lat;
    let searchLng = await googleResponse.results[0].geometry.location.lng;
    let dateRangeStart = searchDateRange[0]
    let dateRangeEnd = searchDateRange[1]
    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}`);

    if (response.ok) {
        const locations = await response.json();
        dispatch(loadSearchInfo(locations, searchDateRange))
    }
}

export const changeSearchDateRange = (payload) => async (dispatch) => {
    const {searchDateRange} = payload;
    if (searchDateRange) {
        dispatch(loadSearchInfo(searchDateRange))
    }
}



const initialState = {
    locations: [],
    searchLocation: [87, -84, 5],
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
        case LOAD_SEARCH_INFO: {
            return {
                ...state,
                searchDateRange: action.searchDateRange,
                locations: action.locations
            }
        }
        default: 
        return state
    }
}

export default photoReducer