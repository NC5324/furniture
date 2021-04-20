import express from 'express'
import { Furniture } from '../models'
import PageRequest from '../requests/page_request.js'

const router = express.Router()

router.get('/all', (req, res, next) => {
    Furniture.findAll().then(
        r => {
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

router.get('/:category', (req, res, next) => {
    Furniture.findAll().then(
        r => {
            res.render('browse', {
                title: req.params.category
            })
        },
        err => {
            console.log(err)
        }
    )
})

router.get('/page', (req, res, next) => {
    const request = new PageRequest(req.body.perPage, req.body.currentPage)
    Furniture.findAndCountAll({
        limit: request.perPage,
        offset: (request.currentPage - 1) * request.perPage
    }).then(
        r => {
            r.perPage = request.perPage
            r.currentPage = request.currentPage
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

export default router
