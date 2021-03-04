import { router as commonRouter } from './common.router'
import { router as userRouter } from "./user.router"

import { Router } from "express";

const router = Router()

// Real Routes
router.use('/user', userRouter)


// This has to be the last route
// This router is responsible for all errors and routes that are not found
router.use(commonRouter)

export default router
