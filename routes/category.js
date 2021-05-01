import express from 'express'
import {Category, Furniture} from '../models'
import {Op} from 'sequelize'

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

router.post('/by-name', (req, res, next) => {
    Category.findOne({
        where: {
            name: req.body.name
        }
    }).then(
        r => {
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

router.post('/children', (req, res, next) => {
    Category.findAll({
        attributes: ['id', 'level'],
        where: {
            level: {
                [Op.gt]: req.body.level
            },
            parentId: req.body.id
        }
    }).then(
        r => {
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

router.get('/furniture/:furnitureId', (req, res, next) => {
    Category.findAll({
        include: [{
            model: Furniture,
            through: {
                attributes: []
            },
            where: {
                id: req.params.furnitureId
            }
        }]
    }).then(
        r => {
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

export default router
