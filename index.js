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
        pool.query('SELECT * FROM coins', (err, data) => {
            if (!err) {
                res.send(data.rows);
            } else {
                res.status(500).send()
            }
        });
    })
    .post((req, res) => {
        const texth1 = req.body.texth1
        const text = req.body.text
        const country = req.body.country
        const composition = req.body.composition
        const denomination = req.body.denomination
        const quality = req.body.quality
        const year = req.body.year
        const weight = req.body.weight
        const price = req.body.price
        const link1 = req.body.link1
        const link2 = req.body.link2
        const query = 
        `insert into coins
                (texth1,text,country,composition,denomination,quality,year,weight,price,link1,link2)
         values
        (${texth1},
        '${text}',
        '${country}'),
        '${composition}'),
        '${denomination}'),
        '${quality}'),
        '${year}'),
        '${weight}'),
        '${price}'),
        '${link1}'),
        '${link2}'),
        `
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