import { Router } from 'express';
import User from '../models/user';
import { getApiBaseUrl } from '../utils/codespaces';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).lean();

    res.json({
      message: 'Users endpoint',
      apiBaseUrl: getApiBaseUrl(req),
      users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Unable to fetch users' });
  }
});

export default router;
