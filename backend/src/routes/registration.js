const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Registration form will be rendered here.' 
  });
});

router.post('/', (req, res) => {
  console.log('req.body', req.body); // Verifica que `req.body` tiene los datos correctos
  const { email, type, name, cpf, birthdate, phone, companyName, cnpj, companyOpeningDate, password } = req.body;

  if (!email || !type || !password) {
    return res.status(400).json({ status: 'error', error: 'Missing required fields' });
  }

  res.status(200).json({ status: 'success', message: 'Registration successful' });
});

module.exports = router;
