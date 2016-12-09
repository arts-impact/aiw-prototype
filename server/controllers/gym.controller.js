import Gym from '../models/gym';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all gyms
 * @param req
 * @param res
 * @returns void
 */
export function getGyms(req, res) {
  Gym.find().sort('-dateAdded').exec((err, gyms) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!gyms) {
      return res.sendStatus(404);
    }
    res.json({ gyms });
  });
}

/**
 * Save a gym
 * @param req
 * @param res
 * @returns void
 */
export function addGym(req, res) {
  if (!req.body.gym.name) {
    res.status(403).end();
  }

  const newGym = new Gym(req.body.gym);

  // Let's sanitize inputs
  newGym.name = sanitizeHtml(newGym.name);
  newGym.slug = slug(newGym.name.toLowerCase(), { lowercase: true });

  newGym.save((err, saved) => {
    // console.log(err, saved);
    if (err) {
      res.status(500).send(err);
    }
    res.json({ gym: saved });
  });
}

/**
 * Get a single gym
 * @param req
 * @param res
 * @returns void
 */
export function getGym(req, res) {
  Gym.findOne({ _id: req.params._id }).exec((err, gym) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!gym) {
      return res.sendStatus(404);
    }
    res.json({ gym });
  });
}

/**
 * Delete a gym
 * @param req
 * @param res
 * @returns void
 */
export function deleteGym(req, res) {
  Gym.findOne({ _id: req.params._id }).exec((err, gym) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!gym) {
      return res.sendStatus(404);
    }
    gym.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Update single gym
 * @param req
 * @param res
 * @returns void
 */
export function updateGym(req, res) {
  Gym.findOne({ _id: req.params.id }).exec((err, originalGym) => {
    if (err) {
      res.status(500).send(err);
    }

    // We got an existing gym. Update it
    const updates = new Gym(req.body.gym);

    // Drop the _id field if it's submitted. We don't want to overwrite that
    if (updates._id) delete updates._id;

    // Sanitize inputs
    updates.name = sanitizeHtml(updates.name);

    // Merge the objects
    const updatedGym = Object.assign(originalGym, updates);

    updatedGym.save((saveErr, saved) => {
      // console.log(saveErr, saved);
      if (saveErr) {
        res.status(500).send(saveErr);
      }
      res.json({ gym: saved });
    });
  });
}

