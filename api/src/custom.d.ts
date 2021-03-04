import * as mongodb from 'mongodb';

declare module NodeJS {
  export interface Global {
    db: mongodb.MongoClient;

  }
}
