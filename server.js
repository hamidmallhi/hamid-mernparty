const express = require('express')
const app = express()

const connectDB = require('./config/db')

// connect to database 
connectDB()

app.use(express.json({ extended: true }))

app.use('/register', require('./routes/register')) 
app.use('/auth', require('./routes/auth')) 
app.use('/guests', require('./routes/guests')) 

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
  }

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))



