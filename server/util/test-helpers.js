import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export function connectDB(t) {
  return new Promise((resolve, reject) => {
    // const testDbId = `test-${cuid()}`;
    const testDbId = 'climbrs-test';
    process.env.MONGO_URL = `mongodb://localhost:27017/${testDbId}`;
    mockgoose(mongoose).then(() => {
      mongoose.createConnection(testDbId, err => {
        if (err) {
          t.fail('Unable to connect to test database');
          reject(err);
        }
        resolve(`Connected to DB ${testDbId}`);
      });
    });
  });
}

// export function connectDB(t) {
//   return new Promise(function(resolve,reject){
//     mockgoose(mongoose).then(() => {
//       mongoose.createConnection('mongodb://localhost:27017/mern-test', err => {
//         if (err){
//           t.fail('Unable to connect to test database');
//           reject(err);
//         }
//         resolve('Connected to DB');
//       });
//     });
//   });
// }

// export function connectDB(t, done) {
//   mockgoose(mongoose).then(() => {
//     mongoose.createConnection('mongodb://localhost:27017/mern-test', err => {
//       if (err) t.fail('Unable to connect to test database');
//       done();
//     });
//   });
// }

export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}
