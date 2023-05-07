require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

const Prismic = require('@prismicio/client')
const PrismicH = require('@prismicio/helpers')

const PORT = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Initialize the prismic.io api
const initApi = (req) => {
  return Prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    req,
    fetch
  })
}

// Link Resolver
const HandleLinkResolver = (doc) => {
  // Default to homepage
  return '/'
}

// prismic
app.use((req, res, next) => {
  res.locals.Link = HandleLinkResolver
  res.locals.PrismicH = PrismicH

  next()
})

app.get('/', async (req, res) => {
  const api = await initApi(req)
  const metadata = await api.getSingle('metadata')
  res.render('pages/home', { metadata })
})

app.get('/about', async (req, res) => {
  const api = await initApi(req)
  const metadata = await api.getSingle('metadata')
  const about = await api.getSingle('about')

  res.render('pages/about', {
    about,
    metadata
  })
})

app.get('/collections', (req, res) => {
  res.render('pages/collections')
})

app.get('/detail/:uid', (req, res) => {
  res.render('pages/detail')
})

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
