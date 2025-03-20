import {  IUser } from "../interfaces/user.interface";
import courseModel from "../models/courseModel";
import { BaseRepository } from "./baseRepo";


export class courseRepository extends BaseRepository<any> {

    constructor() {
        super(courseModel)
    }


    async findCoursesNearLocation(userCoordinates: number[], board: string, maxDistance: number) {
        const query: any = {
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: userCoordinates
                    },
                    $maxDistance: maxDistance 
                }
            }
        };
    
        
        if (board && board.trim() !== "") {
            query.board = board;
        }
    
        return await courseModel.find(query);
    }
    
    
  
}