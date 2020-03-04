import { Router } from 'express';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../users/user.service';

/**
 * "auth" api router specifications
 * => API_URL/api/
 */
export class AuthRoute {
  private api: Router = Router();
  private authService: AuthenticationService;

  constructor() {
    this.authService = new AuthenticationService();
    this.routes();
  }

  /**
   * @return The application router/api
   */
  public getApi(): Router {
    return this.api;
  }

  /**
   * Define auth routes
   */
  private routes(): void {
    // Login user
    this.api.post('/authenticate', (req: any, res: any, next: any) => {
      this.authService
        .authenticate(req.body)
        .then(token => {
          // res.set({ Authorization: `Bearer ${token}` });
          // Send custom JSON object with token etc
          res.status(200).json(token);
        })
        .catch(err => {
          // Send 401 Unauthorized when authentication is required and has failed
          res.status(401).json({
            name: 'LoginError',
            message: err.message
          });
        });
    });
  }
}
