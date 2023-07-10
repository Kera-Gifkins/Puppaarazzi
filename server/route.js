const express = require('express')
const hbs = require('express-handlebars')
const path = require('node:path')
const route = express()
const fs = require('node:fs/promises')

route.use(express.urlencoded({ extended: false }))

// Handlebars configuration
route.engine('hbs', hbs.engine({ extname: 'hbs' }))
route.set('view engine', 'hbs')
route.set('views', __dirname + '/views')

route.get('/:id', async (req, res) => {
  const pID = Number(req.params.id)

  const PuppiesData = await fs.readFile(
    path.resolve(__dirname, './data/data.json'),
    'utf-8'
  )
  const template = 'details'

  const data = JSON.parse(PuppiesData)

  const puppies = data.puppies

  let theOne = puppies.find((puppy) => {
    return puppy.id == pID
  })
  res.render(template, theOne)
})

route.get('/:id/edit', async (req, res) => {
  const pID = Number(req.params.id)

  const PuppiesData = await fs.readFile(
    path.resolve(__dirname, './data/data.json'),
    'utf-8'
  )
  const template = 'edit'

  const data = JSON.parse(PuppiesData)

  const puppies = data.puppies

  let theOne = puppies.find((puppy) => {
    return puppy.id == pID
  })
  res.render(template, theOne)
})

route.post('/:id/edit', async (req, res) => {
  const PuppiesData = await fs.readFile(
    path.resolve(__dirname, './data/data.json'),
    'utf-8'
  )
  const data = JSON.parse(PuppiesData)
  const pID = Number(req.params.id)

  let theOne = data.puppies.find((puppy) => {
    return puppy.id == pID
  })
  const doggoImage = theOne.image
  const updatedpupper = {
    id: pID,
    name: req.body.name,
    owner: req.body.owner,
    image: doggoImage,
    breed: req.body.breed,
  }
  theOne.name = updatedpupper.name
  theOne.owner = updatedpupper.owner
  theOne.breed = updatedpupper.breed

  const newfile = JSON.stringify(data, null, 2)

  await fs.writeFile(path.resolve(__dirname, './data/data.json'), newfile)
  res.redirect('/')
})

module.exports = route
