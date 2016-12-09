import { Router } from 'express';
import * as GymController from '../controllers/gym.controller';
const router = new Router();

/* Gyms */
// Get all Gyms
router.route('/gyms').get(GymController.getGyms);

// Get one gym by id
router.route('/gyms/:_id').get(GymController.getGym);

// Add a new gym
router.route('/gyms').post(GymController.addGym);

// Delete a gym by id
router.route('/gyms/:_id').delete(GymController.deleteGym);

// Update a gym by id
router.route('/gyms/:_id').put(GymController.updateGym);

/* To be developed, here for spec purposes */

// Add a new gym
router.route('/gyms').post(GymController.addGym);

export default router;
