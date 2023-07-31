require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const userRoutes = require('./routes/user.routes');
const scoreRoutes = require('./routes/score.routes');

const app = express();

connectDB();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/scores', scoreRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
