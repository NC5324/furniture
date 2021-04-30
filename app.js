import express from 'express'
/*import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser'*/
import cors from 'cors'
import furniture from './routes/furniture.js'
import category from './routes/category.js'
import review from './routes/review.js'

const app = express()

app.use(cors())
app.use(express.json())
/*
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
        return req.cookies.token
    }
}))*/

app.use('/api/furniture', furniture)
app.use('/api/category', category)
app.use('/api/review', review)

app.listen(3000, () => {
  console.log('App running at http://localhost:3000/')
})
