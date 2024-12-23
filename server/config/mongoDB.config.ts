import mongoose from 'mongoose';

import Env from './env.config';

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_DATABASE,
  SERVER_ENV,
  MONGODB_HOST,
  MONGODB_PORT,
} = Env;

console.log(MONGODB_USER, MONGODB_PASSWORD)
let url = '';

url = `mongodb://localhost:27017`;

const connectToMongoDB = () => {
  mongoose.connect(url);
  mongoose.connection.on('connected', () => {
    console.log('Connected Successfully To Database ');
  });
  mongoose.connection.on('error', (err) => {
    console.error(`Failed To Database : ${err}`);
  });
};

// const connectToMongoDB = async () => {
//   console.log(`DB URL: ${url}`);
//   await mongoose.connect(url);
//   mongoose.connection.on('connected', () => {
//     console.log('Connected successfully to MongoDB ');
//   });
//   mongoose.connection.on('error', (err) => {
//     console.error(`Fail to connect to MongoDB : ${err}`);
//   });
// };

export const closeMongoDB = async () => {
  await mongoose.connection.close();
};

export default connectToMongoDB;