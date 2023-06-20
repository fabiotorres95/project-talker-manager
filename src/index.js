const express = require('express');

const { 
  readTalkerData, 
  readTalkerDataWithId,
  tokenGenerator,
  writeTalkerData,
  updateTalkerData,
} = require('./utils/fsUtils');

const {
  validateEmail,
  validatePassword,
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
} = require('./utils/middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
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

app.post(
  '/talker', 
  checkToken, 
  checkName, 
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  async (req, res) => {
    const newData = req.body;

    const newDataWithId = await writeTalkerData(newData);

    return res.status(HTTP_CREATED_STATUS).json(newDataWithId);
  },
);

app.put(
  '/talker/:id',
  checkToken,
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRate,
  async (req, res) => {
    const { id } = req.params;
    const [talker] = await readTalkerDataWithId(Number(id));
    if (!talker) {
      return res.status(HTTP_PNF_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
    }

    const newData = req.body;
    const updatedData = await updateTalkerData(Number(id), newData);

    return res.status(HTTP_OK_STATUS).json(updatedData);
  },
);