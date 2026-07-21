import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';
import { getApiBaseUrl } from '../utils/codespaces';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).lean();

    res.json({
      message: 'Leaderboard endpoint',
      apiBaseUrl: getApiBaseUrl(req),
      leaderboard
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Unable to fetch leaderboard' });
  }
});

export default router;
