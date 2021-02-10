import { fetch as fetchy } from "../util/csrf.js"; //Aliased otherwise it screws up the fetch for google
export const LOAD_NEARBY_PHOTOS = "./photo/LOAD_NEARBY_PHOTOS";
export const LOAD_SEARCH_INFO = "./photo/LOAD_SEARCH_INFO";
export const EXTRACT_EXIF_DATA = "./photo/EXTRACT_EXIF_DATA";
export const UPDATE_SEARCH_COORDS = "./photo/UPDATE_SEARCH_COORDS";
export const UPDATE_SINGLE_PHOTO = "./photo/UPDATE_SINGLE_PHOTO";
const updateSinglePhoto = (information) => ({
  type: UPDATE_SINGLE_PHOTO,
  information
});
const loadNearbyPhotos = (locations) => ({
  type: LOAD_NEARBY_PHOTOS,
  locations,
});

const loadSearchInfo = (locations, searchDateRange, searchLocation, searchLocationName) => ({
  type: LOAD_SEARCH_INFO,
  locations,
  searchDateRange,
  searchLocation,
  searchLocationName
});

const photoExif = (uploadedPhotoExif, searchLocation) => ({
  type: EXTRACT_EXIF_DATA,
  uploadedPhotoExif,
  searchLocation
});

const updateCoords = (searchLocation) => ({
  type: UPDATE_SEARCH_COORDS,
  searchLocation
})
export const deletePhoto = (payload) => async(dispatch) => {
  const {id, searchLocation} = payload
  const data = await fetchy(`/api/photo/${id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json'}
  })
  const deleted = await data
  if (deleted.ok){
    dispatch(updateCoords(searchLocation))
  } else {
    console.log("Error with deletion")
  }
}

export const getMyPhotos = (userId) => async(dispatch)=> {
  const res = await fetch(`/api/photo/myPhoto/${userId}`)
  if (res.ok){
    const locations = await res.json()
    dispatch(loadNearbyPhotos(locations))
  }
}

export const updateImagePreview = (payload) => async(dispatch) => {
  const {url} = payload
  dispatch(photoExif(url))
}

export const getNearbyPhotos = (payload) => async (dispatch) => {
  const {
    searchLat,
    searchLng,
    radius,
    dateRangeStart,
    dateRangeEnd,
    latBounds,
    lngBounds
  } = payload;
  const response = await fetch(
    `/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}/${latBounds}/${lngBounds}`
  );

  if (response.ok) {
    const locations = await response.json();
    // const locations = await response;
    dispatch(loadNearbyPhotos(locations));
  }
};

export const updateSearchCoord = (payload) => async(dispatch) => {
  const {searchLocation} = payload;
  dispatch(updateCoords(searchLocation))
}

export const searchByLocation = (payload) => async (dispatch) => {
  const { location, radius, searchDateRange, latBounds, lngBounds } = payload;
  let spaceRemover = location.split(" ").join("+");
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${spaceRemover}&key=${process.env.REACT_APP_GOOGLE_API}`
  );
  const googleResponse = await res.json();
  console.log("this is the google Response:       ",googleResponse)
  let searchLat = await googleResponse.results[0].geometry.location.lat;
  let searchLng = await googleResponse.results[0].geometry.location.lng;
  let searchLocationName = await googleResponse.results[0].formatted_address
  let dateRangeStart = searchDateRange[0];
  let dateRangeEnd = searchDateRange[1];
  const response = await fetch(
    `/api/photo/${searchLat}/${searchLng}/${radius}/${dateRangeStart}/${dateRangeEnd}/${latBounds}/${lngBounds}`
  );

  if (response.ok) {
    const locations = await response.json();
    const searchLocation = [searchLat, searchLng, radius];
    dispatch(loadSearchInfo(locations, searchDateRange, searchLocation, searchLocationName));
  }
};

// export const mapStatusChange = (payload) => async (dispatch) => {
//   const {}
// }

export const addNewPhoto = (photo) => async (dispatch) => {
  const { latitude, longitude, dateTime, image, user_id, currentLocations } = photo;
  const formData = new FormData();
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("dateTime", dateTime);
  formData.append("image", image);
  formData.append("user_id", user_id);

  const res = await fetchy("/api/photo/add", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
};
export const updatePhoto = (payload) => async(dispatch) => {
  // const{id, user_id, locationName, streetNumber, streetName, city, state, zipcode, updateDate, updateLat, updateLng, updateTitle, updateDescription, photoUrl, photoThumbUrl} = payload
  const res = await fetchy ("/api/photo/update", {
    method: "PUT",
    headers: {
      'Content-Type' : "application/json"
    },
    body: JSON.stringify(payload)
  })
  const {id, user_id, locationName, streetNumber, streetName, city, state, zipcode, updateDate, updateLat, updateLng, updateTitle, updateDescription, photoUrl, photoThumbUrl} = payload;
  const updatedInfo = {
    city: city,
    locationName: locationName,
    photoUrl: photoUrl,
    photoThumbUrl: photoThumbUrl,
    state: state,
    streetName: streetName,
    streetNumber: streetNumber,
    dateTime: updateDate,
    description: updateDescription,
    latitude: updateLat,
    longitude: updateLng,
    photoTitle: updateTitle,
    zipcode: zipcode,
    user_id: user_id,
  };
  dispatch(updateSinglePhoto(updatedInfo))
return res
}

export const updateLocationModal = (payload) => async(dispatch) => {
  dispatch(updateSinglePhoto(payload))
}

export const photoExifData = (exifDataPayload) => async (dispatch) => {
  const { latitude, longitude, photoDate, image, url } = exifDataPayload;
  console.log(exifDataPayload);
  const uploadedPhotoExif = { latitude, longitude, photoDate, image};
  const searchLocation = [latitude, longitude, 6]
  dispatch(photoExif(uploadedPhotoExif, searchLocation));
};

const initialState = {
  locations: [],
  locationModal: [],
  searchLocationName: ["Nearby Photos"],
  searchLocation: [36.1699, -115.1398, 3],
  searchDateRange: ["1950-01-01", "2029-01-01"],
  // uploadedPhotoExif: {latitude: "", longitude:"", photoDate: "", image:"", url:""},
  uploadedPhotoExif: {},
};

const photoReducer = (state = initialState, action) => {
  // console.log(action);
  switch (action.type) {
    case EXTRACT_EXIF_DATA: {
      return {
        ...state,
        uploadedPhotoExif: action.uploadedPhotoExif,
        searchLocation: action.searchLocation
      };
    }
    case LOAD_NEARBY_PHOTOS: {
      return {
        ...state,
        locations: action.locations,
      };
    }
    case UPDATE_SINGLE_PHOTO: {
      return {
        ...state,
        locationModal: action.information
      }
    }
    case LOAD_SEARCH_INFO: {
      return {
        ...state,
        searchDateRange: action.searchDateRange,
        locations: action.locations,
        searchLocation: action.searchLocation,
        searchLocationName: action.searchLocationName
      };
    }
    case UPDATE_SEARCH_COORDS: {
      return {
        ...state,
        searchLocation: action.searchLocation
      }
    }

    default:
      return state;
  }
};

export default photoReducer;
