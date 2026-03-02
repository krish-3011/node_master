import mongoose from "mongoose";

const { Schema } = mongoose;

const setSchema = new Schema(
  {
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    reps: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sets: {
      type: [setSchema],
      validate: v => v.length > 0,
    },
  },
  { _id: false }
);

const workoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },

    date: {
      type: Date,
      default: Date.now,
      index: true,
    },

    muscleGroup: {
      type: String,
      enum: ["chest", "back", "bicep", "legs"],
      required: true,
    },

    exercises: {
      type: [exerciseSchema],
      validate: v => v.length > 0,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

export default mongoose.model("Workout", workoutSchema);