import { Router } from "express";
import { userController } from "../controllers/userController";
import { Middleware } from "../middleware/authMiddleware";


const middleware = new Middleware()

const router = Router()


const usercontroller = new userController()

router.post('/register' , usercontroller.registerUser)
router.post('/login', usercontroller.loginUser)
router.get('/userdetails' , middleware.authorize , usercontroller.getCurrentuser)
router.post('/generatepresigned', usercontroller.genPresignedURL)
router.put('/upateImage', middleware.authorize, usercontroller.updateProfileImage);
router.put('/updatename', middleware.authorize, usercontroller.updatename);
router.get('/courses' , middleware.authorize , usercontroller.getCourseDetails);

export default router