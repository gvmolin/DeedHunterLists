const usCounties = require('../db/geojson/us_counties.json')
const statesInfo = require('../db/statesGuide.json')
const hasher = require('wordpress-hash-node');
const dbProgram = require('../models/sqlQueries')

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
            //console.log(statesIndex.info.id)
            if(req.body.state == statesIndex.info.id){
                //console.log(statesIndex.info.id)
                result = statesIndex
            }
        }
        //console.log(result)
        res.send(result)
    })

    app.post('/login', async(req, res)=>{
        const result =  await dbProgram.selectUser(req.body.email)
        console.log(result.length)
        //console.log(typeof(result[0].user_pass))

        if(result.length > 0){
            var checked = hasher.CheckPassword(req.body.password, result[0].user_pass);
        }else{
            res.send(`{"login":"false"}`)
        }

        if(checked == true){
            req.session.isAuth = true
            req.session.user = result[0].user_login
            res.send(`{"login":"${req.session.isAuth}"}`)
            
        }else{
            res.send(`{"login":"false"}`)
        }
    })

}