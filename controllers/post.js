const usCounties = require('../db/geojson/us_counties.json')
const statesInfo = require('../db/statesGuide.json')
const hasher = require('wordpress-hash-node');
const dbProgram = require('../models/sqlQueries')
var request = require("request")
require('dotenv/config');
const yyyymmdd = require('../models/formatDate')

module.exports = app => { 
    app.post('/getCounties', async(req, res)=>{
        var arr = []
        for (var i = 0; i < usCounties.features.length; i++) {
            var countiesIndex = usCounties.features[i]
            var stateNumber = countiesIndex.properties.STATE
            var countyName =  countiesIndex.properties.NAME
            
            if(stateNumber == req.body.stateNumber){
                arr.push(`{"name":"${countyName}"}`)
            }
        }
        const jsonStr = `{"data":[${arr}]}`
        res.send(jsonStr)
    })

    app.post('/statesInfo', async(req, res)=>{
        var result = {}
        for(let i = 0; i<statesInfo.length; i++){
            const statesIndex = statesInfo[i]
            if(req.body.state == statesIndex.info.id){
                result = statesIndex
            }
        }
        res.send(result)
    })

    app.post('/statesInfoForSelect', async(req, res)=>{
        var result = {}
        for(let i = 0; i<statesInfo.length; i++){
            const statesIndex = statesInfo[i]
            if(req.body.state.toUpperCase() == statesIndex.state){
                result = statesIndex
            }
        }
        //console.log(result)
        res.send(result)
    })

    app.post('/login', async(req, res)=>{
        const result =  await dbProgram.selectUser(req.body.email)
        //console.log(result)
        //console.log(typeof(result[0].user_pass))

        if(result.length > 0){
            var checked = hasher.CheckPassword(req.body.password, result[0].user_pass);
        }else{
            res.send(`{"login":"false"}`)
        }

        if(checked == true){
            req.session.isAuth = true
            req.session.user = result[0].user_login
            req.session.idNumber = result[0].ID
            res.send(`{"login":"${req.session.isAuth}"}`)
            
        }else{
            res.send(`{"login":"false"}`)
        }
    })

    app.post('/searchLists', async(req, res)=>{
        const today = yyyymmdd.today()
        const twoWeeks = yyyymmdd.twoWeeks()
        const fourWeeks = yyyymmdd.fourWeeks()
        
        var url = `https://www.taxsaleresources.com/DHSearchHandler.ashx?UserID=${req.session.idNumber}&UserName=${process.env.API_USERNAME}&Password=${process.env.API_PASSWORD}&CountyOtc=${req.body.otc}&BidProcedures=All&AuctionType=${req.body.list}&State=All&County=All&SaleStart=${today}&SaleEnd=${fourWeeks}&PageSize=10000&PageIndex=1&orderby=startdate&order=asc`
        console.log(url)
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