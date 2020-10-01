const { Router } = require('express')
const { requireAuth } = require('../middleware/authMiddleware')

const router = Router()

router.get('/', requireAuth, async (req, res) => {
    try {
        res.send('Logged In!')
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router