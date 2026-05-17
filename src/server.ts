import { Server } from "http";
import app from "./app";
import env from "./config/env";

let server: Server;

const bootstrap = async () => {
  try {
    server = app.listen(env.port, () => {
      console.log(`Server is running on port ${env.port}`);
    });
  } catch (error) {
    console.log("Error starting server");
  }
};

(async () => {
  await bootstrap();
})();


