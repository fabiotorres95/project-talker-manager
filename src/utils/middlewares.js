const HTTP_BAD_REQ_STATUS = 400;
const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 

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

module.exports = {
  validateEmail,
  validatePassword,
};