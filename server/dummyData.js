import Gym from './models/gym';
import GymsMockup from './static-models/Gyms.json';

export default function () {
  Gym.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    // const Gyms = [];

    // GymsMockup.forEach((GymMockup) => {
    //   Gyms.push(GymMockup);
    // });

    Gym.create(GymsMockup, (error) => {
      if (!error) {
        console.log('Gyms ready to go');
      } else {
        console.log(error);
      }
    });
  });
}
