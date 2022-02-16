const pool = require('../db/pool')

class program{
    async selectUser(email){
        const searchQuery = "SELECT * FROM wpt3_users WHERE user_email = ?"
        try{
            const result = await pool.query(searchQuery, [email])
            pool.end;
            //console.log(result)
            return result
        }
        catch(err){console.log(err)}
    }  
}

module.exports = new program