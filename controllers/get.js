const usStates = require('../db/geojson/us_states.json')
const guide = require('../db/statesGuide.json')
const attorneys = require('../db/attorneys.json')
const isAuth = require('../models/isAuth')

module.exports = app => {
    app.get('/login', async(req, res)=>{
        res.render('login.ejs')
    })

    app.get('/', isAuth, async(req, res)=>{
        res.render('map.ejs', {user : req.session.user})
    })

    app.get('/lists', isAuth, async(req, res)=>{
        res.render('lists.ejs')
    })

    app.get('/attorneys', isAuth, async(req, res)=>{
        res.render('attorneys.ejs')
    })

    app.get('/landBank', isAuth, async(req, res)=>{
        res.render('landBank.ejs')
    })

    app.get('/guide',  isAuth, async(req, res)=>{
        res.render('guide.ejs')
    })

    app.get('/termos',  isAuth, async(req, res)=>{
        res.render('termos.ejs')
    })






    app.get('/getStates', async(req, res)=>{
        res.send(usStates)
    })

    app.get('/getGuide', async(req, res)=>{
        res.send(guide)
    })

    app.get('/getAttorneys', async(req, res)=>{
        res.send(attorneys)
    })
}