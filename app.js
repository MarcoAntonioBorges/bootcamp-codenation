const express = require('express')
const port = 8888
const localhost = 'localhost'
const upload = require('express-fileupload')

const rotas = require('./api/')

var app = express()

app.use(upload())
app.use('/', rotas)

app.get('/', function (req, res) {
  res.sendFile('views/index.html', {root: __dirname })
})

app.listen(port, () => {
  console.log(`Server rodando aqui: http://${localhost}:${port}`)
})