require('dotenv').config();
const { Sequelize } = require('sequelize');
const MODELS = require('./models/index');

const sequelize = new Sequelize(
  process.env.DB_URL,
  {

    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  },
);

// DEFINE MODELS
for (const key in MODELS) {//eslint-disable-line
  // Recorre y define los modelos
  MODELS[key](sequelize);
}

// DEFINE RELATIONS
const {
  User, Category, Review, Local, Image, Dish, Menu,
} = sequelize.models;

Review.belongsTo(User);
User.hasMany(Category);

Image.belongsTo(Review);
Review.hasMany(Image);

Image.belongsTo(Local);
Local.hasMany(Image);

Local.belongsTo(User);
User.hasMany(Local);

Category.belongsTo(Review);
Review.hasMany(Category);

Dish.belongsTo(Menu);
Menu.hasMany(Dish);

Menu.belongsTo(Local);
Local.hasOne(Menu);

module.exports = {
  ...sequelize.models,
  db: sequelize,
};
