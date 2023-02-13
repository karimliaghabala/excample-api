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
    password: 'v2_3yyCR_CCPAYMtceynq57mNzFvYGZJ',
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
        const textshort = req.body.textshort
        const text = req.body.text
        const typeCoins = req.body.typeCoins
        const country = req.body.country
        const composition = req.body.composition
        const denomination = req.body.denomination
        const quality = req.body.quality
        const year = req.body.year
        const weight = req.body.weight
        const price = req.body.price
        const link1 = req.body.link1
        const link2 = req.body.link2
        const query = `insert into coins(typeCoins,texth1,text,country,composition,denomination,quality,year,weight,price,link1,link2,textshort)values('${typeCoins}','${texth1}','${text}','${country}','${composition}','${denomination}','${quality}',${year},'${weight}','${price}','${link1}','${link2}','${textshort}')`
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
        const query = `select * from coins where id = ${req.params.id}`
        pool.query(query, (err, data) => {
            if (!err) {
                res.send(data.rows)
            } else (
                res.status(500).send()
            )
        })
    })
    .delete((req, res) => {
        const query = `delete from coins where id = ${req.params.id}`
        pool.query(query, (err, data) => {
            if (!err) {
                res.send(data.rows)
            } else (
                res.status(500).send()
            )
        })
    })
    .put((req, res) => {
        const query = `UPDATE coins
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
        const items = `select * from coins where texth1 = ${req.params.texth1}`
        const results = items.filter(item => item.texth1.toLowerCase().includes(query.toLowerCase()));
        res.send(results);
    });

const PORT = process.env.PORT || 3000       
app.listen(PORT, () => {
    console.log("server runing")
})