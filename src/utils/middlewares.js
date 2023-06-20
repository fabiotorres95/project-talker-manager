const HTTP_BAD_REQ_STATUS = 400;
const HTTP_NO_AUTH_STATUS = 401;
const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 
const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
const { validTokens } = require('./fsUtils');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "email" é obrigatório', 
    });
  } if (!emailRegex.test(email)) {
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
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "name" é obrigatório', 
    });
  } if (name.length < 3) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};
  
const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "age" é obrigatório', 
    });
  } if (!Number.isInteger(age) || age < 18) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18', 
    });
  }

  next();
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(HTTP_BAD_REQ_STATUS).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  
  next();
};

const checkWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (!watchedAt) {
    return res.status(HTTP_BAD_REQ_STATUS).json({ 
      message: 'O campo "watchedAt" é obrigatório', 
    });
  } if (!dateRegex.test(watchedAt)) {
    return res.status(HTTP_BAD_REQ_STATUS).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  next();
};

const checkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(HTTP_BAD_REQ_STATUS).json({
      message: 'O campo "rate" é obrigatório',
    });
  } if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQ_STATUS).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
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
  checkTalk,
  checkWatchedAt,
  checkRate,
};