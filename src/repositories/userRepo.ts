import {  IUser } from "../interfaces/user.interface";
import userModel from "../models/userModel";
import { BaseRepository } from "./baseRepo";


export class userRepository extends BaseRepository<any> {

    constructor() {
        super(userModel)
    }

    async createUser(userdata: Partial<IUser>): Promise<IUser | null> {
        console.log("new user at repo")
        return this.save(userdata)
    }

    async findbyEmail(email: string): Promise<IUser | null> {
        return await this.findOne({ email })
    }

    async getCurrentUser(userId: string) {
        return await this.findById(userId)
    }

   
    async updateProfilePic(userId: string, updateData: { profileImage: string }) {
        return this.updateById(userId, updateData);
    }


    async updateName(userId: string, updateData: { name: string }) {
        return this.updateById(userId, updateData);
    }


    async findUserById(userId: string) {
        return await userModel.findById(userId).select("location");
    }
}