const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(url);
  database = client.db("online-shop");
}

function getDB() {
  if (!database) {
    throw new Error("You must connect first!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDB: getDB,
};
