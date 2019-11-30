const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET router
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "weekend-to-do-app" ORDER BY "id" ASC;`)
    .then((response) => {
        console.log('server GET');
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});

//Post router
router.post('/', (req,res) => {
    const newTaskObject = req.body;
    const queryString = `INSERT INTO "weekend-to-do-app" ("task", "tools", "complete")
    VALUES('${newTaskObject.task}', '${newTaskObject.tools}', '${newTaskObject.complete}');`;

    pool.query(queryString)
    .then((response) => {
        console.log('server POST');
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

// can receive data, but still set up as 'DELETE'
router.put('/:id', (req,res) => {
    const id = req.params.id;
    const statusChange = req.body.statusChange;
    let updateStatus = `'Finished'`;

    if(statusChange === "Finished"){
        updateStatus = `'Finished'`;
     } else { 
         updateStatus = `'Unfinished'`;
     }
    
    let queryString = `UPDATE "weekend-to-do-app" SET "status"=${updateStatus} WHERE "id" = $1;`;   

    pool.query(queryString, [id])
        .then((response) => {
            console.log('server PUT');
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});

//Doesn't accept object data use params
router.delete('/:id', (req,res) => {
    
    const taskID = req.params.id;
    const queryString = `DELETE FROM "weekend-to-do-app" WHERE "id" = ${taskID};`;

    pool.query(queryString)
        .then((response) => {
            console.log('server DELETE');
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});


module.exports = router;
