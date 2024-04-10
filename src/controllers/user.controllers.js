const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Favorite = require('../models/Favorite');



const getAll = catchError(async(req, res) => {
    const results = await User.findAll({include:[Favorite]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
		// guardamos el usuario, le decimos que la contraseña es la encriptada
    const result = await User.create({
        ...req.body,
        password: hashedPassword})
    
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const {firstName,lastName,email,gender} = req.body
    const result = await User.update(
        {firstName, lastName ,email , gender},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const login= catchError(async(req,res)=>{
    
    const {email, password} = req.body;
    const user = await User.findOne({where:{email:email}});
    if(!user) return res.status(401).json({message:"invalid credentials"});
    // if(!user.isVerified) return res.status(401).json({message:"user not verified pls check your email"});    
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) return res.status(401).json({message:"invalid credentials"});
    

    const token =jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn:"1d"}
        );


    return res.json({user:user,token:token});

});


const me = catchError(async(req,res)=>{
    return res.json(req.user);
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
    me
}