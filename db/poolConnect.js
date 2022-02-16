const pool = require('../db/pool')

async function dbconnect() {
    let conn;
    try {
      conn = await pool.getConnection();
      console.log('MariaDB connected <-----------')
  
    } catch (err) {
      throw err;
    }
}

module.exports = dbconnect