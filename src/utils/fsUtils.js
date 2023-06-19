const fs = require('fs').promises;
const path = require('path');

const TALKERS_PATH = '../talker.json';

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

module.exports = {
  readTalkerData,
  readTalkerDataWithId,
};