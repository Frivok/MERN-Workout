import {useWorkoutContext} from '../hooks/useWorkoutContext';
import {useAuthContext} from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import {BsTrash} from 'react-icons/bs';


const WorkoutDetails = ({workout}) => {

  const {dispatch} = useWorkoutContext();
  const {user} = useAuthContext();


  const handleClick = async () => {

    if (!user) {
      return
    }

    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer " + user.token,
      }
    })
    const data = await response.json();

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: data});
    }
  };

  return (
    <div className="workout-details">
      <h2>{workout.title}</h2>
      <p>Repetitions : {workout.repetitions}</p>
      <p>Sets: {workout.sets}</p>
      <p>Weight : {workout.weight} kilos</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <button className="delete-btn" onClick={handleClick}><BsTrash/></button>
    </div>
  )
}


export default WorkoutDetails; 
