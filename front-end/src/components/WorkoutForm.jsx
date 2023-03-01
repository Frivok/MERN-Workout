import React, { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const emptyWorkout = {
    title: '',
    repetitions: '',
    sets: '',
    weight: '',
}

const WorkoutForm = () => {

    const { dispatch } = useWorkoutContext();
    const { user } = useAuthContext();

    const [workout, setWorkout] = useState(emptyWorkout);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('You must be logged in to add a workout');
            return;
        }

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const data = await response.json();

        if(!response.ok) {
            setError(data.error);
            setEmptyFields(data.emptyFields);
        }

        if(response.ok) {
            setWorkout(emptyWorkout)
            setError(null);
            console.log('new workout added', data);
            setEmptyFields([]);
            dispatch({type: 'ADD_WORKOUT', payload: data});
        }
    }

    const onChange = (event) => setWorkout(workoutCurrentState => {
        //make a copy of the current state
        let updated = {...workoutCurrentState};
        //update the copy with the new value
        updated[event.target.name] = event.target.value; 
        //why do we return the copy and not the original state?
        //because we want to return a new object, not mutate the original state
        return updated;
    })

    return (
        <form className="workout-form" onSubmit={handleSubmit}>
            <h2>Add a new workout</h2>
            <label>Workout title:</label>
            <input name="title"
            //if the title is in the emptyFields array, add the class 'error'
            className={emptyFields.includes('title') ? 'error' : ''} 
            type="text" onChange={onChange} 
            value={workout.title}>
            </input>

            <label>Weight (in kilos):</label>
            <input name="weight"
            className={emptyFields.includes('weight') ? 'error' : ''}
            type="number" 
            onChange={onChange} 
            value={workout.weight}>
            </input>

            <label>Number of repetitions:</label>
            <input name="repetitions"
            className={emptyFields.includes('repetitions') ? 'error' : ''}
            type="text"
            onChange={onChange} 
            value={workout.repetitions}>
            </input>

            <label>Number of sets:</label>
            <input name="sets"
            className={emptyFields.includes('sets') ? 'error' : ''}
            type="text"
            onChange={onChange}
            value={workout.sets}>
            </input>

            <button>Add workout</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default WorkoutForm;