const Category = require("./Category");
const Favorite = require("./Favorite");
const Image = require("./Image");
const News = require("./News");
const User = require("./User");

Category.hasMany(News)
News.belongsTo(Category)

News.hasMany(Image)
Image.belongsTo(News)

User.hasMany(Favorite)
Favorite.belongsTo(User)

News.hasMany(Favorite)
Favorite.belongsTo(News)

