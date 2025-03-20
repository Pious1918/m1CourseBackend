import { Request, Response } from "express"
import { IUser, IUserdata } from "../interfaces/user.interface"
import { UserService } from "../services/userService"
import { StatusCode } from "../enums/statuscode.enums"
import { generateToken } from "../utils/jwtHelper"
import IAuthRequest from "../middleware/authMiddleware"
import { generatepresigned } from "../utils/genPresigned"


export class userController {


  private __userservice: UserService

  constructor() {
    this.__userservice = new UserService()
  }

  public registerUser = async (req: Request, res: Response) => {

    try {
      const { name, email, password, latitude, longitude, cityname } = req.body
      const userData: IUser = {
        name: name,
        email: email,
        password: password,
        latitude: latitude,
        longitude: longitude,
        cityname: cityname,
        location: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      }

      console.log("userdatat is ", userData)

      const result = await this.__userservice.registerUser(userData)

      if (result.success) {
        res.status(200).json({ success: true, message: result.message, data: result.data })
      } else {
        res.status(400).json({ success: false, message: result.message })
      }

    } catch (error) {
      console.error("Error registering the user:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }


  public loginUser = async (req: Request, res: Response): Promise<void> => {

    try {

      const { email, password } = req.body.loginData
      const userData: IUserdata = {
        email: email,
        password: password
      }
      const result = await this.__userservice.loginUser(userData)

      if (!result.success) {
        res.status(StatusCode.BadRequest).json({ message: result.message })
      }
      else {
        const token = generateToken({ userId: result.data?.userId, name: result.data?.name, email: result.data?.email })
        res.status(StatusCode.OK).json({ success: result.success, message: result.message, token })
      }

    } catch (error) {
      console.error("Error in loginUser:", error);
      res.status(StatusCode.InternalServerError).json({ message: "An error occurred" });
    }
  }


  public getCurrentuser = async (req: IAuthRequest, res: Response): Promise<void> => {

    try {
      const userId = req.user?.userId

      if (!userId) {
        res.status(StatusCode.NotFound).json({ message: 'No such user' })
        return
      }

      const currentUser = await this.__userservice.getCurrentuserDetails(userId)
      res.json({ success: true, data: currentUser });


    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(StatusCode.InternalServerError).json({ success: false, message: "Internal Server Error" });
    }
  }


  public genPresignedURL = async (req: Request, res: Response) => {
    const { fileName, fileType } = req.body
    try {
      const presignedURL = await generatepresigned(fileName, fileType)
      res.json({ presignedURL })
    } catch (error) {
      console.error("Error in presignedurl:", error);
      res.status(StatusCode.InternalServerError).json({ message: "An error occurred" });
    }
  }



  public updateProfileImage = async (req: IAuthRequest, res: Response) => {
    const { s3Url } = req.body;
    try {

      const userId = req.user?.userId;

      if (!userId) {
        res.status(StatusCode.NotFound).json({ message: 'No such user' })
        return
      }

      const updateUser = await this.__userservice.updateProfilePicture(userId, s3Url)
      res.status(StatusCode.OK).json({ success: true });
    } catch (error: any) {
      console.error('Error updating story:', error.message);
      res.status(StatusCode.InternalServerError).json({ success: false, message: error.message });
    }
  };



  public updatename = async (req: IAuthRequest, res: Response) => {
    const { name } = req.body;
    try {

      const userId = req.user?.userId;

      if (!userId) {
        res.status(StatusCode.NotFound).json({ message: 'No such user' })
        return
      }

      const updateUser = await this.__userservice.updateUsername(userId, name)
      res.status(StatusCode.OK).json({ success: true });
    } catch (error: any) {
      console.error('Error updating story:', error.message);
      res.status(StatusCode.InternalServerError).json({ success: false, message: error.message });
    }
  };

  public getCourseDetails = async (req: IAuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(StatusCode.NotFound).json({ message: 'No such user' });
        return
      }

      const board = req.query.board as string; 
      const miles = req.query.miles ? parseInt(req.query.miles as string, 10) : 10; 
      const courses = await this.__userservice.getCoursesNearUser(userId, board, miles);
      res.status(StatusCode.OK).json(courses);
    } catch (error: any) {
      console.error('Error fetching courses:', error.message);
      res.status(StatusCode.InternalServerError).json({ success: false, message: error.message });
    }
  };




}