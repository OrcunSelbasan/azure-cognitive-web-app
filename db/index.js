var dotenv = require('dotenv');
var MongoClient = require('mongodb').MongoClient;

dotenv.config();

const url = process.env.COSMOS_CONNECTION_STRING || process.env.CUSTOMCONNSTR_COSMOS_CONNECTION_STRING;
const client = new MongoClient(url);
const db = client.db('SampleDB')
const Translations = db.collection('Translations');

module.exports = Translations;