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

module.exports = {
  readTalkerData,
};