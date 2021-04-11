import express from 'express'
const router = express.Router()

router.get('/all', (req, res, next) => {
    res.status(200).send('Get request to /furniture/all returned all furniture')
})

export default router
