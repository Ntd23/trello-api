import express from "express";
import cors from "cors";
import exitHook from "async-exit-hook";
import { CONNECT_DB, GET_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware.js";
import { corsOptions } from "./config/cors";
const START_SERVER = () => {
  const app = express();
  app.use(cors(corsOptions));

  app.use(express.json()); //enable req data json

  //use api v1
  app.use("/v1", APIs_V1);

  // middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware);

  app.get("/", (req, res) => {
    res.end("<h1>Hello World!</h1><hr>");
  });
  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      console.log(`Living at production port ${process.env.PORT}`);
    });
  } else {
    console.log(env.BUILD_MODE);

    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT} by author ${env.AUTHOR}`
      );
    });
  }

  exitHook(() => {
    CLOSE_DB();
  });
};

(async () => {
  try {
    await CONNECT_DB();
    START_SERVER();
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
})();
