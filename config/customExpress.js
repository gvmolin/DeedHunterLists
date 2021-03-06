const express = require('express');
require('dotenv/config');
const path = require('path');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const consign = require('consign');
const cors = require("cors");

module.exports = () => {
    const app = express()
   
    const threeHours = 1000 * 60 * 60 * 3;
    app.use(session({
    secret: process.env.SECRET,
    saveUninitialized:true,
    cookie: { maxAge: threeHours},
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

    const corsOptions ={
        origin:'*', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
    }
    app.use(cors(corsOptions))

    return app
}