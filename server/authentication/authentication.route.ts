import { Router } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../users/user.service';

/**
 * "auth" api router specifications
 * => API_URL/api/
 */
const router = Router();

const authService = new AuthenticationService();

/**
 * Authenticate with
 */
router.post('/authenticate', async (req: any, res: any, next: any) => {
  try {
    const token = await authService.authenticate(req.body);
    // res.set({ Authorization: `Bearer ${token}` });
    // Send custom JSON object with token etc
    res.status(200).json(token);
  } catch (err) {
    // Send 401 Unauthorized when authentication is required and has failed
    res.status(401).json({
      name: 'LoginError',
      message: err.message,
    });
  }
});

export default router;
