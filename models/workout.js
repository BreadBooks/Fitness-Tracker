const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: { type: Date, default: Date.now },
    exercises: [
        {   type: { type: String, required: "Exercise type required." },
            name: { type: String, required: "Exercise name required"},
            duration: { type: Number, required: "Duration for exercise required."},
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ]
});

workoutSchema.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

workoutSchema.virtual("totalWeight").get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + (exercise.weight * exercise.reps * exercise.sets);
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;