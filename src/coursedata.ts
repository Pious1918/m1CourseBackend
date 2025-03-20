import mongoose, { Document } from "mongoose";
import courseModel from "./models/courseModel";



const courseList = [

    {
        subject: ["Science", "Humanities"],
        board: "CBSE",
        location: {
            type: "Point",
            coordinates: [80.2125, 13.0500], // Longitude first, then Latitude
        },

        name: " Vidyalaya Senior Secondary School",
        address: "238, Arcot Road, Vadapalani, Chennai, Tamil Nadu 600026",
        rating: 4.2

    },

    {
        subject: ["Science", "Commerce"],
        board: "CBSE",
        name: "Saraswathi Vidyalaya Senior Secondary School",
        address: "238, Arcot Road, Vadapalani, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2125, 13.0500], // Longitude first, then Latitude
        },

        rating: 5
    },

    {
        subject: ["Commerce", "Humanities", "Science"],
        board: "state",
        name: "Saraswathi Vidyalaya Senior Secondary School",
        address: "238, Arcot Road, Vadapalani, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2125, 13.0500], // Longitude first, then Latitude
        },

        rating: 3.2
    },
    {

        subject: ["Commerce", "Humanities"],
        name: "JRM CBSE School",
        address: "15/8, N Mada St, Vadapalani, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2100, 13.0515], // Longitude first, then Latitude
        },

        board: "CBSE",
        rating: 3.3
    },

    {
        name: "JRM state School",
        subject: ["Science"],
        address: "15/8, N Mada St, Vadapalani, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2100, 13.0515], // Longitude first, then Latitude
        },

        board: "State",
        rating: 5

    },

    {
        name: "Maharishi ICSE School",
        subject: ["Science", "Humanities"],
        address: "Thangal Karai, Dharan Singh Colony, Vadapalani, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2130, 13.0520], // Longitude first, then Latitude
        },

        board: "ICSE",
        rating: 4.5
    },

    {
        name: "Maharishi State School",
        subject: ["Humanities"],
        address: "Thangal Karai, Dharan Singh Colony, Vadapalani, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2130, 13.0520], // Longitude first, then Latitude
        },

        board: "State",
        rating: 4
    },

    {
        name: "JRK Matriculation School",
        subject: ["Science"],
        board: "CBSE",
        address: "Duraiswamy Road, Old No.31, New No.80, Chennai, Tamil Nadu 600026",
        location: {
            type: "Point",
            coordinates: [80.2150, 13.0530], // Longitude first, then Latitude
        },

        rating: 3.9
    },

    {
        name: "Chennai Higher Secondary School",
        subject: ["Commerce"],
        address: "240, Arcot Rd, Ganga Nagar, Trustpuram, Kodambakkam, Chennai, Tamil Nadu 600024",
        location: {
            type: "Point",
            coordinates: [80.2200, 13.0550], // Longitude first, then Latitude
        },

        board: "ICSE",
        rating: 4

    },
    {
        name: "St. Vincent’s Matriculation Higher Secondary School",
        subject: ["Science"],
        address: "Railway Colony, 24, 4th St, Collectorate Colony, Aminjikarai, Chennai, Tamil Nadu 600029",
        location: {
            type: "Point",
            coordinates: [80.2250, 13.0600], // Longitude first, then Latitude
        },

        board: "State",
        rating: 4.3
    },
    {
        name: "DAV Matriculation Higher Secondary School",
        subject: ["Humanities"],
        address: "Kamaraj Nagar 4th St, Kamarajar Nagar, NGO Colony, Choolaimedu, Chennai, Tamil Nadu 600094",
        location: {
            type: "Point",
            coordinates: [80.2300, 13.0650], // Longitude first, then Latitude
        },

        board: "State",
        rating: 4
    },
    {
        name: "Loyola Matriculation Higher Secondary School",
        address: "IV Cross Street, United India Colony, Kodambakkam, Chennai, Tamil Nadu 600024",
        location: {
            type: "Point",
            coordinates: [80.2350, 13.0700], // Longitude first, then Latitude
        },

        board: "ICSE",
        subject: ["Commerce", "Science"],
        rating: 4.8
    },
    {
        name: "Fatima Matriculation Higher Secondary School",
        address: "Viswanathapuram Main Road, Kodambakkam, Chennai, Tamil Nadu 600024",
        location: {
            type: "Point",
            coordinates: [80.2400, 13.0750], // Longitude first, then Latitude
        },

        board: "CBSE",
        subject: ["Science"],
        rating: 4.1
    },


    ////
    {
        name: "Government Higher Secondary School, Palayamkunnu",
        address: "Palayamkunnu, Varkala, Kerala, 695146",
        location: {
            type: "Point",
            coordinates: [76.7167, 8.7333], // Longitude first, then Latitude
        },

        board: "State",
        subject: ["Commerce", "Humanities"],
        rating: 4
    },
    {
        name: "Sacred Heart Higher Secondary School",
        address: "Changanacherry, Kerala, 686101",
        location: {
            type: "Point",
            coordinates: [76.5366, 9.4457], // Longitude first, then Latitude
        },

        board: "CBSE",
        subject: ["Commerce", "Humanities"],
        rating: 4.5
    },
    {
        name: "Girideepam Bethany Central School",
        address: "Bethany Hills, Kalathipady, Kottayam, Kerala, 686010",
        location: {
            type: "Point",
            coordinates: [76.5555, 9.5916], // Longitude first, then Latitude
        },

        board: "CBSE",
        subject: ["Humanities"],
        rating: 4
    },
    {
        name: "St George H S Central School",
        address: "George Hills, Kalathipady, Kottayam, Kerala, 686010",
        location: {
            type: "Point",
            coordinates: [76.5555, 9.5916], // Longitude first, then Latitude
        },

        board: "State",
        subject: ["Science"],
        rating: 4
    },
    {
        name: "Springfield High School",
        address: "Kothari, Kottayam, Kerala, 686010",
        location: {
            type: "Point",
            coordinates: [76.6281, 9.5345], // Longitude first, then Latitude
        },

        board: "State",
        subject: ["Science" , "Humanities"],
        rating: 2
    },
    {
        name: "St. Mary's Residential Public School",
        address: "Thiruvalla, Pathanamthitta, Kerala, 689103",
        location: {
            type: "Point",
            coordinates: [76.5741, 9.3846], 
        },

        board: "ICSE",
        subject: ["Commerce", "Humanities", "Science"],
        rating: 4
    }
]


const mongurl = process.env.MONGO_URL


const uploadData = async () => {
    try {
        await mongoose.connect(mongurl as string)

        await courseModel.insertMany(courseList)
        console.log("Course data uploaded successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error uploading data:", error);
        mongoose.connection.close();
    }
}

export default uploadData