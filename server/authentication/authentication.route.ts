import { Router } from 'express';
import { authenticate } from './authentication.service';

/**
 * "auth" api router specifications
 * => API_URL/api/
 */
const router = Router();

router.post('/authenticate', async (req: any, res: any, next: any) => {
  try {
    const token = await authenticate(req.body);
    // TODO: put token in database?
    res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      name: 'LoginError',
      message: err.message,
    });
  }
});

export default router;
