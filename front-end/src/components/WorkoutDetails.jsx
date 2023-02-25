const WorkoutDetails = ({workout}) => {
    return (
        <div className="workout-details">
            <h2>{workout.title}</h2>
            <p>Repetitions : {workout.repetitions}</p>
            <p>Sets: {workout.sets}</p>
            <p>Weight : {workout.weight} kilos</p>
            <p>{workout.createdAt}</p>
        </div>
    )
}


export default WorkoutDetails;