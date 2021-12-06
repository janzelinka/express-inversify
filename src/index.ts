import "reflect-metadata";
import "./controllers/ExampleController";
import "./controllers/LoginController";
import "./controllers/UsersController";
import * as bodyParser from "body-parser";
import cors from "cors";
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { DatabaseService } from "./services/DatabaseService";
import { Connection, createConnection } from "typeorm";
import { AuthService } from "./services/AuthService";

let container = new Container();

(async function (container: Container) {
  const connection = await createConnection();

  container.bind<Connection>(Connection).toDynamicValue((context) => {
    return connection;
  });
  container.bind<DatabaseService>(DatabaseService).to(DatabaseService);
  container.bind<AuthService>(AuthService).to(AuthService);

  let server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      )
      .use(bodyParser.json())
      .use(cors());
  });

  server.build().listen(3000, () => {
    console.log("running");
  });
})(container);
