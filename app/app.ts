import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from 'morgan';
import * as swagger from "swagger-express-ts";
import * as mongoose from 'mongoose';
import { Settings } from "./settings/conf";
import * as cors from 'cors';
import categoryRoutes from "./routes/category.routes";
import serviceRoutes from "./routes/services.routes";
import userProfileRoutes from "routes/user.profile.routes";

class App {

  public app: express.Application;


  constructor() {
    this.app = express();
    this.middleware();
    this.database();
    this.routes();
  }

  /** Database configuration. */
  private database(): void {
    mongoose.connect(Settings.database_uri)
      .then(() => console.log('Connected to database'))
      .catch(err => console.log(err));
  }

  private middleware() {
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/api-docs/swagger', express.static('swagger'));
    this.app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
  }

  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    //options for cors midddleware
    const options: cors.CorsOptions = {
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
      credentials: true,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    };
    router.use(cors(options));
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hey heroe'
      });
    });
    this.app.use('/', router);
    this.app.use('/api/user', userProfileRoutes);
    this.app.use(`/api/category`, categoryRoutes);
    this.app.use(`/api/service`, serviceRoutes);
    router.options("*", cors(options));
  }


}

export default new App().app;