import * as mongodb from "mongodb";
import {environment} from "../environment";

export default class DbClient {
    public static db: mongodb.MongoClient;

    public static async connect() {
      const mongoUrl = environment.DB_CONNECTION_STRING;
      let connection = await mongodb.MongoClient.connect(mongoUrl,{ useUnifiedTopology: true, useNewUrlParser: true })
      this.db = connection.db("project-kooda");
      console.log("Connected to db");
      return this.db;
    }
}
