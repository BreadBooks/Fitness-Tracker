const db = require("../models");

module.exports = (app) => {
    app.get("/api/workouts", (request, response) => {
        db.Workout.find({})
        .then((dbWorkouts) => { response.json(dbWorkouts); })
        .catch((err) => response.json(err));
    });

    app.get("/api/workouts/range", (request, response) => {
        db.Workout.find({}).limit(7) // finds 7 most recent (since organized by date)
        .then((dbWorkouts) => { response.json(dbWorkouts) })
        .catch((err) => { response.json(err) });
    });

    app.post("/api/workouts", (request, response) => {
        db.Workout.create({})
        .then((workout) => { response.json(workout); })
        .catch((err) => { response.json(err); });
    });

    app.put("/api/workouts/:id", (request, response) => {
        db.Workout.findByIdAndUpdate(request.params.id, {$push: { exercises: request.body }}, { new: true, runValidators: true })
        .then((update) => { response.json(update); })
        .catch((err) => { response.json(err) });
    });

    app.delete("/api/workouts", (request, response) => {
        db.Workout.findByIdAndDelete(request.body.id)
        .then(() => { response.json(true) })
        .catch((err) => { response.json(err) });
    });
};