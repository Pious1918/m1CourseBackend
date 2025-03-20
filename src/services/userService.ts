
import bcrypt from 'bcryptjs'
import { IUser, IUserdata } from '../interfaces/user.interface'
import { userRepository } from '../repositories/userRepo'
import { courseRepository } from '../repositories/courseRepo'

export class UserService {

    private __userRepository: userRepository
    private _courseRepository: courseRepository

    constructor() {
        this.__userRepository = new userRepository(),
            this._courseRepository = new courseRepository()
    }


    async registerUser(userdata: IUser) {

        try {
            const existingUser = await this.__userRepository.findbyEmail(userdata.email)

            if (existingUser) {
                return { success: false, message: "user already exists" }
            }
            const hashPassword = await bcrypt.hash(userdata.password, 10)
            const newUser = await this.__userRepository.createUser({
                name: userdata.name,
                email: userdata.email,
                password: hashPassword,
                latitude: userdata.latitude,
                longitude: userdata.longitude,
                cityname: userdata.cityname,
                location: {
                    type: "Point",
                    coordinates: [userdata.longitude, userdata.latitude]
                }
            })

            console.log("newuser @services")
            return { success: true, message: "User Registered successfully", data: newUser }
        } catch (error) {
            console.error("Error in registerUser", error)
            throw new Error("Failed to register user")
        }
    }


    async loginUser(loginData: IUserdata) {

        try {

            const existingUser: any = await this.__userRepository.findbyEmail(loginData.email)
            if (!existingUser) {
                console.log("no such user")
                return { success: false, message: 'Ivalid Email' }
            }

            const validpassword = await bcrypt.compare(loginData.password, existingUser.password)

            if (!validpassword) {
                return { success: false, message: "Invalid Password" };
            }
            const payload = { userId: existingUser._id, email: existingUser.email, name: existingUser.name }
            return {
                success: true,
                message: "Login Successfull",
                data: payload
            }


        } catch (error) {

            console.error("Error in loginUser service", error)
            throw new Error("Service error occured")
        }
    }


    async getCurrentuserDetails(userId: string) {
        try {
            return await this.__userRepository.getCurrentUser(userId)
        } catch (error) {
            console.error("Error in service layer:", error);
            throw error;
        }
    }


    async updateProfilePicture(userId: string, s3Url: string): Promise<any> {
        try {
            const updatedUser = await this.__userRepository.updateProfilePic(userId, { profileImage: s3Url });
            return updatedUser;
        } catch (error) {
            throw new Error('Error updating profile image');
        }
    }


    async updateUsername(userId: string, name: string): Promise<any> {
        try {
            const updatedUser = await this.__userRepository.updateName(userId, { name: name });
            return updatedUser;
        } catch (error) {
            throw new Error('Error updating profile image');
        }
    }



    async getCoursesNearUser(userId: string, board: string, miles: number) {
        try {

            const user = await this.__userRepository.findUserById(userId);
            if (!user || !user.location) {
                return [];
            }

            // Converting miles to meters
            const maxDistanceMeters = miles * 1609.34;
            return await this._courseRepository.findCoursesNearLocation(user.location.coordinates, board, maxDistanceMeters);
        } catch (error) {
            console.error("Error in getCoursesNearUser:", error);
            throw new Error("Failed to fetch courses near user");
        }
    }


}