import express from "express";
import prodcutRoutes from './routes/productRoutes'

const app = express();

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use(prodcutRoutes)
// app.get('/api/products', (req, res) => {

// })

app.listen(5000, () => {
    console.log('api is running ')
})