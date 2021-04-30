import express from 'express'
import {Furniture, Review} from '../models'

const router = express.Router()

router.get('/all', (req, res, next) => {
    Review.findAll().then(
        r => {
            res.status(200).json(r)
        },
        err => {
            console.log(err)
        }
    )
})

router.get('/filter/:furnitureId', (req, res, next) => {
    Review.findAll({
        where: {
            furnitureId: req.params.furnitureId
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

router.get('/stats/:furnitureId', (req, res, next) => {
    Review.findAndCountAll({
        where: {
            furnitureId: req.params.furnitureId
        }
    }).then(
        r => {
            let response = {}
            response.furnitureId = req.params.furnitureId
            response.count = r.count
            response.average = (() => {
                if(r.count === 0) {
                    return 0
                }

                let sum = 0
                for(let i=0;  i<r.count; i++) {
                    sum += r.rows[i].rating
                }
                const avg = sum / r.count
                return Math.round( avg * 10 + Number.EPSILON ) / 10
            })()
            response.distribution = [
                {
                    title: '5 звезди',
                    count: r.rows.filter(x => x.rating === 5).length
                },
                {
                    title: '4 звезди',
                    count: r.rows.filter(x => x.rating === 4).length
                },
                {
                    title: '3 звезди',
                    count: r.rows.filter(x => x.rating === 3).length
                },
                {
                    title: '2 звезди',
                    count: r.rows.filter(x => x.rating === 2).length
                },
                {
                    title: '1 звезда',
                    count: r.rows.filter(x => x.rating === 1).length
                }
            ]
            res.status(200).json(response)
        },
        err => {
            console.log(err)
        }
    )
})

export default router
