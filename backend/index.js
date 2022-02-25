const express = require('express')
const connectMongo = require('./db.js')
const app = express()
connectMongo();

app.use(express.json())

//Routes
app.use('/api/auth/register', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.listen(3000, () => {
  console.log(`Express is running on port 3000`)
})