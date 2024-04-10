const catchError = require('../utils/catchError');
const Favorite = require('../models/Favorite');
const User = require('../models/User');
const News = require('../models/News');
const Image = require('../models/Image');



const getAll = catchError(async(req, res) => {
    const {newsId,userId, offset, limitPerPage}=req.query;
    const where ={};
    if (newsId) where.newsId =newsId;
    if (userId) where.userId = userId;

    const results = await Favorite.findAll({
        include:[
            {model:User,
            //attributes:['id','firstName','lastName','email'],
            attributes:{exclude:['password']}
        },{
            model:News,
            include:[Image]

        }
            ],
        where:{
        offset:offset,
        limit: limitPerPage,
        //attributes:['id','rate','newsId']
        }
    });
    const total = await Favorite.count();
    return res.json({total,results});
});

const create = catchError(async(req, res) => {
    const {rate , newsId}=req.body;
    const userId = req.user.id;
    const result = await Favorite.create({rate, newsId,userId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.findByPk(id,{include:[User]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Favorite.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Favorite.update(
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