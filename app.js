import express from 'express'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import hbs from 'hbs'
import path from 'path'

import furniture from './routes/furniture.js'
import index from './routes/index.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

const jwtSecret = 'secretarka123'

app.get('/jwt', (req, res, next) => {
  const token = jsonwebtoken.sign({user: 'NC5324', password: 'strongPass123'}, jwtSecret)
  res.cookie('token', token, {httpOnly: true})
  res.json({ token })
})

app.use(jwt({
    secret: jwtSecret,
    algorithms: ['HS256'],
    getToken: req => {
        console.log(req.headers)
        return req.cookies.token
    }
}))

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname)))

app.use('/furniture', furniture)
app.use(index)

app.listen(3000, () => {
  console.log('App running at http://localhost:3000/')
})
