import { IUser } from './user.model';
import { UserService } from './user.service';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser(req: any, res: any, next: any) {
    const user: IUser = req.body;
    this.userService
      .createUser(user)
      .then(response => {
        res.status(201).send(response);
      })
      .catch(next);
  }

  public getAllUsers(req: any, res: any, next: any) {
    this.userService
      .findAllUsers()
      .then(value => {
        res.status(200).send(value);
      })
      .catch(next);
  }
}
