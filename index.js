import express from 'express'
import furniture from './router/furniture.router.js'

const app = express()
const PORT = 3000;

app.use('/furniture', furniture)

app.listen( PORT,() => {
    console.log(`App running at http://localhost:3000`)
})
