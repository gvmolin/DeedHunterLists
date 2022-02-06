const express = require('express');
require('dotenv/config');
const path = require('path');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const consign = require('consign');

module.exports = () => {
    const app = express()
   
    const oneDay = 1000 * 60 * 60 * 9;
    app.use(session({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
    }));

    app.use(express.json({limit: '15mb'}));    
    app.set('../views', path.join(__dirname, 'views'))
    app.set('view engine', 'ejs')
    
    consign()
    .include('controllers')
    .into(app)

    //static files
    app.use(express.static('public'))
    app.use('/css', express.static(__dirname + 'public'))
    app.use('/js', express.static(__dirname + 'public/js'))
    app.use('/img', express.static(__dirname + 'public/img'))

    app.use(cookieParser());
    
    return app
}