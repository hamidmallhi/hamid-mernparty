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
  // Express will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))



