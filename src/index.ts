import "reflect-metadata";
import * as bodyParser from "body-parser";
import cors from "cors";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer } from "inversify-express-utils";
// declare metadata by @controller annotation
import "./controllers/ExampleController";
import "./controllers/LoginController";
import { DatabaseService } from "./services/DatabaseService";
import { Connection, createConnection } from "typeorm";
import { AuthService } from "./services/AuthService";
import { User } from "./db/entity/User";

// set up container
let container = new Container();
createConnection()
  .then((connection: Connection) => {
    container.bind<Connection>(Connection).toDynamicValue((context) => {
      return connection;
    });
    container.bind<DatabaseService>(DatabaseService).to(DatabaseService);
    container.bind<AuthService>(AuthService).to(AuthService);

    let server = new InversifyExpressServer(container);

    server.setConfig((app) => {
      // add body parser
      app.use(
        bodyParser.urlencoded({
          extended: true,
        })
      );
      app.use(bodyParser.json());

      app.use(cors());
    });

    let app = server.build();
    app.listen(3000, () => {
      console.log("running");
    });
  })
  .catch((error) => console.log(error));
