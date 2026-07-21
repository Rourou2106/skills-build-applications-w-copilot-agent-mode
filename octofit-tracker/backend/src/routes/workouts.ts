import { Router } from 'express';
import Workout from '../models/workout';
import { getApiBaseUrl } from '../utils/codespaces';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find({}).lean();

    res.json({
      message: 'Workouts endpoint',
      apiBaseUrl: getApiBaseUrl(req),
      workouts
    });
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Unable to fetch workouts' });
  }
});

export default router;
