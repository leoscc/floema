const express = require('express')
const path = require('path')
const app = express()

const PORT = 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    meta: {
      data: {
        title: 'title',
        description: 'description'
      }
    }
  })
})

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})
