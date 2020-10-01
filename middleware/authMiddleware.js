const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.header('auth-token')
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.json({
                    error: 'Access Denied!'
                })
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        res.json({ error: 'No Token Found' })
    }
}

module.exports = { requireAuth }