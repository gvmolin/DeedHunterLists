const usStates = require('../db/geojson/us_states.json')

module.exports = app => {
    app.get('/', async(req, res)=>{
        res.render('teste.ejs')
    })

    app.get('/getStates', async(req, res)=>{
        res.send(usStates)
    })
}