import express from 'express' 
import {logoutController, registerController} from '../controllers/authController.js'
import {loginController} from '../controllers/authController.js'
const router = express.Router() 
router.post('/signup',registerController) 
router.post('/login',loginController) 
router.post('/logout',logoutController) 
export default router 