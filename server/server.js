const express = require('express')
const hbs = require('express-handlebars')
const path = require('node:path')
const server = express()
const fs = require('node:fs/promises')
// Server configuration
const publicFolder = __dirname + '/public'
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

// Your routes/router(s) should go here
server.get('/', async (req, res) => {
  const puppies = await fs.readFile(
    path.resolve(__dirname, './data/data.json'),
    'utf-8'
  )
  const viewdata = JSON.parse(puppies)

  const template = 'home'
  res.render(template, viewdata)
})
const puppiesRoute = require('./route')
server.use('/puppies', puppiesRoute)
module.exports = server
