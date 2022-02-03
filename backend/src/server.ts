import express from "express";
import prodcutRoutes from './routes/productRoutes'

const app = express();

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/api/products' ,prodcutRoutes)

app.listen(5000, () => {
    console.log('api is running ')
})