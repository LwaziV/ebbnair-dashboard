import { Application, Request, Response, Router } from 'express';
import { UserController } from '../controllers';


export const router = Router({
    strict: true,
  });

router.get('/allusers', UserController.countUsers);

router.get('/allbookings', UserController.getBookings);


