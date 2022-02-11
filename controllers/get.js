const usStates = require('../db/geojson/us_states.json')
var request = require("request")

module.exports = app => {
    app.get('/', async(req, res)=>{
        res.render('map.ejs')
    })

    app.get('/lists', async(req, res)=>{
        res.render('lists.ejs')
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
}