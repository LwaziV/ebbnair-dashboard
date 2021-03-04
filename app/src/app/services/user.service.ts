import { Injectable } from '@angular/core';
import * as express from "express";
import * as bodyParser from "body-parser";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// var cors = require('cors')

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public app: express.Application;
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) {}
  countUsers() {
    return this.http.get<any>(`${this.BASE_URL}/user/allusers`);
  }

  getBookings() {
    return this.http.get<any>(`${this.BASE_URL}/user/allbookings`);
  }
}
