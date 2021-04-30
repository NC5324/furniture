import express from 'express'
import { Furniture, Category } from '../models'
import { Op } from 'sequelize'

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

router.get('/filter', (req, res, next) => {
    filter(req).then(
        r => {
            r.perPage = req.body.perPage
            r.currentPage = req.body.currentPage
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

function filter(req) {
    const request = req.body
    if(request.categories) {
        return Furniture.findAndCountAll({
            include: [{
                model: Category,
                through: {
                    attributes: []
                },
                where: {
                    id: {
                        [Op.in]: request.categories
                    }
                }
            }],
            limit: request.perPage,
            offset: (request.currentPage - 1) * request.perPage
        })
    } else {
        return Furniture.findAndCountAll({
            include: [{
                model: Category,
                through: {
                    attributes: []
                }
            }],
            limit: request.perPage,
            offset: (request.currentPage - 1) * request.perPage
        })
    }
}

export default router
