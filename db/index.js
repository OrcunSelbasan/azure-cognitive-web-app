var dotenv = require('dotenv');
var MongoClient = require('mongodb').MongoClient;

dotenv.config();

const url = process.env.COSMOS_CONNECTION_STRING;
const client = new MongoClient(url);
const db = client.db('SampleDB')
const SampleCollection = db.collection('SampleCollection');

module.exports = SampleCollection;