import { fetch as fetchy } from "../util/csrf.js"; //I ALWAYS FORGET ABOUT THIS
export const LOAD_NEARBY_PHOTOS = './photo/LOAD_NEARBY_PHOTOS'
export const LOAD_SEARCH_INFO = './photo/LOAD_SEARCH_INFO'
export const EXTRACT_EXIF_DATA = './photo/EXTRACT_EXIF_DATA'

const loadNearbyPhotos = (locations) => ({
    type: LOAD_NEARBY_PHOTOS,
    locations
})

const loadSearchInfo = (locations, searchDateRange, searchLocation) => ({
  type: LOAD_SEARCH_INFO,
  locations,
  searchDateRange,
  searchLocation
});

const photoExif = (uploadedPhotoExif) => ({
    type: EXTRACT_EXIF_DATA,
    uploadedPhotoExif
});


export const getNearbyPhotos = (payload) => async (dispatch) => {
    const {searchLat, searchLng, radius, dateRangeStart, dateRangeEnd} = payload;
    const response = await fetch(`/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}`);

    if (response.ok) {
        const locations = await response.json();
        // const locations = await response;
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
        const searchLocation = [searchLat, searchLng, radius]
        dispatch(loadSearchInfo(locations, searchDateRange, searchLocation))
    }
}

// export const changeSearchDateRange = (payload) => async (dispatch) => {
//     const {searchDateRange} = payload;
//     if (searchDateRange) {
//         dispatch(loadSearchInfo(searchDateRange))
//     }
// }

export const addNewPhoto = (photo) => async (dispatch) => {
    const {latitude, longitude, dateTime, image, user_id} = photo;
    const formData = new FormData();
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)
    formData.append("dateTime", dateTime)
    formData.append("image", image)
    formData.append("user_id", user_id)

    const res = await fetchy("/api/photo/add", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
    console.log(res)
    // dispatch(photoExif({}))
}

export const photoExifData = (exifDataPayload) => async (dispatch) => {
// export const photoExifData = () => async (dispatch) => {
    const {latitude, longitude, photoDate, image} = exifDataPayload
    console.log(exifDataPayload)
    const uploadedPhotoExif = {latitude, longitude, photoDate, image}
    // dispatch(photoExif(uploadedPhotoExif))
    console.log("I'M AT THE PHOTOEXIFDATA ACTION")
    dispatch(photoExif(uploadedPhotoExif))
}



const initialState = {
    locations: [],
    searchLocation: [36.1699, -115.1398, 5],
    searchDateRange:["1950-01-01", "2029-01-01"],
    uploadedPhotoExif: null,
}

const photoReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
      case EXTRACT_EXIF_DATA: {
        return {
          ...state,
            uploadedPhotoExif: action.uploadedPhotoExif,
        };
      }
      case LOAD_NEARBY_PHOTOS: {
        return {
          ...state,
          locations: action.locations,
        };
      }
      case LOAD_SEARCH_INFO: {
        return {
          ...state,
          searchDateRange: action.searchDateRange,
          locations: action.locations,
          searchLocation: action.searchLocation,
        };
      }

      default:
        return state;
    }
}

export default photoReducer