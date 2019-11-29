const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET router
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "weekend-to-do-app";`)
    .then((response) => {
        console.log('yes');
        res.send(response.rows);
    })
    .catch((err) => {
        console.log('no');
        res.sendStatus(500);
    });
});

//Post router
router.post('/', (req,res) => {
    const newToDo = req.body;
    const queryString = `INSERT INTO "weekend-to-do-app" ("task", "tools", "complete")
    VALUES('${newToDo.task}', '${newToDo.tools}', '${newToDo.complete}');`;

    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

//Put Router

//Delete Router



module.exports = router;
