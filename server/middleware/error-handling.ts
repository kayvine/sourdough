import { EmailAlreadyExistsException } from '../exceptions/emailalreadyexists.exception';

export const errorHandling = (error: any, req: any, res: any, next: any) => {
  if (error instanceof EmailAlreadyExistsException) {
    console.error(error.toString());
    res.status(error.status).json({
      name: error.name,
      message: error.message
    });
  } else {
    next(error);
  }
};
