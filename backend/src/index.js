const express = require('express');
const app = express();
const registrationRoutes = require('./routes/registration'); // Importação do módulo


app.use(express.json());
// Configure CORS headers manually
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3011'); // Change this to your frontend origin
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Allow the browser to handle OPTIONS (preflight) requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});
app.get('/', (req, res) => {
  res.send('API is live. By Andres Hernandez');
});
app.use('/registration', registrationRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
