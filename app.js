const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { MongoClient } = require('mongodb');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function run() {
  const uri =
    "mongodb+srv://david:Password9@workouts.aionufn.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const dbName = "workouts";
  const collectionName = "favourites";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(collection),
  });

  const app = express();
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}
run().catch(console.dir);
