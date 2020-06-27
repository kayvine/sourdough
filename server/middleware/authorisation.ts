import { verify, Secret } from 'jsonwebtoken';

interface AuthOptions {
  whitelist: string[];
}

export default ({ whitelist }: AuthOptions) => (req: any, res: any, next: any) => {
  if (whitelist.some((path: string) => req.path.startsWith(path))) {
    next();
  }

  if (req.header('Authorization') && req.header('Authorization').split(' ')[1]) {
    const token = req.header('Authorization').replace('Bearer ', '');

    verify(token, process.env.SECRET as Secret, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ error: 'Could not verify the token', err });
      }
      if (!decoded) {
        res.status(401).json({ error: 'Not authorized to access this resource' });
      } else {
        req.token = token;
        next();
      }
    });
  } else {
    res.status(401).send({ error: 'No Authorization header with Bearer token' });
  }
};
