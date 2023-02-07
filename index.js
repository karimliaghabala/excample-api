const { Pool } = require('pg');
const express = require('express');
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cors())


const pool = new Pool({
    user: 'agabala93',
    host: 'db.bit.io',
    database: 'agabala93/coinHistory',
    password: 'v2_3yrfR_t6LUuSXj4iLferuCpFy5EHb',
    port: 5432,
    ssl: true,
});

app.route("/")
    .get((req, res) => {
        pool.query('SELECT * FROM excample', (err, data) => {
            if (!err) {
                res.send(data.rows);
            } else {
                res.status(500).send()
            }
        });
    })
    .post((req, res) => {
        const categoryId = req.body
        const categoryName = req.body
        const categorySurname = req.body
        const query = `insert into excample (id,name,surname) values(${categoryId.id},'${categoryName.name}','${categorySurname.surname}')`
        pool.query(query, (err, data) => {
            if (!err) {
                res.send(data.rows);
            } else {
                res.status(500).send()
            }
        })
    })


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server runing")
})