const express = require("express")
const { Op } = require("sequelize")
const asyncHandler = require("express-async-handler")

const {Photo, User} = require("../../db/models")

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

module.exports = router