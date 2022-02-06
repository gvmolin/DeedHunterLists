const customExpress = require("./config/customExpress")
const app = customExpress()

/*dbClient.connect(error => {
    if(error){
        console.log(console.log(error))
    }
    else{
        console.log('conectado no banco de dados <-----------')
        tables.init(dbClient)
    }
})*/
app.listen(process.env.PORT, ()=> console.log(`servidor rodando na porta ${process.env.PORT} <-----------`))////////////