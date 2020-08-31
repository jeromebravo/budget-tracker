const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

app.use(cors());
app.use(express.json({extended: false}));

// define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transaction', require('./routes/transaction'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));