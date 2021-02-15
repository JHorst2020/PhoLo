import React, { useEffect } from "react";
import {useSelector} from 'react-redux'

let picstyle = {
    height: "400px"
}

const ImagePreview =() => {
    const imagePreview = useSelector((state)=> state.photo.uploadedPhotoExif)
    useEffect(() => {
        console.log(" this is the image preview url:    ")
    },[imagePreview])
    let url
    if(imagePreview.image){
        let file = imagePreview.image
        url = URL.createObjectURL(file);
    }
    return (
        <>
        <div style={{display:"flex", justifyContent:"center"}}>
            <img className="image-preview" src={url} style={picstyle}></img>
        </div>
        </>
    )
}
export default ImagePreview