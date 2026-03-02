import Login from "../model/login.model.js"
import Workout from "../model/workout.model.js"
import mongoose from "mongoose"

export const addWorkoutService = async(data,user_id) => {
    console.log("data is " + data + user_id)
    let dataun = {...data}
    console.log(dataun)


    return  await Workout.create({...data,user : user_id})
}

// const exerciseSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     sets: {
//       type: [setSchema],
//       validate: v => v.length > 0,
//     },
//   },
//   { _id: false }
// );

export const calculatePr = async (exerciseName,user_id) => {
    const result =await Workout.aggregate([
        {$match : {user : new mongoose.Types.ObjectId(user_id)}},
        {$unwind : "$exercises"},
        {$match : {"exercises.name" : exerciseName.exercise}},
        {$unwind : "$exercises.sets"},
        {
            $group : {
                _id : null,
                maxWeight : {$max : "$exercises.sets.weight"}
            }
        }

    ])


    console.log(exerciseName)
    console.log(result)
    return result[0]?.maxWeight || 0;

}

export const calculateAllPr = async (user_id) => {
    const result =await Workout.aggregate([
        {$match : {user : new mongoose.Types.ObjectId(user_id)}},
        {$unwind : "$exercises"},
        {$unwind : "$exercises.sets"},
        {
            $group : {
                _id : "$exercises.name",
                maxWeight : {$max : "$exercises.sets.weight"}
            }
        },
    {
      $project: {
        _id: 0,
        exercise: "$_id",
        personalRecord: "$maxWeight"
      }
    },
    { $sort: { personalRecord: -1 } }

    ])



    console.log(result)
    return result;

}

