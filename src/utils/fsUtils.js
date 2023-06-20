const fs = require('fs').promises;
const path = require('path');

const TALKERS_PATH = '../talker.json';
const validTokens = [];
let nextId = 6;

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKERS_PATH));
    const talkers = JSON.parse(data);

    return talkers;
  } catch (err) {
    console.error(`erro ao ler o arquivo: ${err}`);
  }
}

async function readTalkerDataWithId(id) {
  try {
    const data = await readTalkerData();
    const talker = data.filter((t) => t.id === id);

    return talker;
  } catch (err) {
    console.error(`erro ao procurar no arquivo: ${err}`);
  }
}

function tokenGenerator() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 1; i <= 16; i += 1) {
    const charIndex = Math.floor(Math.random() * (characters.length - 1)); 
    token += characters[charIndex];
  }
  validTokens.push(token);

  return token;
} 

async function writeTalkerData(data) {
  try {
    const oldData = await readTalkerData();
    const dataWithId = { id: nextId, ...data };
  
    const allData = JSON.stringify([...oldData, dataWithId]);
    await fs.writeFile(path.resolve(__dirname, TALKERS_PATH), allData);

    nextId += 1;

    return dataWithId;
  } catch (err) {
    console.log(`Erro na escrita do arquivo: ${err}`);
  }
}

async function updateTalkerData(id, receivedData) {
  const talkerData = await readTalkerData();
  const updatedData = { id, ...receivedData };
  const updatedTalkerData = talkerData.reduce((allData, currentData) => {
    if (currentData.id === updatedData.id) return [...allData, updatedData];
    return [...allData, currentData];
  }, []);

  const jsonData = JSON.stringify(updatedTalkerData);
  try {
    await fs.writeFile(path.resolve(__dirname, TALKERS_PATH), jsonData);

    console.log(`Atualizou palestrante com o id ${id}`);
    return updatedData;
  } catch (err) {
    console.error(`Erro na escrita do arquivo ${err}`);
  }
}

module.exports = {
  validTokens,
  readTalkerData,
  readTalkerDataWithId,
  tokenGenerator,
  writeTalkerData,
  updateTalkerData,
};