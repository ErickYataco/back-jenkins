const express = require('express')
const app = express()
app.get('/', (req, res, next) => {
    console.log('welcome: call from '+req.connection.remoteAddress)
  res.status(200).send('Hello World!')
})
app.get('/status', (req, res, next) => {
    console.log('Status: call from '+req.connection.remoteAddress)
    res.status(200).send('Hello Status!')
  })
app.listen(3000, () => console.log('Server is running on port 3000'))