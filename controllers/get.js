const usStates = require('../db/geojson/us_states.json')
const guide = require('../db/statesGuide.json')
var request = require("request")
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

    app.get('/listCalendar',isAuth, async(req, res)=>{
        res.render('listCalendar.ejs')
    })

    app.get('/landBank', isAuth, async(req, res)=>{
        res.render('landBank.ejs')
    })

    app.get('/guide',  async(req, res)=>{
        res.render('guide.ejs')
    })

    





    app.get('/getStates', async(req, res)=>{
        res.send(usStates)
    })

    app.get('/getinfo', async(req, res)=>{
        var url = "https://www.taxsaleresources.com/DHSearchHandler.ashx?UserID=12345&UserName=dhapi&Password=7jOsbudk[!&CountyOtc=All&BidProcedures=All&AuctionType=All&State=All&County=All&SaleStart=2022-2-1&SaleEnd=2025-4-30&PageSize=1000&PageIndex=1&orderby=startdate&order=asc"
        request({
            url: url,
            json: true
        }, function (error, response, body) {
        
            if (!error && response.statusCode === 200) {
                res.send(body)
            }
        })
    })

    app.get('/getGuide', async(req, res)=>{
        res.send(guide)
        console.log('fetch')
    })
}