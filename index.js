const customExpress = require("./config/customExpress")
const app = customExpress()
const mariadb = require('mariadb')
const dbconnect = require("./db/poolConnect")

app.listen(process.env.PORT, async()=> {
    await dbconnect()
    console.log(`servidor rodando na porta ${process.env.PORT} <-----------`)

})////////////