import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Gym from '../gym';
import gyms from '../../mockups/Gyms';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial gyms added into test db
// const gyms = [
//   new Gym({
//     name: 'A dummy centre 1',
//     centreLogo: '',
//     centreMap: '',
//     climbingTargetMinAge: 2,
//     climbingTargetMaxAge: 10,
//     boulderingTargetMinAge: 1,
//     boulderingTargetMaxAge: 8,
//     climbingGradeSystem: 'French',
//     boulderingGradeSystem: 'Hueco',
//     holdColours: 'A bunch of stuff',
//     showSetterOnRouteCard: true,
//     showDateSetOnRouteCard: true,
//     allowEditingOfDateSet: true,
//     publishPublicPage: false,
//     slug: 'dummy-centre-1',
//     _id: 'ae8tryu3498urw9ujsdfjws',
//     lines: [
//       {
//         _id: 'ciuzfy57v0000hcv5oaf9snal',
//         slug: 'im-a-line',
//         name: 'I\'m a line',
//         yCoord: 1,
//         xCoord: 1,
//         __v: 0,
//         dateAdded: '2016-11-01T11:58:47.272Z',
//       },
//       {
//         _id: 'ciuzfy57v0000hcv5oaf9snam',
//         slug: 'im-another-line',
//         name: 'I\'m another line',
//         yCoord: 1,
//         xCoord: 1,
//         __v: 0,
//         dateAdded: '2016-11-01T11:58:47.272Z',
//       },
//     ],
//   }),
//   new Gym({
//     name: 'A dummy centre 2',
//     centreLogo: '',
//     centreMap: '',
//     climbingTargetMinAge: 2,
//     climbingTargetMaxAge: 10,
//     boulderingTargetMinAge: 1,
//     boulderingTargetMaxAge: 8,
//     climbingGradeSystem: 'French',
//     boulderingGradeSystem: 'Hueco',
//     holdColours: 'A bunch of stuff',
//     showSetterOnRouteCard: true,
//     showDateSetOnRouteCard: true,
//     allowEditingOfDateSet: true,
//     publishPublicPage: false,
//     slug: 'dummy-centre-1',
//     _id: 'ae8tryu3498urw9ujsdfjwz',
//     lines: [
//       {
//         _id: 'ciuzfy57v0000hcv5oaf9snan',
//         slug: 'im-a-line',
//         name: 'I\'m a line',
//         yCoord: 1,
//         xCoord: 1,
//         __v: 0,
//         dateAdded: '2016-11-01T11:58:47.272Z',
//       },
//       {
//         _id: 'ciuzfy57v0000hcv5oaf9snao',
//         slug: 'im-another-line',
//         name: 'I\'m another line',
//         yCoord: 1,
//         xCoord: 1,
//         __v: 0,
//         dateAdded: '2016-11-01T11:58:47.272Z',
//       },
//     ],
//   }),
// ];

// test.beforeEach('connect and add two gym entries', t => {
//   connectDB(t, () => {
//     Gym.create(gyms, err => {
//       if (err) t.fail('Unable to create gyms');
//       console.log('Created gyms');
//     });
//   });
// });

test.beforeEach('connect and add two gym entries', async t => {
  await connectDB(t);
  await Gym.create(gyms)
  .then(() => console.log('Created gyms'))
  .catch((err) => {
    console.log(err);
    t.fail('Unable to create gyms');
  });
});

// test.after('Clean this shizzle up (drop any DBs)', t => {
//   // Drop the database if it already exists. It seems to sometimes...
//   dropDB(t);
//   console.log('Cleaned shizzle up. Makes sure that we dropped DBs');
// })

test.afterEach.always(t => {
  dropDB(t);
  console.log('Dropped DB');
});

test.after.always('Clean things up', t => {
  dropDB(t);
});

test.serial('Should correctly give number of Gyms', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/gyms')
    .set('Accept', 'application/json');

  // console.log(`Status: ${res.status}`);
  // console.log(res.body);
  t.is(res.status, 200);
  t.deepEqual(gyms.length, res.body.gyms.length);
});

test.serial('Should send correct data when queried against a _id', async t => {
  t.plan(2);

  const gym = new Gym({
    name: 'Foo bar',
    centreLogo: '',
    centreMap: '',
    climbingTargetMinAge: 2,
    climbingTargetMaxAge: 10,
    boulderingTargetMinAge: 1,
    boulderingTargetMaxAge: 8,
    climbingGradeSystem: 'French',
    boulderingGradeSystem: 'Hueco',
    holdColours: 'A bunch of stuff',
    showSetterOnRouteCard: true,
    showDateSetOnRouteCard: true,
    allowEditingOfDateSet: true,
    publishPublicPage: false,
    slug: 'foobar',
    _id: 'f34gb2bh24b24b2',
    dateAdded: Date.now(),
  });

  gym.save();

  const res = await request(app)
    .get('/api/gyms/f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.gym.name, gym.name);
});

test.serial('Should correctly add a gym', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/gyms')
    .send({ gym:
    {
      name: 'Foo bar',
      centreLogo: '',
      centreMap: '',
      climbingTargetMinAge: 2,
      climbingTargetMaxAge: 10,
      boulderingTargetMinAge: 1,
      boulderingTargetMaxAge: 8,
      climbingGradeSystem: 'French',
      boulderingGradeSystem: 'Hueco',
      holdColours: 'A bunch of stuff',
      showSetterOnRouteCard: true,
      showDateSetOnRouteCard: true,
      allowEditingOfDateSet: true,
      publishPublicPage: false,
    },
  })
  .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedGym = await Gym.findOne({ name: 'Foo bar' }).exec();
  t.is(savedGym.boulderingGradeSystem, 'Hueco');
});

test.serial('Should correctly delete a gym', async t => {
  t.plan(2);

  const gym = new Gym({
    name: 'Foo bar',
    centreLogo: '',
    centreMap: '',
    climbingTargetMinAge: 2,
    climbingTargetMaxAge: 10,
    boulderingTargetMinAge: 1,
    boulderingTargetMaxAge: 8,
    climbingGradeSystem: 'French',
    boulderingGradeSystem: 'Hueco',
    holdColours: 'A bunch of stuff',
    showSetterOnRouteCard: true,
    showDateSetOnRouteCard: true,
    allowEditingOfDateSet: true,
    publishPublicPage: false,
    slug: 'foobar',
    _id: 'f34gb2bh24b24b2',
    dateAdded: Date.now(),
  });

  const savedGym = await gym.save();

  const res = await request(app)
    .delete(`/api/gyms/${savedGym._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedGym = await Gym.findOne({ _id: savedGym._id }).exec();
  t.is(queriedGym, null);
});

/* This stuff is working when using test.only, but isn't happy about being run
serially in the rest of a plan. */

// test.only('Should correctly get a single line', async t => {
//   t.plan(2);
//   const res = await request(app)
//     .get('/api/lines/ciuzfy57v0000hcv5oaf9snal')
//     .set('Accept', 'application/json');
//   // console.log(res.body);
//   t.is(res.status, 200);
//   t.is(res.body.name, 'I\'m a line');
// });

// test.serial('Should correctly add a line', async t => {
//   const res = await request(app)
//     .post('/api/gyms/ae8tryu3498urw9ujsdfjwz/lines')
//     .send({ line:
//     {
//       name: "I'm a test line",
//       yCoord: 1,
//       xCoord: 1,
//     },
//     })
//     .set('Accept', 'application/json');

//   t.is(res.status, 200);

//   const savedGym = await Gym.findOne({ _id: 'ae8tryu3498urw9ujsdfjwz' }).exec();
//   t.is(savedGym.lines[savedGym.lines.length - 1].name, "I'm a test line");
// });

// test.serial('Should correctly get the number of lines at a gym', async t => {
//   t.plan(2);
//   const res = await request(app)
//     .get('/api/gyms/ae8tryu3498urw9ujsdfjwz/lines')
//     .set('Accept', 'application/json');

//   t.is(res.status, 200);
//   // console.log(res.body);
//   t.deepEqual(gyms[0].lines.length, res.body.length);
// });

