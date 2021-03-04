import { ModificationNote } from './model';

export interface IUser {
  _id?: string;
  firstName: string;
  lastName?:string;
  email?: string;
  password?:string;
  orgId?:string,
  shortBio?:string,
  specialization?:string,
  calendarLink?:string;
  calendarAuthToken?:ICalAuthToken;
  availibility?:any;
  koodaId?:string;
  rate?:any;
  imgUrl?:string;
  bookable?:boolean;
  meetingLength?:number;
  bufferTime?:number;
  
}

export interface ICalAuthToken{
  type:string,
  data:any;
}