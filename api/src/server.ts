import app from "./config/app";
import * as dotenv from 'dotenv';
import DbClient from "./services/db-client";


dotenv.config();

const environment = app.settings.env || 'development';

const PORT = process.env.PORT;

DbClient.connect().then(() => {
  console.log("connected to the database");
  // Start the express server
  app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
  });
});






