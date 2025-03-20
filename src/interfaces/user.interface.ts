export interface IUser{
    name:string;
    email:string;
    password:string;
    profileImage?:string
    latitude: number,
    longitude: number,
    cityname?: string
    location?: {
        type: "Point";
        coordinates: [number, number]; 
      };
}

export interface IUserdata{
    
    email:string;
    password:string;

}

export interface IusePayload{
    _id?:any,
    userId:string,
    name:string,
    email:string
}
