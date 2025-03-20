import mongoose, { Schema, Document } from "mongoose";

interface ICourse extends Document {
  name?: string;
  subject: string[];
  board: string;
  address?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  rating: number;
}

const CourseSchema: Schema = new Schema<ICourse>({
  name:
  {
    type: String

  },
  subject:
  {
    type: [String],
    required: true
  },
  board:
  {
    type: String,
    required: true
  },
  address:
  {
    type: String

  },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  rating:
  {
    type: Number,
    required: true
  },
});

CourseSchema.index({ location: "2dsphere" });

export default mongoose.model<ICourse>("Course", CourseSchema);
