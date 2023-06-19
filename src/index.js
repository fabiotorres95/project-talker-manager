const express = require('express');

const { 
  readTalkerData, 
  readTalkerDataWithId,
  tokenGenerator,
} = require('./utils/fsUtils');

const {
  validateEmail,
  validatePassword,
} = require('./utils/middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_PNF_STATUS = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await readTalkerData();
  
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const [talker] = await readTalkerDataWithId(Number(id));
  if (!talker) {
    return res.status(HTTP_PNF_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const token = tokenGenerator();

  return res.status(HTTP_OK_STATUS).json({ token });
});