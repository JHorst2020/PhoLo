import React, {useState} from "react";
import EXIF from "exif-js";
import {useDispatch} from "react-redux"
import { photoExifData, updateImagePreview } from "../../store/photo";

function ImageMeta() {
    const dispatch = useDispatch();
    const [url, setUrl] = useState("")
  const handleChange = ({
    target: {
      files: [file],
    },
  }) => {

    if (file && file.name) {
      EXIF.getData(file, function () {

        var exifData = EXIF.pretty(this);
        if (exifData) {
          let spaceIndex = EXIF.getTag(this, "DateTimeOriginal").indexOf(" ")
          let photoDate = EXIF.getTag(this, "DateTimeOriginal").slice(0, spaceIndex).split(":").join("-")
          let latRef = EXIF.getTag(this, "GPSLatitudeRef");
          let lngRef = EXIF.getTag(this, "GPSLongitudeRef");
          if (latRef === "N"){
              latRef = 1
          } else {
              latRef = -1
          }
          if (lngRef === "W") {
            lngRef = -1;
          } else {
            lngRef = 1;
          }
          let latHMS = EXIF.getTag(this, "GPSLatitude")
          let latitude = latRef*(latHMS[0].numerator + ((latHMS[1].numerator/latHMS[1].denominator)/60)+((latHMS[2].numerator/latHMS[2].denominator)/3600));
          let lngHMS = EXIF.getTag(this, "GPSLongitude");
          let longitude = lngRef*(lngHMS[0].numerator + ((lngHMS[1].numerator/lngHMS[1].denominator)/60)+((lngHMS[2].numerator/lngHMS[2].denominator)/3600))
          let image = file
          const payload = {latitude, longitude, photoDate, image}
          dispatch(photoExifData(payload))
          // console.log(url)
          
            // dispatch(photoExifData({latitude: 39, longitude: -119, photoDate:"2021-01-01"}))
          
        } else {
            console.log("No EXIF data found in image '" + file.name + "'.");
        }
      });
    }
  }

  return (
    <>
      <input
        type="file"
        id="file"
        accept=".jpg, .png, .heif, .heic"
        onChange={handleChange}
        hidden
      />
    
    </>
  );
}

export default ImageMeta;
