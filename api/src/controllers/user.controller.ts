import { Request, Response } from 'express';
const fs = require('fs');
import { successResponse, failureResponse } from '../services/service';
import DbClient from '../services/db-client';
import * as moment from 'moment';
import * as _ from 'underscore';


export const countUsers = async (req: Request, res: Response) => {
  let timestamp;
  let readableDate;
  let dates = [];
  try {
    DbClient.db
      .collection('user')
      .find({})
      .toArray()
      .then((result: any) => {
          result.forEach(user => {
            timestamp = user._id.getTimestamp();
            // convert datetime to readable dates
            readableDate = moment(timestamp).local().format('YYYY/MM/DD');
            dates.push(readableDate);
          });
          dates.sort();
          let grouped = dates.reduce((r, v, i, a) => {
            if (v === a[i - 1]) {
              r[r.length - 1].push(v);
            } else {
              r.push(v === a[i + 1] ? [v] : [v]);
            }
            return r;
          }, []);
          let finalData=[];
          let total=0;
          grouped.forEach((x)=>{
            total+=x.length;
            let dateObject= {"name":x[0],'count':(total)}
            finalData.push(dateObject);
          });
          successResponse('Got user', finalData, res);
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};


export const getBookings = async (req: Request, res: Response) => {
  let timestamp;
  let readableDate;
  let dates = [];
  try {
    DbClient.db
      .collection('bookings')
      .find({})
      .toArray()
      .then((result: any) => {
        result.forEach(booking => {
          //console.log(booking);
        try {
           timestamp = booking._id.getTimestamp();
        } catch (error) {
          return;
        }
          // convert datetime to readable dates
          readableDate = moment(timestamp).format('YY')+moment(timestamp).week();
          dates.push(readableDate); 
        });
        dates.sort();
        let grouped = dates.reduce((r, v, i, a) => {
          if (v === a[i - 1]) {
            r[r.length - 1].push(v);
          } else {
            r.push(v === a[i + 1] ? [v] : [v]);
          }
          return r;
        }, []);
        let finalData=[];
        let total=0;
        grouped.forEach((x)=>{
          total+=x.length;
          let dateObject= {"name":x[0],'count':(total)}
          finalData.push(dateObject);
        });
        successResponse('Got bookings', finalData, res);
      });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
