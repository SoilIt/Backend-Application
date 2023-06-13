const { Storage } = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(__dirname, './soilit-key.json');

//const { Storage } = Cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'soilit',
});

module.exports = storage;