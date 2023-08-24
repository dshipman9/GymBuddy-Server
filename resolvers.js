const { ObjectId } = require('mongodb');

const resolvers = (collection) => ({
  Query: {
    workouts: async () => {
      return await collection.find({}).toArray();
    },
    workout: async (_, { id }) => {
      return await collection.findOne({ _id: ObjectId(id) });
    },
  },
  Mutation: {
    createWorkout: async (_, { exercises, workTime, restTime, numberOfRounds, completedAt }) => {
      const result = await collection.insertOne({ exercises, workTime, restTime, numberOfRounds, completedAt });
      return { _id: result.insertedId, exercises, workTime, restTime, numberOfRounds, completedAt };
    },
    updateWorkout: async (_, { id, exercises, workTime, restTime, numberOfRounds }) => {
      const updatedWorkout = {};
      if (exercises) updatedWorkout.exercises = exercises;
      if (workTime) updatedWorkout.workTime = workTime;
      if (restTime) updatedWorkout.workTime = restTime;
      if (numberOfRounds) updatedWorkout.workTime = numberOfRounds;

      const result = await collection.findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: updatedWorkout },
        { returnOriginal: false }
      );

      return result.value;
    },
    deleteWorkout: async (_, { id }) => {
      const result = await collection.deleteOne({ _id: ObjectId(id) });
      return result.deletedCount === 1;
    },
  },
});

module.exports = resolvers;
