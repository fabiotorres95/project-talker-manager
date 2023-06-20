const HTTP_BAD_REQ_STATUS = 400;
const HTTP_NO_AUTH_STATUS = 401;
const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 
const { validTokens } = require('./fsUtils');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "email" é obrigatório', 
    });
  } if (!regex.test(email)) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O "email" deve ter o formato "email@email.com"', 
    });
  }  

  next();
};
const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "password" é obrigatório', 
    });
  } if (password.length < 6) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O "password" deve ter pelo menos 6 caracteres', 
    });
  }

  next();
};

const checkToken = (req, res, next) => {
  const authorization = req.header('authorization');

  if (!authorization) {
    return res.status(HTTP_NO_AUTH_STATUS).json({ message: 'Token não encontrado' });
  }

  const isValid = validTokens.find((t) => t === authorization);

  if (!isValid) {
    return res.status(HTTP_NO_AUTH_STATUS).json({ message: 'Token inválido' });
  }

  next();
};

const checkName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "name" é obrigatório', 
    });
  } if (name.length < 3) {
    res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};
  
const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "age" é obrigatório', 
    });
  } if (typeof age !== 'number' || age < 18) {
    res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18', 
    });
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  checkToken,
  checkName,
  checkAge,
};