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
  "/:searchLat/:searchLng/:radius/:dateRangeStart/:dateRangeEnd",
  asyncHandler(async (req, res) => {
    
    
    let searchLat = parseInt(req.params.searchLat)
    let searchLng = parseInt(req.params.searchLng)
    let radius = parseInt(req.params.radius)
    let dateRangeStart = req.params.dateRangeStart
    let dateRangeEnd = req.params.dateRangeEnd
    console.log(typeof searchLat, typeof searchLng, radius, dateRangeStart, dateRangeEnd)
    const nearbyPhotos = await Photo.findAll({
        where: {
            latitude: {
                [Op.between] : [searchLat-radius,searchLat+radius]
            },
            longitude: {
                [Op.between] : [searchLng-radius, searchLng+radius]
            },
            dateTime: {
                [Op.between] : [dateRangeStart, dateRangeEnd]
            }
        },
        // attributes: ["photoThumbUrl"],
        order: [["dateTime","DESC"]]
    })
    res.json(nearbyPhotos)
  })
);

router.post('/add',
singleMulterUpload("image"),
asyncHandler( async (req, res) => {
    const { latitude, longitude, dateTime, user_id } = req.body;
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

module.exports = router