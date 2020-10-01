const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes')
const demoRoute = require('./routes/demoRoute')
const app = express();

const PORT = process.env.PORT || 9000
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to DB!')
})

app.use(morgan())
app.use(express.json())
app.use(authRoutes)
app.use(demoRoute)
// router.get('/blogs', authMiddleware, async (req, res) => {
//     try {
//         res.send('BLOGS!')
//     } catch (err) {
//         console.log(err)
//     }
// })

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`)
})