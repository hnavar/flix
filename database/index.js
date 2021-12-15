const user = '<postgres user>'
const host = 'localhost'
const database = '<postgres db name>'
const password = '<postgres password>'
const port = '<postgres port>'

import { Sequelize, Model, DataTypes } from 'sequelize'
// require(sequelize)

const db = new Sequelize({
    database: 'flick_db',
    username: 'samuelbelete',
    password: '',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  })

db.authenticate().then(() => {
console.log('connected to database');
}).catch((err) => console.log(err, 'error hitting'));


const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: Sequelize.STRING,
    email_Oauth: Sequelize.STRING,
    twitter_Oauth: Sequelize.STRING,
    twitter_user_name: Sequelize.STRING,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    profile_image_url: Sequelize.STRING,
    age: Sequelize.INTEGER
});


const Genre = db.define('genre', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    genre: Sequelize.STRING,
});

// User.belongsToMany(Profile, { through: 'User_Profiles' });
// Profile.belongsToMany(User, { through: 'User_Profiles' });




User.sync();
Genre.sync();