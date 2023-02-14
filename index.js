const express = require('express');
const cookieParser = require('cookie-parser')
const {router} = require("./routes/api.js")

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(router)

app.listen(5000, () => {
  console.log(`Server up and running...`)
})