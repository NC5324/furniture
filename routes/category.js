import express from 'express'
import { Category } from '../models'

const router = express.Router()

router.get('/all', (req, res, next) => {
    Category.findAll().then(
        r => {
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

export default router
