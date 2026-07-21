import { Router } from 'express';
import Team from '../models/team';
import { getApiBaseUrl } from '../utils/codespaces';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find({}).lean();

    res.json({
      message: 'Teams endpoint',
      apiBaseUrl: getApiBaseUrl(req),
      teams
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Unable to fetch teams' });
  }
});

export default router;
