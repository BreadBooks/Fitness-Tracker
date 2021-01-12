const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: { type: Date, default: Date.now },
    exercises: [
        {
            type: { type: String, required: "You must enter an exercise type" }, // add { trim: true } ?
            name: { type: String, required: "You must enter an exercise name"},
            duration: { type: Number, required: "You must enter a duration for the exercise"},
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }
    ]
});

// virtual setters. mongoose.schema.virtual
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