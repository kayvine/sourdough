import { NextFunction, Request, Response, Router } from 'express';
import { IUser } from './user.model';
import { UserService } from './user.service';

/**
 * "user" api router specifications
 * => API_URL/api/users/
 */
export class UserRoute {
  private api: Router = Router();

  constructor(private userService: UserService) {
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define user routes
   */
  private routes(): void {
    // Create new user
    this.api.post('/', (req: Request, res: Response, next: NextFunction) => {
      const user: IUser = req.body;
      this.userService
        .createUser(user)
        .then((value) => res.status(201).json({ payload: value }))
        .catch(next);
    });

    // Get all users
    this.api.get('/', (req: Request, res: Response, next: NextFunction) => {
      this.userService
        .findAllUsers()
        .then((value) => res.status(200).json({ payload: value }))
        .catch(next);
    });

    // NOT USED YET
    // Get user by id
    this.api.get(
      '/profile',
      // auth,
      // passport.authenticate('jwt', { session: false }),
      (req: Request, res: Response, next: NextFunction) => {
        res.send(req.user);
      }
    );
  }
}
