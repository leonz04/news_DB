const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const News = require('../models/News');
const { uploadToCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const images = await Image.findAll({include:[News]});
    return res.json(images)
});

const create =catchError(async(req,res)=>{
    const {url}=await uploadToCloudinary(req.file);
    const {newsId}=req.body;
    const image = await Image.create({url,newsId});
    return res.status(201).json(image);
})

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if(!image) return res.sendStatus(404);
    await deleteFromCloudinary(Image.imageUrl);
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}