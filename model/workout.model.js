import mongoose, { Schema } from "mongoose";

const workoutSchema = new Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    date:{
        type : Date ,
        default : Date.now
    },
    muscleGroup:{type: String, enum:['chest','back','bicep','legs']},
    exercises:[{
        name:{type: String},
        sets:[{
            weight : {type : Number},
            reps : Number
        }]
    }],
});