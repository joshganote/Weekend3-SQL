const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool ({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', ()=>{
    console.log('connected!');
});

pool.on('error', (error) => {
    console.log(`err:  ${error}`);
});

module.exports = pool;