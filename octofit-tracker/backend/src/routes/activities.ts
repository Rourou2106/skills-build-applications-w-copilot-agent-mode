import { Router } from 'express';
import Activity from '../models/activity';
import { getApiBaseUrl } from '../utils/codespaces';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find({}).lean();

    res.json({
      message: 'Activities endpoint',
      apiBaseUrl: getApiBaseUrl(req),
      activities
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Unable to fetch activities' });
  }
});

export default router;
