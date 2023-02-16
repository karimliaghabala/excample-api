const { Pool } = require('pg');
const express = require('express');
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cors())


const pool = new Pool({
    user: 'cografiyaelm',
    host: 'db.bit.io',
    database: 'cografiyaelm/portalnews',
    password: 'v2_3zCwM_tNTGTZjKmuEHtsTbBZjHfs3',
    port: 5432,
    ssl: true,
});

app.route("/")
    .get((req, res) => {
        pool.query('SELECT * FROM news', (err, data) => {
            if (!err) {
                res.send(data.rows);
            } else {
                res.status(500).send()
            }
        });
    })
    .post((req, res) => {
        const title = req.body.title
        const author = req.body.author
        const content = req.body.content

        const query = `insert into coins(title,author,content)values('${title}','${author}','${content}')`
        pool.query(query, (err, data) => {
            if (!err) {
                res.send(data.rows);
            } else {
                res.status(500).send("error")
            }
        })
    })
app.route("/:id")
    .get((req, res) => {
        const query = `select * from news where id = ${req.params.id}`
        pool.query(query, (err, data) => {
            if (!err) {
                res.send(data.rows)
            } else (
                res.status(500).send()
            )
        })
    })
    .delete((req, res) => {
        const query = `delete from news where id = ${req.params.id}`
        pool.query(query, (err, data) => {
            if (!err) {
                res.send(data.rows)
            } else (
                res.status(500).send()
            )
        })
    })
    .put((req, res) => {
        const query = `UPDATE news
        SET texth1 = '${req.body.texth1}'
        WHERE id = ${req.params.id};
        `
        connection.query(query, (err, data) => {
            if (err) {
                res.status(500).send()
            } else {
                res.send(data.rows)
            }
        })
    })

app.route("/search")
    .get((req, res) => {
        const query = req.query.q;
        const sql = `SELECT * FROM news WHERE texth1 LIKE '%${query}%'`
        pool.query(sql, (error, results) => {
            if (error) throw error;
            res.send(results);
          });
    });

const PORT = process.env.PORT || 3000       
app.listen(PORT, () => {
    console.log("server runing")
})