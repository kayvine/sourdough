require('dotenv').config();
import environment from './config/environment';
import express from './config/express';
// import log from "./logger/log";
import { Express } from 'express';
import { IndexRoute } from './routes/index.route';
import { errorHandling } from './middleware/errorhandling';
require('./config/mongoose');

class App {
  private readonly app: Express;
  private indexRoute: IndexRoute;

  constructor() {
    this.app = express;
    this.indexRoute = new IndexRoute();
    this.routes();
    this.listen();
  }

  /**
   * @return Express application
   */
  public getApp(): Express {
    return this.app;
  }

  /**
   * Define Routes and error handling middleware
   */
  private routes(): void {
    // Routes middleware
    this.app.use('/api', this.indexRoute.getApi());

    // Error handler middleware
    this.app.use(errorHandling);

    this.app.use((error: any, req: any, res: any, next: any) => {
      res.status(error.status || 500);
      res.json({
        name: error.name || '',
        message: error.message,
        status: error.status || 500
      });
      // log.error(error.toString());
      console.error(error.toString());
    });
  }

  /**
   * Start application server
   */
  private listen(): void {
    this.app.listen(environment.PORT, () => {
      console.log(
        `Started on http://${environment.API_URL}:${environment.PORT}`
      );
    });
  }
}

export default new App().getApp();
