import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send('Api is runninasdfg')
})

app.listen(5000, () => {
    console.log('api is running asdf...')
})