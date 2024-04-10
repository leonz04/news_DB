const catchError = require('../utils/catchError');
const News = require('../models/News');
const Category = require('../models/Category');
const {Op} =require('sequelize');
const Image = require('../models/Image');
const Favorite = require('../models/Favorite');

const getAll = catchError(async(req, res) => {
    const {categoryId,headline}=req.query;
    const where ={}
    if (categoryId) where.categoryId =categoryId;
    if (headline) where.headline = {[Op.iLike]:`%${headline}%`}
    const results = await News.findAll({
    include:[Category,  Image, Favorite],
    where:where
    
});
const newsWithRating=results.map(news=>{
    
    const newsJson = news.toJSON();
    console.log(newsJson)
    let sum=0
    newsJson.favorites.forEach(favorite=>{
        sum+=favorite.rate
    })
    const favoriteCount= newsJson.favorites.length
    const average = favoriteCount>0?sum/favoriteCount:0;
    delete newsJson.favorites;
    return {...newsJson, rating:average}
})
    return res.json(newsWithRating);
});

const create = catchError(async(req, res) => {
    const result = await News.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.findByPk(id,{include:[Category,Image,Favorite]});
    if(!result) return res.sendStatus(404);
    const newsJson = result.toJSON();
    console.log(newsJson)
    let sum=0
    newsJson.favorites.forEach(favorite=>{
        sum+=favorite.rate
    })
    const totalFavorites= newsJson.favorites.length
    const average = totalFavorites>0?sum/totalFavorites:0;
    delete newsJson.favorites;
    return res.json({...newsJson, rating:average});
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await News.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await News.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}