import { NextFunction, Request, Response, Router } from 'express';
import { IUser } from './user.model';
import { createUser, findAllUsers } from './user.service';

/**
 * "user" api router specifications
 * => API_URL/api/users/
 */
const router = Router();

// Create new user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser = await createUser(req.body);
    res.status(201).json({ payload: user });
  } catch (err) {
    next(err);
  }
});

// Get all users
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  findAllUsers()
    .then((value) => res.status(200).json({ payload: value }))
    .catch(next);
});

// NOT USED YET
// Get user by id
router.get(
  '/profile',
  // auth,
  // passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    res.send(req.body);
  }
);

export default router;
