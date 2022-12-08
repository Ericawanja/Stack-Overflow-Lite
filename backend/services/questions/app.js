const express = require('express')
const questionRoutes = require('./routes')
const app = express()

app.use(express.json())
app.get ('/', (req, res)=>{
    res.status(200).send('running')
})
app.use('/questions', questionRoutes)

app.listen(5000, ()=>console.log('app running'))