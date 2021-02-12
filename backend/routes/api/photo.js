const express = require("express")
const { Op } = require("sequelize")
const asyncHandler = require("express-async-handler")

const {Photo, User} = require("../../db/models")
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload} = require("../../awsS3");

const router = express.Router();

router.get("/", asyncHandler(async (req, res) => {
    const photos = await Photo.findAll({
        order: [["dateTime", "DESC"]],
        include: [{model: User, attributes: ['username', 'lastName']}]
    })
    res.json(photos)
}))

router.get(
  "/:searchLat/:searchLng/:radius/:dateRangeStart/:dateRangeEnd/:latBounds/:lngBounds",
  asyncHandler(async (req, res) => {
    
    
    let searchLat = parseFloat(req.params.searchLat)
    let searchLng = parseFloat(req.params.searchLng)
    // let radius = parseInt(req.params.radius)
    let latBounds = parseFloat(req.params.latBounds)
    let lngBounds = parseFloat(req.params.lngBounds)
    let dateRangeStart = req.params.dateRangeStart
    let dateRangeEnd = req.params.dateRangeEnd

    // if (searchLat < 0) parseFloat(latBounds*=(-1))
    // if (searchLng < 0) parseFloat(lngBounds*=(-1))
    console.log("This is the search coordinates",   searchLat, searchLng, dateRangeStart, dateRangeEnd, latBounds, lngBounds)
    const nearbyPhotos = await Photo.findAll({
      where: {
        latitude: {
          [Op.between]: [searchLat - latBounds, searchLat + latBounds],
        },
        longitude: {
          [Op.between]: [searchLng - lngBounds, searchLng + lngBounds],
        },
        dateTime: {
          [Op.between]: [dateRangeStart, dateRangeEnd],
        },
      },
      // attributes: ["photoThumbUrl"],
      order: [["dateTime", "DESC"]],
    });
    res.json(nearbyPhotos)
  })
);

router.get("/myPhoto/:userId",
  asyncHandler(async (req, res) => {
    let id = req.params.userId;
    const myPhotos = await Photo.findAll({
      where: {
        user_id: id
      },
      order: [["dateTime", "DESC"]]
    })
    res.json(myPhotos)
  })
)

router.put("/update", asyncHandler (async (req, res) => {
  const {id, user_id, locationName, streetNumber, streetName, city, state, zipcode, updateDate, updateLat, updateLng, updateTitle, updateDescription, photoUrl, photoThumbUrl} = req.body
  console.log("this is req.body:     ",city)
  const updatedPhoto = await Photo.update({
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
  },
    {where:{id: id},
    returning: true,
    plain: true
  })
  
  return res.json(updatedPhoto);
}
))

router.post('/add',
singleMulterUpload("image"),
asyncHandler( async (req, res) => {
    const { latitude, longitude, dateTime, user_id } = req.body;
    console.log(req.body)
    const photoUrl = await singlePublicFileUpload(req.file)
    const newPhoto = await Photo.create({ 
        latitude,
        longitude,
        dateTime,
        user_id,
        photoUrl,
    })
    res.json(newPhoto)
})
)

router.delete("/:id", asyncHandler(async (req, res) => {
  const deletePhoto = await Photo.destroy({
    where: {
      id: req.params.id
    }
  })
  res.json(deletePhoto)
}))


module.exports = router