import { useWorkoutContext } from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {BsTrash} from 'react-icons/bs';

const WorkoutDetails = ({workout}) => {

    const { dispatch } = useWorkoutContext();

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
        })
        const json = await response.json();

        if(response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json});
        }
    };

    return (
        <div className="workout-details">
            <h2>{workout.title}</h2>
            <p>Repetitions : {workout.repetitions}</p>
            <p>Sets: {workout.sets}</p>
            <p>Weight : {workout.weight} kilos</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <button id="delete-btn" onClick={handleClick}><BsTrash/></button>
            
        </div>
    )
}


export default WorkoutDetails;