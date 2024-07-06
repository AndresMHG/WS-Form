const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Registration form will be rendered here.');
});

router.post('/', (req, res) => {
  const { email, type, name, cpf, birthdate, phone, companyName, cnpj, companyOpeningDate, password } = req.body;

  if (!email || !type || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.status(200).json({ message: 'Registration successful' });
});

module.exports = router;
