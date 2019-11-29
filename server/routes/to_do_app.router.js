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
    const newTaskObject = req.body;
    console.log(newTaskObject);
    const queryString = `INSERT INTO "weekend-to-do-app" ("task", "tools", "complete")
    VALUES('${newTaskObject.task}', '${newTaskObject.tools}', '${newTaskObject.complete}');`;

    pool.query(queryString)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});

//Put Router
router.put('/:task', (req,res) => {
    const task = req.params.task;
    const complete = req.body.complete

    let queryString = `UPDATE "weekend-to-do-app" SET "task"=${complete} WHERE "task" = $1;`;
    console.log(queryString);
    pool.query(queryString, [task])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});
//Doesn't accept object data use params
router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    const taskID = req.params.id;
    const queryString = `DELETE FROM "weekend-to-do-app" WHERE "id" = ${taskID};`;

    pool.query(queryString)
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500);
        })
});


module.exports = router;
