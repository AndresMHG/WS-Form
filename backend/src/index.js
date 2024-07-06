const express = require('express');
const app = express();
const registrationRoutes = require('./routes/registration'); // Importação do módulo

app.use(express.json());
app.get('/', (req, res) => {
  res.send('API is live. By Andres Hernandez');
});
app.use('/registration', registrationRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
