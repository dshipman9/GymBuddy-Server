const { gql } = require('apollo-server');

const typeDefs = gql`
  type Workout {
    _id: ID!
    exercises: [String]!
    workTime: Int!
    restTime: Int!
    numberOfRounds: Int!
    completedAt: String!
  }

  type Query {
    workouts: [Workout]!
    workout(id: ID!): Workout
  }

  type Mutation {
    createWorkout(exercises: [String]!, workTime: Int!, restTime: Int!, numberOfRounds: Int!, completedAt: String!): Workout
    updateWorkout(id: ID!, exercises: [String], workTime: Int!, restTime: Int!, numberOfRounds: Int!): Workout
    deleteWorkout(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
